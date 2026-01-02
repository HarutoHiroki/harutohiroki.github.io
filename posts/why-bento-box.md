---
title: "Why Did I build yet another Bento Box themed UI Library?"
date: 2026-01-02
tags: [javascript, web-dev, opinion]
---

In this day and age, with LLMs and AI tools making coding easier than ever, everyone seems to be making a new framework every other second. A sane developer would probably just pick an existing popular framework and stick with it. So why did I decide to build yet another UI library, especially one themed around Bento Boxes which has been done to death?

## The Inspiration Behind "[Y](color:#1abc9c)et [A](color:#1abc9c)nother [BE](color:#1abc9c)nto UI" (YABE UI)

This all started a few years ago actually, before the AI vibe coding boom, before everyone made their own Bento themed page with that one new react component. I was going to build this exact site using Next.js and React after seeing a developer's website that also had the Bento Box aesthetic.

I would LOVE to credit the original inspiration but sadly due to Google search engine degradation, I can't find the site anymore. If you know which site I'm talking about, please tell me! All I could remember that it had this really nice idea where the dev's mascot sprite (?) would move from card to card as you hover on each of them, and that they did some Game CTFs. 

I then, as someone suffering from cripling ADHD, never got around to finishing the site, and it just sat in my projects folder for years. During that time, I grew to dislike React due to having to make several other React apps for school and work, and I never really liked the process of writing React code. 

Additionally, Bento.me had recently announced that they were shutting down their service, which was a bummer because I kinda liked using their style for a link sharing page. I thought to myself, "Curse you aquisitions, why must you ruin yet another good service?" 

So, during a totally not lonely 2025 Christmas night, I decided to finally finish my bento themed personal site,... using nothing but Javascript and CSS,... like a true madman. Thus, YABE UI was born.

## The journey of building YABE UI

I didn't really look at any existing Bento themed libraries when building this, I just kinda winged it based on what type of cards I would want and pinned w3schools to my second monitor for reference. I remember having a set design in mind back when I first started a few years ago but I totally forgot what it was, so I just improvised as I went along. I knew I wanted a profile card, blog cards, a text card for random texts, and a github card idea I took from bento.me because I thought it looked neat. 

The hardest part was definitely getting the layout to be responsive and look good on all screen sizes. I ended up using CSS Grid for the main layout and Flexbox for the cards themselves. Of course, the worst part of building anything front end is supporting the plebs on mobile with every manufacturer and their own screen size and browser quirks. But I remembered that one funny post where the developer just said "The developer for this website has a life and didn't add mobile support, use a bigger screen" so I just said "screw it" and copied that same idea. I did tone it down a bit by just making sure it doesn't look completely broken on mobile, but then use that message as a warning popup if the screen is too small.

I then made some custom markdown-like syntax for formatting text within the cards, because I wanted to do more than just plain bold, italics, and strikethrough. Here's what I came up with:

- **Highlights**: `==highlighted text==` or `==#color|highlighted text==`
- **Animations**: `^^bouncing text^^` and `++rainbow text++`
- **Custom styling**: `[styled text](color:#fff;size:1.5em;weight:bold)`

You can even nest and combine these for some really fun effects like ==^^++bouncing rainbow highlights++^^==!

Then came the blog engine. Apparently I had too much time on my hands (as per comments of friends) because instead of using an existing engine, I built a custom markdown blog engine to power the blog section of this site. Well, I am professionally unemployed so time is of no matter to me I guess. It supports basic markdown features like headings, bold/italic text, links, images, code blocks, and lists. It also supports some custom theming syntax that I cooked up above

## What I Learned

Building YABE UI taught me a lot about the modern web platform. CSS Grid is absolutely incredible for layout. The fact that I could build a responsive 12-column grid system without any JavaScript is insane. 

I also learned that sometimes the **simple approach** is the best approach. No complex state management, no virtual DOM magic, just DOM manipulation and event listeners. It's **boring**, but boring is ==reliable==.

## The Takeaway

This framework is in no way perfect or complete. There are still many features I want to add, like more card types and better theming options. But for now, I'm happy with what I've built.

If anything, I'm fixing bugs as I'm writing this very blog post using YABE UI itself. It's a fun little project that takes my mind off how bad things are in the world right now.

---

Thanks for reading! If you want to check out YABE UI or see how it was built, everything is open source. And hey, if you build something cool with it, let me know!

*- HarutoHiroki* 