---
title: How I Built CSS Coffee
date: "2023-02-14"
description: "I recently took up the 12 Startups in 12 Months Challenge. This blog does a reflection on what I did to launch the first project -- csscoffee.dev"
tag: ["web development", "12 startups in 12 months", "csscoffee"]
isDraft: false
---

Excited to embark on a bold new endeavor, I recently took up the 12 Startups in 12 Months Challenge, determined to transform myself from a mere feature-coding software engineer to a self-sufficient, product-building entrepreneur. My commitment to myself is to devote equal attention and effort to both product development and marketing activities for each project.

For my inaugural undertaking, I set my sights on creating a blogging platform, [csscoffee.dev](https://csscoffee.dev), that showcases a daily CSS demo to explore various CSS concepts. In this blog, I will do a reflection on the process of taking this idea from conception to fruition, as I built the platform and positioned it as a go-to resource for CSS enthusiasts and aspiring developers alike.

# Ideation

The idea for this project emerged during a recent group discussion with my work team. While CSS may seem straightforward at first glance -- without complex logic or sophisticated data structures -- it became clear that none of us on the team could confidently claim expertise in CSS. Despite all holding CS degrees (some even with Master's degrees), none of us had invested sufficient time in learning CSS. Inspired by this conversation, I immediately thought of creating a resource that would allow people to learn CSS in their spare time.

# Business Model

After my team discussion, I started planning how to bring the idea into reality. First, I laid out a feasible business model, including a profit model, promotion plan, delivery channel, etc. Then, I worked out a timeline that fit into one month.

From an operations perspective, I split the project into two phases. Phase one focuses on user growth, with a goal of getting 100 DAU (Daily Active Users) within the first year of launch. Once phase one is achieved, phase two can begin. This phase adds Adsense, releases native mobile apps, and sets up email subscriptions

```
Value Propositions
- What is the problem you are solving?
  Provide a light-weighted way to incrementally build knowledge about CSS by sharing one demo each day to illustrate a CSS concept.
- Why would someone want to have this problem solved?
  CSS is hard. CSS knowledge is not easily organized in a systematic way. People are busy.
- What is the underlying motivator for this problem?
  We frontend engineers want to keep learning everyday.

Customer Segment
The main customers of the site are CS students, boot camp students, frontend software engineers, backend software engineers who want to learn CSS, and self-learned/self-learning software engineers.

Customer Relationships
GitHub Issues will be used as the main communication channel to bridge customers and site maintainers.

Promotion Channels
I plan to promote through below channels: Product Hunt, CSS Weekly, Webdev Weekly, Personal Blog, Twitter account, Personal LinkedIn account, WeChat, Weibo, and Xiaohongshu.

Key Activities
Update content every day and push the updated content to end users through the chrome extension.

Key Resources
- GitHub, CodePen.io, and Vercel are the main platforms of to host content and the site.
- MDN and CSS-Tricks are good sources of topic inspiration.

Key Partnerships
All the readers and some tech sector influencers are my potential partners.

Cost Structure
- Time cost: 1 month of project development + 2hrs/day of content creation + 1hrs/week of promotion
- Domain cost: $13/year.

Revenue Streams
For the current phase (phase one), there will be no revenue. Once the goal of getting 100 DAU has been achieved, future revenues will be expected through ads, sponsorship, and donations.
```

# OKRs

I leveraged OKR in this project to manage objectives and help come out with a timeline.

![OKRs.jpg](./OKRs.jpg)

# Product Design

As most people do, when it comes to product design, coming out with a few user stories are always a good first step.

### User Stories

1. Bob is a junior frontend developer straight out of college, he viewed the website and read through the content for today. He finds it insightful then he bookmarked it for the future. He comes back every day for new content.
2. Bob wants to view past content, so he scrolls down the page from the website and looks for content published 20 days back.
3. Bob wants to save a click from the bookmark, so he downloaded the chrome extension and set it as his startup page.
4. Bob wants to read it in Chinese so he switched the language to Chinese.

### UI/UX Design

Albeit not an expert, using Figma, with some exploring and study, I managed to build a relatively decent UI for the website.

### System Design

Now it comes to system design - my favorite part.

#### Requirements:

1. Preload 30 days of content, lazy load more content while users scroll down.
2. Scalability: The expectation is to support 100 DAU.
3. Use Vercel to host.
4. Use Clarity to monitor (may change to Google Analytics).
5. SEO best practice.
6. Framework choice: Next.js + react-infinite-scroll-component + Prism.js

#### Architecture

![architecture](architecture.png)

The architecture is of the website is relatively straightforward as it is one page site. To get best user experience, server-side rendering is used on each page-load request which only renders 5 most recent cards, while client-side rendering takes effect on further data fetching upon scrolling.

#### Data persistence

1.  Posts persistence: posts are stored in .md files with name [date].md (eg. 2023-01-25.md). These .md files are stored on the GitHub repo.
2.  Telemetry data: telemetry data are stored in 3rd party Vercel analytics as well as MsClarity.

# Promotion Plan

Besides the promotion channels mentioned above, I also spent some time on creating a reasonable [GitHub repository](https://github.com/RanningMan/css-coffee) so that people can visit and open up issues. In addition to the website, I also built a [Chrome extension](https://chrome.google.com/webstore/detail/css-coffee/obgkjajddjldijbjefcckkgnlkogihec) that enables users to check the most recent content quickly.

# Conclusion

### Current State of Project

At the time this blog is written, the site [csscoffee.dev](http://csscoffee.dev) and the [Chrome extension](https://chrome.google.com/webstore/detail/css-coffee/obgkjajddjldijbjefcckkgnlkogihec) is generally available. Without any promotion, there are already consistently 5 returning visits every day!

### Reflection

OKRs were a critical tool in helping me launch the website from scratch in just three weeks. By setting clear Objectives and measurable Key Results, I was able to create a roadmap and stay focused. OKRs enabled me to prioritize and execute one task at a time. While I'm not an OKR expert, I found "Measure What Matters" by John Doerr to be an excellent resource. For those who don't have the time to read the book, I've shared my key takeaways on [my blog](https://rxia.blog/measure-what-matters/). I highly recommend checking it out!
