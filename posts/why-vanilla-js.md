---
title: Why I Built This Site With Vanilla JavaScript
date: 2026-01-01
tags: [javascript, web-dev, opinion]
---

In 2026, the web development landscape is dominated by frameworks. React, Vue, Svelte, Solid, Qwik... the list goes on. So why did I decide to build this entire site, including this blog, with plain vanilla JavaScript?

## The Framework Fatigue is Real

Don't get me wrong - frameworks have their place. They solve real problems:

- Component reusability
- State management
- Virtual DOM optimization
- Developer experience

But somewhere along the way, especially with the rise of LLMs and AI-assisted coding, I've noticed a trend of over-reliance on frameworks for even the simplest projects. Everyone and their grandma seems to be using React with a noticeable purple gradient for everything from to-do lists to personal blogs.

## The Problems I Had With Frameworks

### 1. Bundle Size Bloat

If you run `npx create-next-app@latest` right now, you'll get a starter app with a whopping ~400MB of node_modules and files before you write a single line of your own code. That's absurd to me. The blackhole node_modules meme is evergreen.
Yes I know if I compare my self written vanilla JS site to a React app it's not a fair comparison, but still - for a simple blog and portfolio site, do I really need 300KB+ of JavaScript to load just to show some text and images?

### 2. Build Complexity

With vanilla JS, my "build process" is:

1. Write code
2. Refresh browser
3. Done

No webpack. No babel. No 47 configuration files. No waiting for hot module replacement. Just instant ~~gratification~~ feedback.

### 3. Dependency Hell

Every npm package is a potential security vulnerability, a potential breaking change, a potential abandoned project. My site has **zero npm dependencies** for production.
Literally proving my point, just last month a critical vulnerability was found with react (React2Shell) that could allow RCE attacks. If I were using React, I'd have to scramble to patch or update my dependencies. With vanilla JS, if I fuck up, it's on me.

## What Vanilla JS Gave Me

### Full Control

Every line of code is mine. I understand exactly what's happening. No magic, no abstraction layers, no "it just works" black boxes.

### Performance

This site loads **fast** (I think). No JavaScript parsing overhead from framework code. The browser does what browsers do best - render HTML and CSS.

### Simplicity

I kinda didn't like the complexity and overhead that comes with modern frameworks. Sometimes, less is more.

### General tiredness of seeing so many React Apps

As said above, everyone and their grandma is now moving to React for everything, EVEN THINGS NOT NEEDED TO BE WEB APPS. From wechat ruining it's beautiful native experience with WebApp slop, to the hillarious method of preventing OOM by Discord: killing itself if it uses >4GB of RAM.

## The Counter-Arguments

### "But muh developer experience!"

Modern vanilla JS is actually pretty nice:

```javascript
// Template literals for HTML
const card = `
  <div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
  </div>
`;

// ES6 classes for organization
class CardRenderer {
  constructor(config) {
    this.config = config;
  }
  
  render() {
    // Clean, readable code
  }
}

// Native fetch for API calls
const data = await fetch('/api/posts').then(r => r.json());
```

(I also started out using pure HTML, CSS, and JS back in 2019, so it's not like I was starting now with no experience.)

### "But scaling!"

For a portfolio/blog? I don't need to scale. This isn't Twitter. If this somehow gets millions of visitors, that's a good problem to have.

### "But SEO!"

Static HTML. Search engines love it. No need for server-side rendering frameworks to solve a problem I created by using client-side rendering in the first place.

## When TO Use Frameworks

I'm not saying frameworks are bad. Use them when:

- Building a complex web application (not a website)
- Working with a team that needs standardization
- The project genuinely benefits from the framework's features
- You're building something that needs the ecosystem (like admin dashboards)

## Conclusion

The web platform has evolved massively. CSS can do things that used to require JavaScript. JavaScript can do things that used to require libraries. The browser's APIs are powerful and well-documented.

Before reaching for that `npx create-react-app`, ask yourself: **Do I actually need this?**

For my portfolio and blog, the answer was a resounding **no**.

---

*What do you think? Am I a dinosaur refusing to adapt, or is there wisdom in simplicity?*
