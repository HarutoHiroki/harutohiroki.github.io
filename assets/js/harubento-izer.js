// BentoUI Configuration
const bentoConfig = {
  container: '#bento-grid',
  nav: {
    enabled: true,
    container: '#bento-nav',
    logo: 'HarutoHiroki',
    logoUrl: '/',
    links: [
      { label: 'Home', url: '/', active: true},
      { label: 'Works', url: 'projects.html'},
      { label: 'Blog', url: 'blog.html'},
      { label: 'Graphs', url: 'https://graphtool.harutohiroki.com' },
      { label: 'Contact', url: 'mailto:root@harutohiroki.com' }
    ],
    theme: 'dark'
  },
  backToTop: {
    enabled: true
  },
  cards: [
    {
      type: 'profile',
      width: 4,
      height: 3,
      x: 0,
      y: 0,
      content: {
        avatar: 'https://avatars.githubusercontent.com/u/47408169',
        name: 'HarutoHiroki',
        alias: '',
        role: 'Professionally Unemployed',
        location: 'United States',
        bio: 'Master of writing mediocre code and engineering mediocre electronics. Does not shut up about security and privacy rights.',
        interests: [
          { icon: 'vr', label: 'Virtual Reality' },
          { icon: 'music', label: 'Music' },
          { icon: 'code', label: 'Programming' }
        ],
        skills: ['JavaScript', 'HTML/CSS', 'C/C++', 'Java', 'Python'],
        socialLinks: [
          { icon: 'github', url: 'https://github.com/HarutoHiroki', label: 'GitHub' },
          { icon: 'twitter', url: 'https://twitter.com/harutohiroki', label: 'Twitter' },
          { icon: 'youtube', url: 'https://youtube.com/@harutohiroki', label: 'YouTube' },
          { icon: 'twitch', url: 'https://twitch.tv/harutohiroki', label: 'Twitch' },
          { icon: 'kofi', url: 'https://ko-fi.com/harutohiroki', label: 'Ko-fi' },
          { icon: 'throne', url: 'https://throne.me/harutohiroki', label: 'Throne' }
        ]
      }
    },
    {
      type: 'text',
      width: 6,
      height: 2,
      x: 4,
      y: 0,
      content: {
        title: 'Welcome to my homepage..!',
        description: 'Ello there, I\'m {{#1abc9c}}Phong{{/}}, also known as {{#1abc9c}}HarutoHiroki{{/}} online. As you can probably infer from the card on the left, I\'m a {{#1abc9c}}programmer{{/}} and a {{#1abc9c}}hardware tinkerer{{/}} who also loves {{#1abc9c}}Music{{/}} and {{#1abc9c}}VR{{/}}. This is my personal homepage where I showcase some of my projects and share my thoughts. Feel free to explore around and check out my work!',
        textStyle: {
          inlineStyles: true,
          hoverOnly: true
        }
      }
    },
    {
      type: 'github',
      width: 2,
      height: 3,
      x: 10,
      y: 0,
      content: {
        username: 'HarutoHiroki',
        title: 'GitHub',
        months: 'auto',
        freeform: true
      }
    },
    {
      type: 'text',
      width: 6,
      height: 1,
      x: 4,
      y: 2,
      content: {
        title: 'Why another Bento styled homepage?',
        description: `Because everyone uses React and I {{#e74c3c}}__hate React__{{/}} so this is pure vanilla JS.`,
        textStyle: {
          inlineStyles: true,
          hoverOnly: true
        }
      }
    },
    {
      type: 'list',
      width: 3,
      height: 2,
      x: 0,
      y: 3,
      content: {
        title: '2026 Goals',
        items: [
          'Get CompTIA Security+ ++Certified++',
          'Finish some NDA projects',
          'Get a j*b + survive'
        ],
        textStyle: {
          inlineStyles: true,
          hoverOnly: true
        }
      }
    },
    {
      type: 'latestPost',
      width: 6,
      height: 2,
      x: 3,
      y: 3,
      content: {
        title: 'Latest Blog Post',
        blogUrl: 'blog.html',
        postsIndexUrl: 'posts/index.json'
      }
    },
    {
      type: 'song',
      width: 3,
      height: 2,
      x: 9,
      y: 3,
      content: {
        username: 'HarutoHiroki',
        apiKey: 'e8b54b9a65ca13b66db86cb4398f1f02', // I know it's still exposed here, but oh well
        title: 'Recently Played'
      }
    },
    {
      type: 'empty',
      width: 8,
      height: 1,
      x: 2,
      y: 5,
      content: {
        message: 'Placeholder til I can think of more cards to add...'
      }
    },
  ]
};

// Initialize BentoUI
const bento = new BentoUI(bentoConfig);