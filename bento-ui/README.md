# BentoUI Framework

A modern, flat design UI framework for creating beautiful Bento-box style layouts. Built with pure HTML, CSS, and vanilla JavaScript - no dependencies required.

## Demo Site

This folder contains a complete demo website showcasing all BentoUI features:

- **[index.html](index.html)** - Main demo with all features overview
- **[card-types.html](card-types.html)** - Reference for all 13 card types  
- **[text-styling.html](text-styling.html)** - Rich text formatting guide
- **[api-demo.html](api-demo.html)** - Interactive API playground

### Running the Demo

Simply open `index.html` in a browser, or serve locally:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000/bento-ui/`

## Features

- **Responsive Grid System**: 12-column desktop, 8-column tablet, 4-column mobile, 2-column small
- **13 Card Types**: text, image, stat, chart, empty, bio, media, list, code, github, profile, song, latestPost
- **Theme Support**: Dark and light modes with smooth transitions
- **JSON-Driven**: Configure entire layouts with JSON objects
- **Zero Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- **Flat Design**: Clean, modern aesthetic with no skeuomorphism
- **Rich Text Styling**: Inline markup for bold, italic, colors, highlights, animations
- **Blog Engine**: Full-featured markdown blog with search, filtering, and syntax highlighting

## Quick Start

1. Include the CSS and JS files:

```html
<link rel="stylesheet" href="bento.css">
<script src="bento.js"></script>
```

2. Add container elements:

```html
<nav id="bento-nav" class="bento-nav"></nav>
<main class="bento-container">
  <div id="bento-grid" class="bento-grid"></div>
</main>
```

3. Initialize BentoUI:

```javascript
const bento = new BentoUI({
  container: '#bento-grid',
  nav: {
    enabled: true,
    logo: 'MyApp',
    links: [
      { label: 'Home', url: '#', active: true },
      { label: 'About', url: '#about' }
    ],
    theme: 'dark'  // or 'light'
  },
  cards: [
    {
      type: 'text',
      width: 4,
      height: 2,
      content: {
        title: 'Hello World',
        description: 'Your first BentoUI card!'
      }
    }
  ]
});
```

## Grid System

| Breakpoint | Columns | Grid Unit |
|------------|---------|-----------|
| Desktop (default) | 12 | 101.5px |
| Tablet (1200px) | 8 | 125px |
| Mobile (768px) | 4 | 180px |
| Small (480px) | 2 | 160px |

## Card Types

### 1. Text Card

Basic text content with title, description, and optional footer.

```javascript
{
  type: 'text',
  width: 4,
  height: 2,
  content: {
    title: 'Card Title',
    description: 'Card description text',
    footer: 'Optional footer',
    textStyle: {
      inlineStyles: true,  // Enable rich text markup
      hoverOnly: false     // Show styles always (or only on hover)
    }
  }
}
```

### 2. Image Card

Display images with optional captions.

```javascript
{
  type: 'image',
  width: 4,
  height: 3,
  content: {
    src: 'image-url.jpg',
    alt: 'Image description',
    caption: 'Optional caption'
  }
}
```

### 3. Stat Card

Display statistics with optional trend indicators.

```javascript
{
  type: 'stat',
  width: 3,
  height: 2,
  content: {
    value: '42',
    label: 'Total Items',
    trend: {
      direction: 'positive', // or 'negative'
      value: '+12%'
    }
  }
}
```

### 4. Chart Card

Simple bar charts for data visualization.

```javascript
{
  type: 'chart',
  width: 6,
  height: 3,
  content: {
    title: 'Monthly Sales',
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 150 },
      { label: 'Mar', value: 120 }
    ]
  }
}
```

### 5. Empty Card

Placeholder card for layout purposes.

```javascript
{
  type: 'empty',
  width: 2,
  height: 2,
  content: {
    message: 'Placeholder text'
  }
}
```

### 6. Bio Card

Profile card with avatar, bio, and social links.

```javascript
{
  type: 'bio',
  width: 4,
  height: 3,
  content: {
    avatar: 'avatar-url.jpg',
    name: 'Jane Doe',
    role: 'Developer',
    description: 'Short bio text',
    socialLinks: [
      { icon: 'github', url: 'https://github.com', label: 'GitHub' },
      { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
      { icon: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
    ]
  }
}
```

### 7. Media Card

Embed video or audio content.

```javascript
{
  type: 'media',
  width: 4,
  height: 3,
  content: {
    src: 'video.mp4',
    type: 'video', // or 'audio'
    caption: 'Optional caption'
  }
}
```

### 8. List Card

Display lists with styled bullets.

```javascript
{
  type: 'list',
  width: 3,
  height: 3,
  content: {
    title: 'Todo List',
    items: [
      'First item',
      'Second item',
      'Third item'
    ]
  }
}
```

### 9. Code Card

Display code snippets with syntax highlighting.

```javascript
{
  type: 'code',
  width: 6,
  height: 3,
  content: {
    title: 'Example Code',
    language: 'javascript',
    code: 'const hello = "world";'
  }
}
```

### 10. GitHub Card

Display GitHub contribution graph.

```javascript
{
  type: 'github',
  width: 6,
  height: 2,
  content: {
    username: 'your-github-username',
    title: 'GitHub Activity',
    months: 'auto',  // or 1-12 for fixed months
    freeform: false  // true for compact grid layout
  }
}
```

### 11. Profile Card

Enhanced bio card with more details like location, interests, and skills.

```javascript
{
  type: 'profile',
  width: 6,
  height: 4,
  content: {
    avatar: 'avatar.jpg',
    name: 'John Doe',
    alias: 'johndoe',
    role: 'Full Stack Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate developer who loves building things.',
    interests: [
      { icon: 'code', label: 'Programming' },
      { icon: 'music', label: 'Music' },
      { icon: 'vr', label: 'VR Gaming' }
    ],
    skills: ['JavaScript', 'Python', 'React', 'Node.js'],
    socialLinks: [
      { icon: 'github', url: 'https://github.com', label: 'GitHub' },
      { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' }
    ]
  }
}
```

### 12. Song Card (Last.fm)

Display currently playing track from Last.fm.

```javascript
{
  type: 'song',
  width: 4,
  height: 2,
  content: {
    username: 'your-lastfm-username',
    apiKey: 'your-lastfm-api-key',
    title: 'Now Playing'
  }
}
```

### 13. Latest Post Card

Display the latest blog post with dynamic content.

```javascript
{
  type: 'latestPost',
  width: 4,
  height: 2,
  content: {
    title: 'Latest Post',
    blogUrl: 'blog.html',
    postsIndexUrl: 'posts/index.json'
  }
}
```

## Card Positioning

Cards can be positioned explicitly using `x` and `y` coordinates (0-indexed):

```javascript
{
  type: 'text',
  width: 4,
  height: 2,
  x: 0,  // Column position (0-11)
  y: 0,  // Row position
  content: { ... }
}
```

Or let the grid auto-place them by omitting `x` and `y`.

## Inline Text Styling

Enable rich text formatting with the `textStyle.inlineStyles` option:

| Syntax | Effect |
|--------|--------|
| `**bold**` | **Bold text** |
| `*italic*` | *Italic text* |
| `__underline__` | Underlined text |
| `~~strikethrough~~` | ~~Strikethrough~~ |
| `==highlight==` | Highlighted text |
| `==#ff0\|text==` | Custom color highlight |
| `` `code` `` | Inline code |
| `{{#red}}text{{/}}` | Colored text |
| `[text](color:#fff)` | Custom CSS styling |
| `^^jump^^` | Bouncing animation |
| `++rainbow++` | Rainbow animation |

## Configuration Options

```javascript
const config = {
  container: '#bento-grid',        // Grid container selector (null to skip)
  nav: {
    enabled: true,                 // Show navigation bar
    container: '#bento-nav',       // Nav container selector
    logo: 'BentoUI',              // Logo text
    logoUrl: '#',                  // Logo link URL
    links: [],                     // Navigation links array
    theme: 'dark'                  // Default theme: 'dark' or 'light'
  },
  backToTop: {
    enabled: true                  // Show back-to-top button
  },
  cards: []                        // Array of card configurations
};
```

## Social Link Icons

Available icons for bio/profile cards:
- `github`, `twitter`, `linkedin`, `youtube`, `twitch`
- `kofi`, `throne`, `lastfm`
- `music`, `vr`, `code`, `location`, `link`

## API Methods

```javascript
const bento = new BentoUI(config);

// Add a new card
bento.addCard({ type: 'text', width: 4, height: 2, content: {...} });

// Remove a card by index
bento.removeCard(0);

// Update a card by index
bento.updateCard(0, { content: { title: 'New Title' } });

// Replace all cards
bento.setCards([...]);

// Toggle theme
bento.toggleTheme();

// Apply specific theme
bento.applyTheme('light'); // or 'dark'

// Destroy instance
bento.destroy();
```

## CSS Variables

Customize the framework by overriding CSS variables:

```css
:root {
  /* Colors */
  --color-bg-primary: #151515;
  --color-bg-card: #1d1f21;
  --color-text-primary: #ffffff;
  --color-accent: #1abc9c;
  
  /* Typography */
  --font-family-base: 'Source Code Pro', monospace;
  --font-size-base: 1rem;
  
  /* Spacing */
  --spacing-4: 1rem;
  --grid-gap: 1rem;
  
  /* Border Radius */
  --radius-lg: 0.75rem;
}
```

## Blog Engine

BentoUI includes a full-featured blog engine:

```html
<link rel="stylesheet" href="blog.css">
<script src="blog.js"></script>
```

### Blog Features
- Markdown rendering with frontmatter support
- Full-text search
- Tag filtering
- Date sorting (newest/oldest)
- Syntax highlighting for code blocks
- Inline text styling support
- Read time calculation

### Getting Started with the Blog Engine

BentoUI includes a built-in markdown blog engine. To add a blog to your site:

1. **Create a posts directory**
   - Place your markdown files in `/posts/` (e.g., `posts/hello-world.md`).
   - Each post should start with YAML frontmatter:
     ```markdown
     ---
     title: My Post Title
     date: 2025-01-01
     tags: [tag1, tag2]
     excerpt: A short summary of the post
     ---
     # Post Content
     ...
     ```

2. **Generate the post index**
   - Run `node generate-blog-index.js` to create `posts/index.json` (required for listing/search).

3. **Add the blog engine to your HTML**
   - Include the CSS and JS files:
     ```html
     <link rel="stylesheet" href="assets/css/blog.css">
     <script src="assets/js/blog.js"></script>
     ```
   - Add containers for the blog list and article:
     ```html
     <div id="blog-list"></div>
     <div id="blog-article" style="display:none;"></div>
     ```
   - Initialize the blog engine:
     ```javascript
     const blogEngine = new BlogEngine({
       postsDirectory: '/posts',
       postsPerPage: 10,
       container: '#blog-posts',
       articleContainer: '#blog-article',
       indexFile: '/posts/index.json'
     });
     ```

4. **Customize and style**
   - See `blog.html` for a full working example and more advanced options.

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

GPL-3.0 License
