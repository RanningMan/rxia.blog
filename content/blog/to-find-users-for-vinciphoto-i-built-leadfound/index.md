---
title: "To find users for VinciPhoto, I built LeadFound"
date: "2026-11-18"
description: "VinciPhoto took six months to get two paying users. Finding them by hand on Reddit, X and Hacker News worked, but one person couldn't keep it up, so I built LeadFound to automate it."
tag: ["Indie Hacker", "Marketing", "Growth", "AI", "LeadFound", "VinciPhoto"]
isDraft: false
---

## The product was done. Now what?

[VinciPhoto](/vinci-photo-development-share/) is a tool I built that finds duplicate and similar photos and helps you clean up your photo library.

While I was building it, all I thought about was features: how accurate the matching was, how fast it ran, how good the interface looked.

I was pretty excited on launch day. Then it took more than six months to get my [first two paying users](/vinciphoto-first-sale/).

That's when something many indie developers already know finally hit me: building a product is one job. Getting the people who need it to know it exists is a completely different job.

## Finding users the hard way

I knew where my potential users were. On Reddit, X and Hacker News, someone posts every day asking: "Is there a tool that actually finds duplicate photos? I've got tens of thousands in my library and the built-in feature misses most of them."

Posts like that are a gold mine. The problem is that digging them up is exhausting:

1. **Finding.** Every day I opened several sites and searched with different keywords. Most results were irrelevant, out of date, or already answered.
2. **Reading.** The results were in English, sometimes Japanese or German. Every one had to be translated, understood, and judged: does this person really want a solution?
3. **Writing.** This was the hardest step. I'd work out what to say in Chinese first, translate it into English, then revise it again and again. I was always afraid it would sound odd, or read like an ad, and often I ended up not posting at all.
4. **Not getting banned.** Every subreddit has its own rules, and some ban self-promotion outright. Get a reply wrong and a deleted post is the least of it. The real damage is to your account's reputation.

I kept at it for a week. It did bring in a few users, and people did visit my product page, but it was simply too much work.

So here's what I learned: the method is right, but one person can't keep it up. And for a developer like me, whose first language isn't English, it's twice as hard.

## So I built another product

It's called LeadFound, and it automates the four steps above.

You tell it what your product is (or just paste your product's URL), and it will:

1. **Find:** search Reddit, Hacker News, Bluesky, X, LinkedIn, Instagram, TikTok and more every day for posts where people are asking questions, looking for tools, or complaining about a competitor. In any language.
2. **Filter:** score each post's buying intent from 1 to 10 with AI. Only 5 and above counts as a lead. It also reads the replies under a post, so it can tell an open question from one that's already been answered. Give a lead a thumbs up or down and it takes that into account next time.
3. **Translate:** show you each post in your own language.
4. **Write:** you write a reply in your own language, or let the AI draft one (share experience, recommend directly, tell a story, ask a question, or send a direct message), and it translates it back into the post's language. You see the translation first and only use it once you're happy with it.
5. **Check:** before you post on Reddit, it reads that subreddit's rules and tells you whether your reply is likely to be removed as an ad.

<!-- TODO: add screenshot of the lead list -->

_The lead list: English posts translated into Chinese and scored for buying intent. (Sample data.)_

<!-- TODO: add screenshot of the draft page -->

_The draft page: write in Chinese, run a safety check, then translate back into English and copy. (Sample data.)_

The last step is yours: click "Copy & Open Thread", paste, and post. LeadFound never posts for you, and it never stores your login for any platform. Your account's reputation is the most valuable thing you have, so whether and how to post should be your call.

There are a few tools like this out there, but every one I've tried only serves English speakers. And people like me, native Chinese, Japanese or Korean speakers selling to the whole world, are exactly the ones who need it most. LeadFound's interface comes in 15 languages.

## Three things VinciPhoto taught me as LeadFound's first user

LeadFound's first user was VinciPhoto. A lot of its design decisions were forced by it.

**1. Keywords should be what users say, not how you describe your product.** The first version had AI generate keywords from the product description, and it came up with feature descriptions like "delete duplicate & similar photos". On Reddit, that matched one post a week. Switching to what people actually type, "duplicate photos", matched 45 a day. The rule now: one to three words that an ordinary person would actually write in a post.

**2. My own tool couldn't read my own website.** LeadFound can take a URL and draft the product description and keywords from it. When I tried vinciphoto.app, all it saw was a title and an empty `<div>`, because the site is a single-page app rendered entirely by JavaScript. Plenty of indie developers' sites are built the same way. So I added a step: if the page is an empty shell, a cloud browser renders it first and LeadFound reads the result.

**3. Every platform has its own quirks.** At first, AI drafts were written the Reddit way, three to five sentences. On X, a reply came out two or three times too long, and I only found out when the paste was rejected. Now LeadFound writes to each platform's length limit (X's 280 characters, Bluesky's and Threads' limits too), accounts for how CJK characters count, and shows a counter under the editor that warns you when you go over.

## Where things stand

Honestly: LeadFound is live, but apart from me it has no users yet. Yes, I'm back at the same problem I had after finishing VinciPhoto. The difference is that this time I have a tool to solve it.
