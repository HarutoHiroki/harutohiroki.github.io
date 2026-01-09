#!/usr/bin/env node

/**
 * Blog Index Generator
 * Scans the posts folder for .md files and generates index.json
 * 
 * Usage: node generate-blog-index.js
 * 
 * Markdown files should have YAML frontmatter like:
 * ---
 * title: My Post Title
 * date: 2026-01-01
 * revised: 2026-01-05 (optional)
 * tags: [tag1, tag2]
 * excerpt: A brief description of the post (optional)
 * pin: true (optional, for pinning posts)
 * override: true (required, used to pin a post and unpin others)
 * ---
 */

const fs = require('fs');
const path = require('path');

// Configuration
const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_FILE = path.join(POSTS_DIR, 'index.json');

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
  // Normalize line endings
  const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = normalizedContent.match(frontmatterRegex);
  
  if (!match) {
    return null;
  }
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();
    
    // Parse arrays (tags: [tag1, tag2])
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
    }
    // Remove quotes from strings
    else if ((value.startsWith('"') && value.endsWith('"')) || 
             (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    // Parse booleans
    else if (value.toLowerCase() === 'true') {
      value = true;
    } else if (value.toLowerCase() === 'false') {
      value = false;
    }
    
    frontmatter[key] = value;
  }
  
  return frontmatter;
}

/**
 * Update frontmatter in a markdown file
 */
function updateFrontmatter(filePath, updates) {
  const content = fs.readFileSync(filePath, 'utf8');
  const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = normalizedContent.match(frontmatterRegex);
  
  if (!match) return;

  let frontmatterLines = match[1].split('\n');
  const otherContent = normalizedContent.substring(match[0].length);

  for (const [key, value] of Object.entries(updates)) {
    const entryIndex = frontmatterLines.findIndex(line => line.trim().startsWith(key + ':'));
    if (value === null) {
      // Remove key if it exists
      if (entryIndex !== -1) frontmatterLines.splice(entryIndex, 1);
    } else {
      const newLine = `${key}: ${value}`;
      if (entryIndex !== -1) {
        frontmatterLines[entryIndex] = newLine;
      } else {
        frontmatterLines.push(newLine);
      }
    }
  }

  const newContent = `---\n${frontmatterLines.join('\n')}\n---${otherContent}`;
  fs.writeFileSync(filePath, newContent, 'utf8');
}

/**
 * Generate slug from filename
 */
function generateSlug(filename) {
  return filename.replace(/\.md$/, '');
}

/**
 * Extract excerpt from content if not in frontmatter
 */
function extractExcerpt(content, maxLength = 200) {
  // Normalize line endings first
  let text = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Remove frontmatter
  text = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  // Remove markdown headers
  text = text.replace(/^#+\s+.+$/gm, '');
  
  // Remove markdown formatting
  text = text
    .replace(/\*\*(.+?)\*\*/g, '$1')  // bold
    .replace(/\*(.+?)\*/g, '$1')       // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links
    .replace(/`([^`]+)`/g, '$1')       // inline code
    .replace(/```[\s\S]*?```/g, '')    // code blocks
    .replace(/>\s+/g, '')              // blockquotes
    .replace(/[-*]\s+/g, '')           // list items
    .replace(/\n+/g, ' ')              // newlines
    .trim();
  
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '...';
  }
  
  return text;
}

/**
 * Estimate read time in minutes
 */
function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Main function
 */
function generateIndex() {
  console.log('Blog Index Generator');
  console.log('========================\n');
  
  // Check if posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`Posts directory not found: ${POSTS_DIR}`);
    console.log('   Creating posts directory...');
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
  
  // Get all .md files
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('No markdown files found in posts directory.');
    console.log('   Create .md files with YAML frontmatter to get started.\n');
    
    // Create empty index
    fs.writeFileSync(OUTPUT_FILE, '[]', 'utf8');
    console.log(`Created empty ${OUTPUT_FILE}`);
    return;
  }
  
  console.log(`Found ${files.length} markdown file(s):\n`);
  
  const rawPosts = [];
  
  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    
    if (!frontmatter) {
      console.log(`No frontmatter found in ${file}, skipping`);
      continue;
    }
    
    rawPosts.push({ file, filePath, content, frontmatter });
  }

  // Handle pinning and override logic
  const overridePost = rawPosts.find(p => p.frontmatter.override === true);
  
  if (overridePost) {
    console.log(`Detected override in ${overridePost.file}. Unpinning other posts...`);
    rawPosts.forEach(p => {
      if (p !== overridePost && p.frontmatter.pin === true) {
        console.log(`   Unpinning ${p.file}`);
        updateFrontmatter(p.filePath, { pin: null });
        p.frontmatter.pin = false;
      }
    });
    // Ensure override post is pinned and clear override flag
    console.log(`   Removing override flag from ${overridePost.file}`);
    updateFrontmatter(overridePost.filePath, { pin: true, override: null });
    overridePost.frontmatter.pin = true;
    overridePost.frontmatter.override = false;
  } else {
    // Check if multiple posts are pinned
    const pinnedPosts = rawPosts.filter(p => p.frontmatter.pin === true)
      .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
    
    if (pinnedPosts.length > 1) {
      console.log('Multiple pinned posts detected. Maintaining only the newest pin...');
      pinnedPosts.slice(1).forEach(p => {
        console.log(`   Unpinning ${p.file}`);
        updateFrontmatter(p.filePath, { pin: null });
        p.frontmatter.pin = false;
      });
    }
  }

  // Clean up any stray override flags (always requested)
  rawPosts.forEach(p => {
    if (p.frontmatter.override === true) {
      updateFrontmatter(p.filePath, { override: null });
      p.frontmatter.override = false;
    }
  });

  const posts = [];
  for (const { file, content, frontmatter } of rawPosts) {
    const slug = generateSlug(file);
    const post = {
      slug: slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      revised: frontmatter.revised || null,
      excerpt: frontmatter.excerpt || extractExcerpt(content),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      file: file,
      pinned: frontmatter.pin === true,
      readTime: estimateReadTime(content)
    };
    
    posts.push(post);
    console.log(`${file}`);
    console.log(`   Title: ${post.title}`);
    console.log(`   Date: ${post.date}`);
    if (post.revised) console.log(`   Revised: ${post.revised}`);
    console.log(`   Tags: ${post.tags.join(', ') || 'none'}`);
    if (post.pinned) console.log('   PINNED: yes');
    console.log(`   Read time: ~${post.readTime} min\n`);
  }
  
  // Sort by pinned (pinned first) then by date (newest first) for final output
  posts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date) - new Date(a.date);
  });
  
  // Write index.json
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf8');
  
  console.log('========================');
  console.log(`Generated ${OUTPUT_FILE}`);
  console.log(`   Total posts: ${posts.length}`);
}

// Run
generateIndex();
