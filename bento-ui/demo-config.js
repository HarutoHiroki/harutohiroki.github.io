/**
 * BentoUI Demo Configuration
 * This file showcases all the features of the BentoUI framework
 * 
 * To use the Last.fm integration, replace the apiKey with your own from:
 * https://www.last.fm/api/account/create
 */

// ============================================================================
// Configuration - Update these values with your own API keys
// ============================================================================
const CONFIG = {
  // Last.fm API key (get one at https://www.last.fm/api/account/create)
  lastfm: {
    apiKey: '', // Add your Last.fm API key here
    username: 'YourUsername' // Add your Last.fm username
  },
  // GitHub username for the activity graph
  github: {
    username: 'HarutoHiroki' // Change to your GitHub username
  }
};

// ============================================================================
// BentoUI Demo Configuration
// ============================================================================
const bentoConfig = {
  container: '#bento-grid',
  nav: {
    enabled: true,
    container: '#bento-nav',
    logo: 'BentoUI Demo',
    logoUrl: '#',
    links: [
      { label: 'Home', url: '#', active: true },
      { label: 'Card Types', url: 'card-types.html' },
      { label: 'Text Styling', url: 'text-styling.html' },
      { label: 'API Demo', url: 'api-demo.html' }
    ],
    theme: 'dark'
  },
  backToTop: {
    enabled: true
  },
  cards: [
    // ========================================================================
    // Hero Section - Introduction
    // ========================================================================
    {
      type: 'text',
      width: 8,
      height: 2,
      x: 0,
      y: 0,
      content: {
        title: 'Welcome to BentoUI',
        description: 'A modern, **flat design** UI framework for creating beautiful *Bento-box style* layouts. Built with ==pure HTML, CSS, and vanilla JavaScript== - **zero dependencies** required! This demo showcases all ++13 card types++ and the powerful ^^inline text styling^^ system.',
        footer: 'Version 1.0.0 • GPL 3.0 License',
        textStyle: {
          inlineStyles: true,
          hoverOnly: false
        }
      }
    },
    {
      type: 'stat',
      width: 2,
      height: 2,
      x: 8,
      y: 0,
      content: {
        value: '13',
        label: 'Card Types',
        trend: {
          direction: 'positive',
          value: 'All Included'
        }
      }
    },
    {
      type: 'stat',
      width: 2,
      height: 2,
      x: 10,
      y: 0,
      content: {
        value: '0',
        label: 'Dependencies',
        trend: {
          direction: 'positive',
          value: 'Pure JS'
        }
      }
    },

    // ========================================================================
    // Profile & Social Cards
    // ========================================================================
    {
      type: 'profile',
      width: 4,
      height: 3,
      x: 0,
      y: 2,
      content: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BentoUI',
        name: 'Profile Card',
        alias: 'enhanced bio',
        role: 'Full Stack Developer',
        location: 'San Francisco, CA',
        bio: 'The profile card is an enhanced bio card with location, interests, skills tags, and social links. Perfect for personal portfolios!',
        interests: [
          { icon: 'code', label: 'Programming' },
          { icon: 'music', label: 'Music' },
          { icon: 'vr', label: 'VR Gaming' }
        ],
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
        socialLinks: [
          { icon: 'github', url: 'https://github.com', label: 'GitHub' },
          { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
          { icon: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
          { icon: 'kofi', url: 'https://ko-fi.com', label: 'Ko-fi' }
        ]
      }
    },
    {
      type: 'github',
      width: 5,
      height: 2,
      x: 4,
      y: 2,
      content: {
        username: CONFIG.github.username,
        title: 'GitHub Activity',
        months: 'auto'
      }
    },
    {
      type: 'song',
      width: 3,
      height: 2,
      x: 9,
      y: 2,
      content: {
        username: CONFIG.lastfm.username,
        apiKey: CONFIG.lastfm.apiKey,
        title: 'Now Playing'
      }
    },
    {
      type: 'github',
      width: 2,
      height: 2,
      x: 4,
      y: 4,
      content: {
        username: CONFIG.github.username,
        title: 'Compact',
        months: 'auto',
        freeform: true
      }
    },
    {
      type: 'latestPost',
      width: 6,
      height: 2,
      x: 6,
      y: 4,
      content: {
        title: 'Latest Blog Post',
        blogUrl: '../blog.html',
        postsIndexUrl: '../posts/index.json'
      }
    },

    {
      type: 'text',
      width: 4,
      height: 2,
      x: 0,
      y: 5,
      content: {
        title: 'Rich Text Styling',
        description: 'BentoUI supports **bold**, *italic*, __underline__, ~~strikethrough~~, ==highlights==, `inline code`, and {{#e74c3c}}colored text{{/}}.',
        footer: 'textStyle: { inlineStyles: true }',
        textStyle: {
          inlineStyles: true,
          hoverOnly: false
        }
      }
    },
    {
      type: 'text',
      width: 8,
      height: 1,
      x: 4,
      y: 6,
      content: {
        title: 'Hover Styling',
        description: 'Hover over this card to see **hidden** ==styles== appear! ++Rainbowww++ and ^^bounceeee^^ work on hover too!',
        textStyle: {
          inlineStyles: true,
          hoverOnly: true
        }
      }
    },

    // ========================================================================
    // Animation Effects Demo (row 7)
    // ========================================================================
    {
      type: 'text',
      width: 6,
      height: 2,
      x: 0,
      y: 7,
      content: {
        title: 'Animation Effects',
        description: 'BentoUI includes fun animations: ^^bouncing text^^ that jumps character by character, and ++rainbow text++ with animated colors!',
        footer: 'Use ^^text^^ or ++text++ syntax',
        textStyle: {
          inlineStyles: true,
          hoverOnly: false
        }
      }
    },
    {
      type: 'list',
      width: 6,
      height: 2,
      x: 6,
      y: 7,
      content: {
        title: 'Styled Lists',
        items: [
          '**Bold items** for emphasis',
          '*Italic items* for notes',
          '==Highlighted items== for importance',
          '{{#1abc9c}}Colored items{{/}} for categories'
        ],
        textStyle: {
          inlineStyles: true,
          hoverOnly: false
        }
      }
    },

    // ========================================================================
    // Code Card Demo (row 9)
    // ========================================================================
    {
      type: 'code',
      width: 6,
      height: 3,
      x: 0,
      y: 9,
      content: {
        title: 'Quick Start Example',
        language: 'javascript',
        code: `// Initialize BentoUI with config
const bento = new BentoUI({
  container: '#bento-grid',
  nav: {
    enabled: true,
    logo: 'MyApp',
    theme: 'dark'
  },
  cards: [
    {
      type: 'text',
      width: 4, height: 2,
      content: {
        title: 'Hello World',
        description: 'Your first card!'
      }
    }
  ]
});`
      }
    },

    // ========================================================================
    // Chart & Stats (row 9)
    // ========================================================================
    {
      type: 'chart',
      width: 6,
      height: 3,
      x: 6,
      y: 9,
      content: {
        title: 'Weekly Activity Chart',
        data: [
          { label: 'Mon', value: 65 },
          { label: 'Tue', value: 85 },
          { label: 'Wed', value: 45 },
          { label: 'Thu', value: 95 },
          { label: 'Fri', value: 70 },
          { label: 'Sat', value: 35 },
          { label: 'Sun', value: 55 }
        ]
      }
    },

    // ========================================================================
    // Grid System Demo (row 12)
    // ========================================================================
    {
      type: 'stat',
      width: 3,
      height: 2,
      x: 0,
      y: 12,
      content: {
        value: '12',
        label: 'Column Grid',
        trend: {
          direction: 'positive',
          value: 'Desktop'
        }
      }
    },
    {
      type: 'stat',
      width: 3,
      height: 2,
      x: 3,
      y: 12,
      content: {
        value: '8',
        label: 'Tablet Grid',
        trend: {
          direction: 'positive',
          value: '< 1200px'
        }
      }
    },
    {
      type: 'stat',
      width: 3,
      height: 2,
      x: 6,
      y: 12,
      content: {
        value: '4',
        label: 'Mobile Grid',
        trend: {
          direction: 'positive',
          value: '< 768px'
        }
      }
    },
    {
      type: 'stat',
      width: 3,
      height: 2,
      x: 9,
      y: 12,
      content: {
        value: '2',
        label: 'Small Grid',
        trend: {
          direction: 'positive',
          value: '< 480px'
        }
      }
    },

    // ========================================================================
    // Image & Media Cards (row 14)
    // ========================================================================
    {
      type: 'image',
      width: 4,
      height: 3,
      x: 0,
      y: 14,
      content: {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
        alt: 'Abstract gradient background',
        caption: 'Image Card with Caption'
      }
    },
    {
      type: 'text',
      width: 4,
      height: 3,
      x: 4,
      y: 14,
      content: {
        title: 'Image Cards',
        description: 'Image cards support **lazy loading** for performance, ==alt text== for accessibility, and optional captions.',
        footer: 'Supports: jpg, png, gif, svg, webp',
        textStyle: {
          inlineStyles: true,
          hoverOnly: false
        }
      }
    },
    {
      type: 'list',
      width: 4,
      height: 3,
      x: 8,
      y: 14,
      content: {
        title: 'Media Support',
        items: [
          'Video cards with controls',
          'Audio player integration',
          'YouTube embeds (iframe)',
          'Custom media captions',
          'Responsive sizing'
        ]
      }
    },

    // ========================================================================
    // Feature Summary (row 17)
    // ========================================================================
    {
      type: 'list',
      width: 3,
      height: 2,
      x: 0,
      y: 17,
      content: {
        title: 'Card Types',
        items: [
          'text, image, stat',
          'chart, list, code',
          'bio, profile, github',
          'song, latestPost',
          'media, empty'
        ]
      }
    },
    {
      type: 'list',
      width: 3,
      height: 2,
      x: 3,
      y: 17,
      content: {
        title: 'Theming',
        items: [
          'Dark & Light modes',
          'CSS variables',
          'Smooth transitions',
          'Custom accent colors',
          'Font customization'
        ]
      }
    },
    {
      type: 'list',
      width: 3,
      height: 2,
      x: 6,
      y: 17,
      content: {
        title: 'Responsive',
        items: [
          '12-col desktop grid',
          '8-col tablet grid',
          '4-col mobile grid',
          '2-col small screens',
          'Auto card scaling'
        ]
      }
    },
    {
      type: 'list',
      width: 3,
      height: 2,
      x: 9,
      y: 17,
      content: {
        title: 'Integrations',
        items: [
          'GitHub contributions',
          'Last.fm now playing',
          'Blog post fetching',
          'JSON-driven config',
          'API methods'
        ]
      }
    },

    // ========================================================================
    // Empty Card Demo (row 19)
    // ========================================================================
    {
      type: 'empty',
      width: 4,
      height: 1,
      x: 0,
      y: 19,
      content: {
        message: 'Empty Card - Use as placeholder'
      }
    },
    {
      type: 'text',
      width: 8,
      height: 1,
      x: 4,
      y: 19,
      content: {
        title: 'Get Started',
        description: 'Check out the README for full documentation!',
        textStyle: {
          inlineStyles: true
        }
      }
    }
  ]
};

// ============================================================================
// Initialize BentoUI
// ============================================================================
const bento = new BentoUI(bentoConfig);

// ============================================================================
// Demo Helper: Log available API methods
// ============================================================================
console.log('%cBentoUI Demo Loaded!', 'font-size: 16px; font-weight: bold; color: #1abc9c');
console.log('%cAvailable API methods:', 'font-weight: bold;');
console.log('  bento.addCard(config)    - Add a new card');
console.log('  bento.removeCard(index)  - Remove card by index');
console.log('  bento.updateCard(index, config) - Update card');
console.log('  bento.setCards(array)    - Replace all cards');
console.log('  bento.toggleTheme()      - Toggle dark/light');
console.log('  bento.applyTheme(name)   - Apply specific theme');
console.log('  bento.destroy()          - Destroy instance');
