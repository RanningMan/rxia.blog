---
title: "How I Built and Launched My First App Using Mostly Free AI Tools"
date: "2026-02-06"
description: "How I Built and Launched My First App Using Mostly Free AI Tools"
tag: ["Vibe Coding", "Indie Hacker", "AI", "LLM", "ChatGPT", "12 startups in 12 months"]
isDraft: false
---

I’m a software developer with about ten years of experience, and I’ve worked at several software companies over the years. In early 2025, I started seriously experimenting with AI coding tools. After using them to build a few small websites, I was honestly blown away by the productivity boost.

That excitement eventually turned into a question: *What if I tried to build a real product end-to-end with AI?*

So toward the end of 2025, I started spending my evenings and weekends building my first app — **VinciPhoto** — almost entirely with the help of AI. I shipped it, published it to the App Store, and learned a ton along the way.

In this post, I want to share exactly how I used AI throughout the entire process: product ideation, design, development, go-to-market, and marketing. This is a candid breakdown of my workflow, tools, and lessons learned as a first-time indie developer.

There are already tons of AI tools on the market, each optimized for different use cases. I tried quite a few while building VinciPhoto, and I’ll list the ones that actually stuck. Since I didn’t want to burn money before the app made any revenue, I deliberately limited myself to **mostly free tools**. On top of that, I developed a simple SOP-style workflow that kept me moving fast without overthinking.

---

## 1. Product Ideation – ChatGPT

All product ideation and business planning happened inside **ChatGPT**. I used the free version, and honestly, it was more than enough.

I created a dedicated ChatGPT project and kept *everything* related to VinciPhoto inside it. My first step was dumping my rough, half-baked idea into ChatGPT and asking it to help me turn that into a reasonable PRD. After multiple rounds of back-and-forth, I ended up with a solid product requirements document.

The final PRD included:

- Core product requirements
- A basic GTM plan
- A rough revenue model
- Milestones and sequencing

One important detail: I didn’t use any other models, tools, or plugins at this stage (this was before “skills” were even a thing). In my prompts, I explicitly told ChatGPT to think like a **product manager**, not an engineer. I wanted clarity on *what to build* before worrying about *how to build it*.

---

## 2. Product Design – Figma Make

Once I was happy with the PRD, I moved on to UI/UX. I used **Figma Make**, again without paying anything.

I pasted my entire PRD into Figma Make, and it surprisingly generated a complete product design draft that felt like an **80/100** right out of the gate. From there, I asked it to explore a few different visual themes. I ended up choosing the one I now use in the app: **“joyable bubble.”**

With that baseline design in place, I started building the app one screen at a time. During development, I kept looping back to Figma to tweak layouts, spacing, and visual details for each individual page. Design and development happened in parallel instead of sequentially, which saved a lot of time.

---

## 3. App Development – VS Code + GitHub Copilot + Expo + Notion

With a mostly complete design ready, I started building the app.

I have a background in full-stack development, so I stuck with tools I already knew well: **VS Code** and **GitHub Copilot**, with **Expo** for the mobile stack.

The first thing I did was ask ChatGPT (Codex) to generate a high-level architecture based on my PRD. After several rounds of discussion and refinement, I locked down:

- The overall architecture
- The tech stack
- The key algorithms I’d need

From there, development was very structured and page-driven.

For each screen:

1. I asked Figma to describe the screen in **plain English** based on its own design.
2. That description became my prompt.
3. I created a `.prompt.md` file with a simple instruction:
    
    *“Based on the feature request below, generate an implementation plan.”*
    
4. I reviewed and edited the plan.
5. I fed the approved plan to GitHub Copilot.

I forced Copilot to work **step by step**, stopping after each step so I could review the code before moving on. This slowed things down slightly, but massively reduced bugs and rewrites.

For project management, documentation, and Kanban boards, I used **Notion** for everything. Nothing fancy — just enough structure to keep momentum.

---

## 4. Marketing – ChatGPT, Gemini, Reddit, and Xiaohongshu

Once the app was usable, I had five friends test it and give honest feedback. After fixing the most obvious issues, I moved on to:

- Naming the product
- Building a simple landing page
- Preparing App Store assets

The product name and App Store screenshots were created using a combination of **ChatGPT** and **Gemini**.

After launch, I worked with ChatGPT to figure out a marketing plan. We eventually decided on:

- **Reddit** and **Xiaohongshu (RED)** as primary channels
- **X (Twitter)** as a secondary channel

ChatGPT generated a surprisingly detailed **30-day marketing plan**, and I followed it almost exactly. I’m already seeing early users come in, which is incredibly motivating for a first solo product.

---

## Final Thoughts

Building VinciPhoto with AI didn’t remove the hard parts of product development — but it dramatically reduced friction. I moved faster, iterated more, and shipped something real without burning out or burning cash.

If you’re an experienced developer who’s been on the fence about building something solo, AI makes the “side project → shipped product” jump feel much more achievable.

More to come 🚀