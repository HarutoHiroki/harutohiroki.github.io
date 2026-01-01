/**
 * BlogEngine - Markdown Blog System for BentoUI
 * Loads and renders blog posts from .md files
 */

class BlogEngine {
  constructor(config = {}) {
    this.config = {
      postsDirectory: config.postsDirectory || 'posts',
      postsPerPage: config.postsPerPage || 10,
      container: config.container || '#blog-posts',
      articleContainer: config.articleContainer || '#blog-article',
      listContainer: config.listContainer || '#blog-list',
      indexFile: config.indexFile || 'posts/index.json'
    };

    this.posts = [];
    this.filteredPosts = [];
    this.currentPost = null;
    this.currentTag = null;
    this.currentSort = 'newest';
    this.searchQuery = '';
    this.containerEl = document.querySelector(this.config.container);
    this.articleEl = document.querySelector(this.config.articleContainer);
    this.listEl = document.querySelector(this.config.listContainer);

    this.init();
  }

  async init() {
    // Check URL for specific post
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');

    await this.loadPosts();

    if (postSlug) {
      await this.showPost(postSlug);
    } else {
      this.renderPostList();
    }
  }

  /**
   * Load posts from index.json
   */
  async loadPosts() {
    this.showLoading();

    try {
      // Use relative path from current page (works on GitHub Pages and local dev)
      const indexUrl = this.config.indexFile;
      
      console.log('Loading posts from:', indexUrl);
      
      const response = await fetch(indexUrl);
      if (!response.ok) {
        throw new Error(`Failed to load posts index: ${response.status} ${response.statusText}`);
      }
      this.posts = await response.json();
      // Sort by date (newest first)
      this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.filteredPosts = [...this.posts];
      console.log('Loaded posts:', this.posts.length);
    } catch (error) {
      console.error('Error loading posts:', error);
      this.posts = [];
      this.filteredPosts = [];
      // Show error in UI
      if (this.containerEl) {
        this.containerEl.innerHTML = `
          <div class="blog-empty">
            <div class="blog-empty__icon">⚠️</div>
            <h3 class="blog-empty__title">Failed to load posts</h3>
            <p>Error: ${error.message}</p>
            <p style="font-size: 0.8em; margin-top: 1rem; color: var(--color-text-muted);">
              Make sure you're running this from a web server, not directly from the file system.
            </p>
          </div>
        `;
      }
    }
  }

  /**
   * Get all unique tags from posts
   */
  getAllTags() {
    const tagSet = new Set();
    this.posts.forEach(post => {
      (post.tags || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  /**
   * Filter posts by tag
   */
  filterByTag(tag) {
    this.currentTag = tag;
    this.applyFilters();
  }

  /**
   * Set sort order
   */
  setSortOrder(order) {
    this.currentSort = order;
    this.applyFilters();
  }

  /**
   * Set search query
   */
  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.applyFilters();
  }

  /**
   * Apply all filters and sorting
   */
  applyFilters() {
    // Start with all posts
    let filtered = [...this.posts];

    // Filter by tag
    if (this.currentTag) {
      filtered = filtered.filter(post => 
        (post.tags || []).includes(this.currentTag)
      );
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(post => {
        const searchableText = [
          post.title,
          post.excerpt,
          ...(post.tags || [])
        ].join(' ').toLowerCase();
        return searchableText.includes(this.searchQuery);
      });
    }

    // Sort posts
    if (this.currentSort === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (this.currentSort === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (this.currentSort === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    this.filteredPosts = filtered;
    this.renderPostList();
  }

  /**
   * Show loading state
   */
  showLoading() {
    if (this.containerEl) {
      this.containerEl.innerHTML = `
        <div class="blog-loading">
          <div class="blog-loading__spinner"></div>
          <p>Loading posts...</p>
        </div>
      `;
    }
  }

  /**
   * Render the list of blog posts
   */
  renderPostList() {
    if (!this.containerEl) return;

    // Render filters/search UI
    this.renderFiltersUI();

    if (this.filteredPosts.length === 0) {
      const message = this.searchQuery || this.currentTag 
        ? 'No posts match your filters'
        : 'No posts yet';
      this.containerEl.innerHTML = `
        <div class="blog-empty">
          <div class="blog-empty__icon">📝</div>
          <h3 class="blog-empty__title">${message}</h3>
          <p>${this.searchQuery || this.currentTag ? 'Try adjusting your search or filters.' : 'Check back soon for new content!'}</p>
        </div>
      `;
      return;
    }

    const postsHtml = this.filteredPosts.map(post => this.renderPostCard(post)).join('');
    this.containerEl.innerHTML = postsHtml;

    // Add click handlers
    this.containerEl.querySelectorAll('.blog-post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't navigate if clicking a tag
        if (e.target.classList.contains('blog-post-card__tag')) {
          e.preventDefault();
          e.stopPropagation();
          const tag = e.target.dataset.tag;
          this.filterByTag(tag);
          return;
        }
        e.preventDefault();
        const slug = card.dataset.slug;
        this.showPost(slug);
      });
    });
  }

  /**
   * Render the filters and search UI
   */
  renderFiltersUI() {
    let filtersEl = document.getElementById('blog-filters');
    if (!filtersEl) {
      filtersEl = document.createElement('div');
      filtersEl.id = 'blog-filters';
      filtersEl.className = 'blog-filters';
      this.containerEl.parentElement.insertBefore(filtersEl, this.containerEl);
    }

    const allTags = this.getAllTags();
    const tagsHtml = allTags.map(tag => `
      <button class="blog-filters__tag ${this.currentTag === tag ? 'active' : ''}" data-tag="${tag}">
        ${this.escapeHtml(tag)}
      </button>
    `).join('');

    filtersEl.innerHTML = `
      <div class="blog-filters__search">
        <svg class="blog-filters__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input 
          type="text" 
          class="blog-filters__search-input" 
          placeholder="Search posts..." 
          value="${this.escapeHtml(this.searchQuery)}"
        >
        ${this.searchQuery ? '<button class="blog-filters__search-clear" aria-label="Clear search">×</button>' : ''}
      </div>
      <div class="blog-filters__row">
        <div class="blog-filters__tags">
          <button class="blog-filters__tag ${!this.currentTag ? 'active' : ''}" data-tag="">
            All
          </button>
          ${tagsHtml}
        </div>
        <div class="blog-filters__sort">
          <label for="sort-select">Sort by:</label>
          <select id="sort-select" class="blog-filters__sort-select">
            <option value="newest" ${this.currentSort === 'newest' ? 'selected' : ''}>Newest</option>
            <option value="oldest" ${this.currentSort === 'oldest' ? 'selected' : ''}>Oldest</option>
            <option value="title" ${this.currentSort === 'title' ? 'selected' : ''}>Title</option>
          </select>
        </div>
      </div>
      ${this.currentTag || this.searchQuery ? `
        <div class="blog-filters__active">
          <span>Showing ${this.filteredPosts.length} of ${this.posts.length} posts</span>
          <button class="blog-filters__clear-all">Clear filters</button>
        </div>
      ` : ''}
    `;

    // Add event listeners
    const searchInput = filtersEl.querySelector('.blog-filters__search-input');
    
    // Restore focus to search input if it was focused before
    if (document.activeElement?.classList.contains('blog-filters__search-input') || this._searchWasFocused) {
      searchInput.focus();
      // Move cursor to end of input
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
      this._searchWasFocused = false;
    }
    
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      this._searchWasFocused = true; // Remember that search was focused
      searchTimeout = setTimeout(() => {
        this.setSearchQuery(e.target.value);
      }, 300);
    });

    const searchClear = filtersEl.querySelector('.blog-filters__search-clear');
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        this.setSearchQuery('');
      });
    }

    filtersEl.querySelectorAll('.blog-filters__tag').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.dataset.tag || null;
        this.filterByTag(tag);
      });
    });

    const sortSelect = filtersEl.querySelector('.blog-filters__sort-select');
    sortSelect.addEventListener('change', (e) => {
      this.setSortOrder(e.target.value);
    });

    const clearAll = filtersEl.querySelector('.blog-filters__clear-all');
    if (clearAll) {
      clearAll.addEventListener('click', () => {
        this.currentTag = null;
        this.searchQuery = '';
        this.applyFilters();
      });
    }
  }

  /**
   * Render a single post card
   */
  renderPostCard(post) {
    const date = this.formatDate(post.date);
    const readTime = post.readTime || this.estimateReadTime(post.excerpt || '');
    const tags = (post.tags || []).map(tag => 
      `<span class="blog-post-card__tag" data-tag="${this.escapeHtml(tag)}">${this.escapeHtml(tag)}</span>`
    ).join('');

    return `
      <a href="?post=${post.slug}" class="blog-post-card" data-slug="${post.slug}">
        <h2 class="blog-post-card__title">${this.escapeHtml(post.title)}</h2>
        <div class="blog-post-card__meta">
          <span class="blog-post-card__date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ${date}
          </span>
          <span class="blog-post-card__separator">•</span>
          <span class="blog-post-card__readtime">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            ${readTime} min read
          </span>
        </div>
        <p class="blog-post-card__excerpt">${this.escapeHtml(post.excerpt || '')}</p>
        ${tags ? `<div class="blog-post-card__tags">${tags}</div>` : ''}
      </a>
    `;
  }

  /**
   * Show a specific blog post
   */
  async showPost(slug) {
    const post = this.posts.find(p => p.slug === slug);
    if (!post) {
      this.showList();
      return;
    }

    // Update URL without reload
    history.pushState({ post: slug }, '', `?post=${slug}`);

    // Hide list, show article
    if (this.listEl) this.listEl.style.display = 'none';
    if (this.articleEl) this.articleEl.style.display = 'block';

    // Show loading in article
    const contentEl = document.getElementById('article-content');
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="blog-loading">
          <div class="blog-loading__spinner"></div>
          <p>Loading article...</p>
        </div>
      `;
    }

    try {
      // Load markdown file using relative path
      const postUrl = `${this.config.postsDirectory}/${post.file}`;
      
      const response = await fetch(postUrl);
      if (!response.ok) {
        throw new Error('Failed to load post');
      }
      const markdown = await response.text();
      
      // Parse and render
      this.renderArticle(post, markdown);
    } catch (error) {
      console.error('Error loading post:', error);
      if (contentEl) {
        contentEl.innerHTML = `
          <div class="blog-empty">
            <div class="blog-empty__icon">😕</div>
            <h3 class="blog-empty__title">Failed to load article</h3>
            <p>Please try again later.</p>
          </div>
        `;
      }
    }
  }

  /**
   * Render the full article
   */
  renderArticle(post, markdown) {
    // Update meta elements
    const titleEl = document.getElementById('article-title');
    const dateEl = document.getElementById('article-date');
    const readtimeEl = document.getElementById('article-readtime');
    const tagsEl = document.getElementById('article-tags');
    const contentEl = document.getElementById('article-content');

    if (titleEl) titleEl.textContent = post.title;
    if (dateEl) dateEl.textContent = this.formatDate(post.date);
    if (readtimeEl) readtimeEl.textContent = `${this.estimateReadTime(markdown)} min read`;
    
    if (tagsEl) {
      tagsEl.innerHTML = (post.tags || []).map(tag => 
        `<span class="blog-article__tag" data-tag="${this.escapeHtml(tag)}" style="cursor: pointer;">${this.escapeHtml(tag)}</span>`
      ).join('');
      
      // Add click handlers for article tags
      tagsEl.querySelectorAll('.blog-article__tag').forEach(tagEl => {
        tagEl.addEventListener('click', () => {
          const tag = tagEl.dataset.tag;
          this.filterByTag(tag);
          this.showList();
        });
      });
    }

    if (contentEl) {
      // Parse markdown (skip frontmatter and title if present)
      const content = this.stripFrontmatterAndTitle(markdown, post.title);
      contentEl.innerHTML = this.parseMarkdown(content);
    }

    // Update page title
    document.title = `${post.title} - Blog`;

    // Scroll to top
    window.scrollTo(0, 0);
  }

  /**
   * Show the post list
   */
  showList() {
    history.pushState({}, '', window.location.pathname);
    if (this.listEl) this.listEl.style.display = 'block';
    if (this.articleEl) this.articleEl.style.display = 'none';
    document.title = 'Blog - HarutoHiroki';
  }

  /**
   * Strip YAML frontmatter from markdown
   */
  stripFrontmatter(markdown) {
    // Handle both Unix (\n) and Windows (\r\n) line endings
    const frontmatterRegex = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;
    return markdown.replace(frontmatterRegex, '').trim();
  }

  /**
   * Strip YAML frontmatter and the first H1 title (since it's rendered from index.json)
   */
  stripFrontmatterAndTitle(markdown, title) {
    let content = this.stripFrontmatter(markdown);
    
    // Remove the first H1 if it matches the title (case-insensitive, ignoring extra whitespace)
    const h1Regex = /^#\s+(.+?)(\n|$)/;
    const match = content.match(h1Regex);
    if (match) {
      const h1Title = match[1].trim();
      // Check if H1 matches the post title (case-insensitive)
      if (h1Title.toLowerCase() === title.toLowerCase()) {
        content = content.replace(h1Regex, '').trim();
      }
    }
    
    return content;
  }

  /**
   * Markdown parser with support for nested lists and code blocks
   */
  parseMarkdown(markdown) {
    // Normalize line endings to \n
    let html = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Store code blocks to prevent processing (use placeholders)
    const codeBlocks = [];
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const index = codeBlocks.length;
      codeBlocks.push({ lang: lang || 'text', code: code });
      return `\n%%CODEBLOCK_${index}%%\n`;
    });

    // Store inline code to prevent processing
    // NOTE: use a placeholder without underscores to avoid any downstream markdown transforms.
    // We still restore the legacy underscore format for backwards compatibility.
    const inlineCodes = [];
    html = html.replace(/`([^`\n]+)`/g, (match, code) => {
      const index = inlineCodes.length;
      inlineCodes.push(code);
      return `%%INLINECODE${index}%%`;
    });

    // Now escape HTML
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headers
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Bento text effects (before standard bold/italic to avoid conflicts)
    // Rainbow text: ++rainbow text++
    html = html.replace(/\+\+(.+?)\+\+/g, (match, text) => {
      return this.createRainbowText(text);
    });

    // Jump/bounce text: ^^jump text^^
    html = html.replace(/\^\^(.+?)\^\^/g, (match, text) => {
      return this.createJumpText(text);
    });

    // Highlight text: ==highlighted text== or ==color:highlighted text==
    html = html.replace(/==(?:([a-zA-Z#0-9]+):)?(.+?)==/g, (match, color, text) => {
      if (color) {
        return `<span class="bento-text-highlight" style="--bento-highlight-color: ${color}">${text}</span>`;
      }
      return `<span class="bento-text-highlight">${text}</span>`;
    });

    // Colored text: {color:text}
    html = html.replace(/\{([a-zA-Z#0-9]+):(.+?)\}/g, (match, color, text) => {
      return `<span class="bento-text-colored" style="--bento-text-color: ${color}; color: ${color}">${text}</span>`;
    });

    // Underline text: __underline__ (different from bold)
    // Note: We use a special pattern to differentiate from bold
    html = html.replace(/\+_(.+?)_\+/g, '<span class="bento-text-underline">$1</span>');

    // Bold and Italic (standard markdown)
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');

    // Blockquotes
    html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote><p>$1</p></blockquote>');
    // Merge consecutive blockquotes
    html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

    // Horizontal rules
    html = html.replace(/^(?:---|\*\*\*|___)$/gm, '<hr>');

    // Parse lists with proper nesting support
    html = this.parseLists(html);

    // Paragraphs (lines that aren't already wrapped in HTML tags or placeholders)
    html = html.replace(/^(?!<[a-z]|%%|$|\s*$)(.+)$/gm, '<p>$1</p>');

    // Clean up extra paragraph tags around block elements
    html = html.replace(/<p>(<(?:h[1-6]|ul|ol|li|blockquote|pre|hr|table|div))/g, '$1');
    html = html.replace(/(<\/(?:h[1-6]|ul|ol|li|blockquote|pre|hr|table|div)>)<\/p>/g, '$1');

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');

    // Restore code blocks with syntax highlighting
    codeBlocks.forEach((block, index) => {
      const highlightedCode = this.highlightSyntax(block.code, block.lang);
      html = html.replace(`%%CODEBLOCK_${index}%%`, 
        `<pre><code class="language-${block.lang}">${highlightedCode}</code></pre>`);
    });

    // Restore inline code with proper escaping
    inlineCodes.forEach((code, index) => {
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      const rendered = `<code class="bento-text-code">${escapedCode}</code>`;
      html = html.replaceAll(`%%INLINECODE${index}%%`, rendered);
    });

    // Clean up excessive newlines
    html = html.replace(/\n{3,}/g, '\n\n');

    return html;
  }

  /**
   * Create rainbow animated text
   */
  createRainbowText(text) {
    const chars = text.split('').map((char, i) => {
      const delay = (i * 0.1).toFixed(2);
      if (char === ' ') {
        return '<span class="bento-text-rainbow-char" style="--rainbow-delay: ' + delay + 's">&nbsp;</span>';
      }
      return '<span class="bento-text-rainbow-char" style="--rainbow-delay: ' + delay + 's">' + char + '</span>';
    }).join('');
    return '<span class="bento-text-rainbow">' + chars + '</span>';
  }

  /**
   * Create jumping/bouncing text
   */
  createJumpText(text) {
    const chars = text.split('').map((char, i) => {
      const delay = (i * 0.05).toFixed(2);
      if (char === ' ') {
        return '<span class="bento-text-jump-char" style="--jump-delay: ' + delay + 's">&nbsp;</span>';
      }
      return '<span class="bento-text-jump-char" style="--jump-delay: ' + delay + 's">' + char + '</span>';
    }).join('');
    return '<span class="bento-text-jump">' + chars + '</span>';
  }

  /**
   * Syntax highlighting for code blocks
   */
  highlightSyntax(code, lang) {
    // First escape HTML
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Language-specific keywords
    const keywords = {
      javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined', 'void', 'delete', 'yield', 'static', 'get', 'set', 'super'],
      js: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined', 'void', 'delete', 'yield', 'static', 'get', 'set', 'super'],
      typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined', 'void', 'delete', 'yield', 'static', 'get', 'set', 'super', 'type', 'interface', 'enum', 'implements', 'private', 'public', 'protected', 'readonly', 'abstract', 'as', 'is', 'keyof', 'never', 'unknown', 'any'],
      ts: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined', 'void', 'delete', 'yield', 'static', 'get', 'set', 'super', 'type', 'interface', 'enum', 'implements', 'private', 'public', 'protected', 'readonly', 'abstract', 'as', 'is', 'keyof', 'never', 'unknown', 'any'],
      python: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'import', 'from', 'return', 'yield', 'raise', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None', 'lambda', 'global', 'nonlocal', 'assert', 'del', 'async', 'await', 'self'],
      py: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'import', 'from', 'return', 'yield', 'raise', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None', 'lambda', 'global', 'nonlocal', 'assert', 'del', 'async', 'await', 'self'],
      java: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final', 'void', 'int', 'long', 'double', 'float', 'boolean', 'char', 'byte', 'short', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'new', 'this', 'super', 'try', 'catch', 'finally', 'throw', 'throws', 'import', 'package', 'true', 'false', 'null', 'instanceof', 'abstract', 'synchronized', 'volatile', 'transient', 'native', 'enum'],
      cpp: ['int', 'long', 'double', 'float', 'char', 'bool', 'void', 'auto', 'const', 'static', 'extern', 'register', 'volatile', 'unsigned', 'signed', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'goto', 'class', 'struct', 'union', 'enum', 'public', 'private', 'protected', 'virtual', 'override', 'final', 'new', 'delete', 'this', 'try', 'catch', 'throw', 'namespace', 'using', 'template', 'typename', 'typedef', 'sizeof', 'true', 'false', 'nullptr', 'include', 'define', 'ifdef', 'ifndef', 'endif'],
      c: ['int', 'long', 'double', 'float', 'char', 'void', 'const', 'static', 'extern', 'register', 'volatile', 'unsigned', 'signed', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'goto', 'struct', 'union', 'enum', 'typedef', 'sizeof', 'include', 'define', 'ifdef', 'ifndef', 'endif', 'NULL'],
      css: ['important', 'inherit', 'initial', 'unset', 'none', 'auto', 'block', 'inline', 'flex', 'grid', 'absolute', 'relative', 'fixed', 'sticky', 'static'],
      html: ['DOCTYPE', 'html', 'head', 'body', 'div', 'span', 'a', 'img', 'script', 'style', 'link', 'meta', 'title', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'input', 'button', 'select', 'option', 'textarea', 'label', 'nav', 'header', 'footer', 'main', 'section', 'article', 'aside'],
      json: ['true', 'false', 'null'],
      bash: ['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'return', 'exit', 'echo', 'read', 'export', 'source', 'alias', 'cd', 'pwd', 'ls', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'sed', 'awk', 'chmod', 'chown', 'sudo', 'apt', 'npm', 'yarn', 'git', 'docker'],
      sh: ['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'return', 'exit', 'echo', 'read', 'export', 'source', 'alias'],
      sql: ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN', 'IS', 'NULL', 'ORDER', 'BY', 'ASC', 'DESC', 'LIMIT', 'OFFSET', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AS', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'GROUP', 'HAVING', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'UNION', 'ALL'],
      rust: ['fn', 'let', 'mut', 'const', 'static', 'if', 'else', 'match', 'loop', 'while', 'for', 'in', 'break', 'continue', 'return', 'struct', 'enum', 'impl', 'trait', 'type', 'pub', 'mod', 'use', 'crate', 'self', 'super', 'where', 'async', 'await', 'move', 'ref', 'true', 'false', 'Some', 'None', 'Ok', 'Err', 'Self', 'dyn', 'unsafe', 'extern'],
      go: ['func', 'var', 'const', 'type', 'struct', 'interface', 'map', 'chan', 'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'break', 'continue', 'return', 'go', 'select', 'defer', 'package', 'import', 'true', 'false', 'nil', 'make', 'new', 'len', 'cap', 'append', 'copy', 'delete', 'panic', 'recover']
    };

    const langKeywords = keywords[lang.toLowerCase()] || [];
    
    if (langKeywords.length === 0) {
      return escaped; // No highlighting for unknown languages
    }

    // Use a function-based approach to avoid replacement string issues
    const wrapSpan = (className) => (match, p1) => {
      return '\x00SPAN_' + className + '\x00' + p1 + '\x00/SPAN\x00';
    };

    // Store strings and comments to protect them from keyword highlighting
    const protectedItems = [];
    
    // Helper to safely store protected content
    const protectContent = (match, className) => {
      const idx = protectedItems.length;
      protectedItems.push('\x00SPAN_' + className + '\x00' + match + '\x00/SPAN\x00');
      return '\x00PROTECTED_' + idx + '\x00';
    };

    // Protect strings (double and single quoted)
    escaped = escaped.replace(/"(?:[^"\\]|\\.)*"/g, (match) => protectContent(match, 'string'));
    escaped = escaped.replace(/'(?:[^'\\]|\\.)*'/g, (match) => protectContent(match, 'string'));

    // Protect template literals for JS/TS
    if (['javascript', 'js', 'typescript', 'ts'].includes(lang.toLowerCase())) {
      escaped = escaped.replace(/`(?:[^`\\]|\\.)*`/g, (match) => protectContent(match, 'string'));
    }

    // Protect single-line comments
    escaped = escaped.replace(/\/\/.*$/gm, (match) => protectContent(match, 'comment'));
    
    // Protect Python/Bash style comments
    if (['python', 'py', 'bash', 'sh'].includes(lang.toLowerCase())) {
      escaped = escaped.replace(/#.*$/gm, (match) => protectContent(match, 'comment'));
    }

    // Protect multi-line comments
    escaped = escaped.replace(/\/\*[\s\S]*?\*\//g, (match) => protectContent(match, 'comment'));

    // Highlight numbers (using function to avoid replacement issues)
    escaped = escaped.replace(/\b(\d+\.?\d*)\b/g, wrapSpan('number'));

    // Highlight keywords
    langKeywords.forEach(keyword => {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('\\b(' + escapedKeyword + ')\\b', 'g');
      escaped = escaped.replace(regex, wrapSpan('keyword'));
    });

    // Highlight function calls
    escaped = escaped.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, (match, p1) => {
      return '\x00SPAN_function\x00' + p1 + '\x00/SPAN\x00(';
    });

    // Restore protected items
    for (let idx = 0; idx < protectedItems.length; idx++) {
      escaped = escaped.split('\x00PROTECTED_' + idx + '\x00').join(protectedItems[idx]);
    }

    // Convert placeholders to actual HTML spans
    escaped = escaped.replace(/\x00SPAN_(\w+)\x00/g, '<span class="hljs-$1">');
    escaped = escaped.replace(/\x00\/SPAN\x00/g, '</span>');

    return escaped;
  }

  /**
   * Parse lists with proper nesting support
   */
  parseLists(html) {
    const lines = html.split('\n');
    const result = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      // Check if this line starts a list
      const ulMatch = line.match(/^(\s*)([\*\-])\s+(.+)$/);
      const olMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);

      if (ulMatch || olMatch) {
        // Parse the entire list block
        const { html: listHtml, endIndex } = this.parseListBlock(lines, i);
        result.push(listHtml);
        i = endIndex;
      } else {
        result.push(line);
        i++;
      }
    }

    return result.join('\n');
  }

  /**
   * Parse a list block starting at given index
   */
  parseListBlock(lines, startIndex) {
    const items = [];
    let i = startIndex;
    let listType = null;
    let baseIndent = -1;

    while (i < lines.length) {
      const line = lines[i];
      
      // Check for list items
      const ulMatch = line.match(/^(\s*)([\*\-])\s+(.+)$/);
      const olMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);

      if (ulMatch || olMatch) {
        const match = ulMatch || olMatch;
        const indent = match[1].length;
        const content = match[3];
        const isOrdered = !!olMatch;

        // Set base indent and list type from first item
        if (baseIndent === -1) {
          baseIndent = indent;
          listType = isOrdered ? 'ol' : 'ul';
        }

        // If same indent level as base, it's a sibling item
        if (indent === baseIndent) {
          // Check if this is a different list type - if so, end current list
          const currentType = isOrdered ? 'ol' : 'ul';
          if (currentType !== listType) {
            break;
          }
          items.push({ content, indent, children: [] });
          i++;
        }
        // If more indented, it's a nested list
        else if (indent > baseIndent) {
          // Parse nested list and attach to last item
          if (items.length > 0) {
            const { html: nestedHtml, endIndex } = this.parseListBlock(lines, i);
            items[items.length - 1].children.push(nestedHtml);
            i = endIndex;
          } else {
            i++;
          }
        }
        // If less indented, end current list
        else {
          break;
        }
      }
      // Empty line or non-list line ends the list
      else if (line.trim() === '' || !line.match(/^\s/)) {
        break;
      }
      // Continuation of previous item (indented non-list line)
      else {
        i++;
      }
    }

    // Build HTML for this list
    const tag = listType || 'ul';
    let html = `<${tag}>`;
    items.forEach(item => {
      html += `<li>${item.content}`;
      if (item.children.length > 0) {
        html += item.children.join('');
      }
      html += '</li>';
    });
    html += `</${tag}>`;

    return { html, endIndex: i };
  }

  /**
   * Estimate read time in minutes
   */
  estimateReadTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }

  /**
   * Format date for display
   */
  formatDate(dateString) {
    // Parse as local time by appending T00:00:00 to avoid UTC interpretation
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Escape HTML entities
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
  if (typeof blogEngine !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');
    
    if (postSlug) {
      blogEngine.showPost(postSlug);
    } else {
      blogEngine.showList();
    }
  }
});
