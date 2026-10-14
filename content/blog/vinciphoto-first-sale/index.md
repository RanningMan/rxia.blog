---
title: "My First $4.24: Ten Months From Side Project to First Sale"
date: "2026-10-14"
description: "How VinciPhoto went from a free 1.0 to its first paying user: six months to reach ten users, a monetization spec, an App Store rejection, and a $4.99 sale from someone I'll never meet."
tag:
  ["Indie Hacker", "iOS", "Monetization", "Pricing", "App Store", "Vibe Coding"]
isDraft: false
---

On a day in September, someone I'll never meet paid $4.99 for VinciPhoto, an iOS app I build on nights and weekends. After Apple's cut, I keep $4.24.

It's the smallest amount of money I've ever been this happy about. Getting there took about ten months, a free 1.0, six months of waiting for ten users, and one App Store rejection. This is the whole road, including the parts I got wrong.

---

## The app, and why I built it

I've been a software developer for about ten years. In early 2025 I started using AI coding tools seriously. By the end of the year I wanted to know whether I could [ship a real product end to end, mostly with AI](/vinci-photo-development-share/).

I picked a photo-library cleaner. It groups near-duplicate bursts and keeps the sharpest shot. It clears old screenshots in bulk, converts Live Photos to stills to save space, and lets you swipe through a month of photos in about a minute. Everything runs on the phone: no account, no upload, and no server that ever sees a photo.

---

## Phase 1: Free, on purpose

1.0 shipped free, with no ads and no in-app purchases. I didn't want to price something before I knew anyone would use it.

I set myself one rule: no work on 2.0 until 10 people found the app on their own. I wrote a six-part build retrospective on Xiaohongshu (RedNote) as my main "marketing" channel.

Reaching 10 organic users took until July 3, 2026, about six months. That number is humbling, and it's the most useful thing I learned all year. Building was never the bottleneck. Getting found was.

---

## Phase 2: Deciding how to charge

In July I wrote a monetization spec before touching any code. Two facts about this category shaped it:

1. **Photo cleanup is episodic.** People clean once, free up a lot of space, and have no reason to come back for months. Subscriptions churn badly here.
2. **The value is easy to count.** "You can free up 24 GB" is a number anyone understands immediately.

Those two facts led to four decisions.

**Gate actions, not discovery.** Free users run the full scan and see every result, including the total space they could get back. The limits are on actions: 50 deletes, 5 AI searches and 5 Live Photo conversions per day. A rewarded ad adds 25 deletes or 3 searches, up to twice a day. Scan results and undo are never gated, because gating trust features costs more in reviews than it earns.

**Price at "don't think about it."** Premium is $4.99 for lifetime access, and the paywall pre-selects it. Monthly ($0.99) and annual ($3.99) exist mostly as anchors that make lifetime look obvious. I chose volume over revenue per user. You can raise a price later for new buyers, but lowering one is much harder. There's no free trial, because a trial on a $4.99 product only adds friction.

**Ask at the happy moment.** The best time to ask for money is right after the app has done what it promised, on your own photos, with a real number attached. When a cleanup finishes and the confetti fires, there used to be an ad. I replaced it with a premium card that shows the space you can still reclaim, and the price. Every upsell shows the price instead of a bare "Go Premium." The app also opens at most one paywall per session on its own. When you run out of a daily limit, the free options (wait until tomorrow, or watch an ad) come before the paid one.

**No accounts, even for buyers.** Purchases go through RevenueCat with anonymous IDs, so paying needs nothing but the Apple ID already on the phone. Restore Purchases sits on the paywall and in Settings, and a reinstall restores the purchase on its own.

Then 2.0 had to be worth paying for. It added search by description ("dog on the beach", "receipts") with an on-device CLIP model. It also added automatic best-shot picks in every burst, automatic categories, and a cleanup history. That took 111 commits, almost all written with AI. Each change started from a short design doc and plan that I reviewed before any code changed.

---

## Phase 3: Getting through App Store review

2.0 was the first version with in-app purchases, ads and analytics, which is where nearly all review risk comes from. Before submitting I did a full self-audit and caught three things that would have meant certain rejection:

- A footnote under every plan said it was a one-time payment, including monthly and annual, which auto-renew. Now it only shows under lifetime.
- Nothing near the buy button said the subscriptions auto-renew. The only mention came after purchase.
- The App Privacy answers still said "no data collected," left over from 1.0. That contradicts asking for tracking permission.

It got rejected anyway. The reviewer couldn't find the App Tracking Transparency prompt. The app did ask for it, but iOS only shows that dialog while the app is fully active. On a fresh install, another permission prompt could be on screen at that exact moment, and iOS dropped the request without an error. A later build came back as an invalid binary because of a privacy-manifest setting, which I had to revert.

**Lesson:** test every permission prompt on a clean install, on an iPad, the way a reviewer would.

---

## Phase 4: The quiet part

2.0 went live on Aug 28. On September 20, revenue was still $0.00.

I kept shipping small fixes. The app now warns you that the first scan is slow and to keep it open. Scans keep running in the background on iOS 26, and photo categories now show their progress while a scan runs.

Around September 22, an analytics audit found a gap I should have caught earlier. Purchase events fired once, at the sale, but nothing else carried paid status. I had no way to see what paying users actually did in the app. Now every event carries whether the user is premium and on which plan, and analytics is linked to the RevenueCat ID.

---

## The first sale

On Oct 12, on my way back from a two-week vacation, I checked App Store Connect and found a $4.99 lifetime purchase that had come in while I was away. After Apple's 15% small-business cut, that's $4.24.

Here's the part I like most: I have no idea who it was. There's no account, no email and no login, by design. All I can see is an anonymous ID and a receipt. If that was you: thank you. You turned a side project into a product.

A second paying user followed. That's 2.

---

## What I'd keep

- **Free first.** The free 1.0 brought real users and real feedback. Pricing something nobody uses is guessing.
- **Gate actions, not discovery.** Let people see what the app can do for them before you ask for money.
- **An impulse price.** At $4.99 the first "yes" is easy. Raise it later if conversion supports it.
- **Ask after the win.** Put the upsell where people are happiest, not where they're blocked.
- **Spec before code.** Writing the spec first showed me that two planned premium gates would take features away from existing free users. I dropped both.

## What I'd change

- **Know who's paying from day one.** Tag paid status on every analytics event before the first sale, not after.
- **Test like a reviewer.** Fresh install, iPad, every permission prompt.
- **Start distribution earlier.** Six months to reach ten organic users means the bottleneck was never the code.

---

## By the numbers

| Metric                        | Value                                   |
| ----------------------------- | --------------------------------------- |
| Started building              | Late 2025, nights and weekends          |
| 1.0 price                     | Free, no ads, no in-app purchases       |
| Time to 10 organic users      | About 6 months (July 3, 2026)           |
| Commits in 2.0                | 111                                     |
| Premium price                 | $4.99 lifetime, $0.99/month, $3.99/year |
| First sale, after Apple's cut | $4.24                                   |
| Paying users now              | 2                                       |

---

## What's next

The next targets are 5 paying users and 100 daily actives. The next stretch is about distribution: more writing, more channels, and less code.

If you're building something similar, I'm happy to answer questions about the quota numbers, the pricing, or App Store review.
