---
title: "I Vibe Coded a Todo List for Myself"
date: "2026-06-24"
description: "Building BurnTheList — an iOS daily checklist app that reads from a Google Sheet, generates tasks with AI, and burns through your day one flame at a time."
tag: ["vibe coding", "iOS", "Swift", "AI", "SwiftUI", "side project"]
isDraft: false
---

There is a specific kind of software that only you will ever fully appreciate: the kind you build for yourself, for a problem you've tried to solve with five other tools and failed. [BurnTheList](https://apps.apple.com/us/app/burnthelist/id6762330728) is that kind of software. It's a daily checklist app for iOS. It reads tasks from a Google Sheet. It lets you type what you want to do in plain English and uses AI to figure out the structure. When you check something off, flame particles shoot up the screen.

I'm a software engineer. I built this for myself. Here's how it went.

---

## The Problem

My daily routine has a short list of things I actually want to do every day: Leetcode, focused coding practice, a workout, a few project-specific tasks that shift week to week. Not a sprawling backlog. Not a project management board. Just: *what should I do today, and did I actually do it?*

The issue wasn't motivation or discipline. It was friction. Every morning I'd wake up knowing roughly what I wanted to accomplish, but nowhere good to put it and check it off as I went.

I have a Google Sheet where I've been planning this kind of thing for years. Each row is a date. Each column is a task. It's the kind of structure that makes sense to me — I can look back, I can plan ahead, I can edit it on any device. But I had no good way to consume it as a *live checklist* during the day, especially on my phone.

---

## Why Existing Apps Didn't Work

Every productivity app I tried had the same problem: it wanted to be my whole system. Notion wanted me to migrate my notes. Todoist wanted to own my tasks. Things wanted me to invest in GTD. Linear, which I love for work, was overkill for personal ops. Apple Reminders is fine but has no concept of "daily recurring structure from an external source."

What I actually wanted was something much simpler: a phone app that reads my Google Sheet in the morning and shows me today's row as a checklist. No database sync, no account, no $10/month subscription. Just: here's what you planned, go do it.

None of the apps I tried could do that. So I built it.

---

## The Spreadsheet Integration

The core feature — and the one that required the most careful thought — is the Google Sheets sync.

Google Sheets has a "publish to web" feature that lets you export any sheet as a CSV at a public URL. BurnTheList uses this as its data source. You paste in a sheet URL, and the app fetches it, parses it, and shows you today's tasks. No Google API key, no OAuth dance, no backend required.

The URL normalization alone took some iteration. Users paste all kinds of URLs: `docs.google.com/spreadsheets/d/{id}/edit#gid=0`, direct export URLs with `format=csv`, older `/pub?output=csv` publish URLs, edit links with `gid` parameters in fragments or query strings. The sync service normalizes all of them to the canonical export format:

```swift
static func csvExportURL(from urlString: String) -> String {
    // Already a CSV export URL
    if urlString.contains("/export") && urlString.contains("format=csv") {
        return urlString
    }
    // Extract spreadsheet ID and reconstruct...
    let exportURL = "https://docs.google.com/spreadsheets/d/\(spreadsheetID)/export?format=csv"
    // Preserve gid parameter for specific sheet tabs
    ...
}
```

The parser, `TaskSheetParser`, handles two sheet layouts:

**Column-based** (what I use): a `Date` column, then one column per task. A cell containing any non-empty value means that task is planned for that day. The column header becomes the task title.

```plaintext
Date       | DSA (30m/day) | FE Coding | Workout
2026-06-23 | x             | x         |
2026-06-24 | x             |           | x
```

**Row-based**: each row starts with a date, followed by task titles. Better for ad hoc daily planning where tasks vary.

```plaintext
2026-06-23 | Fix auth bug | Write tests | Team sync
2026-06-24 | Deploy staging | Code review
```

Auto-detection is the tricky part. The parser tries column-based first, then checks for row-based heuristics. The heuristic is conservative — a row-based sheet has to actively look like one (most rows start with a recognizable date, neighbor cells look like task titles rather than status markers like "yes"/"no"/"x"). This guards against silently misinterpreting a column-based sheet that happened to lack a "Date" header.

When neither format matches, the parser gives you a specific reason rather than a generic error:

```swift
enum SheetFormatProblem {
    case emptySheet
    case noTaskColumns      // "Date" header exists but no other columns
    case noDatedRows        // "Date" header exists but no row has a date
    case emptyTaskCells     // Has dated rows but every task cell is blank
    case looksLikeMarkers   // Cells beside dates read as yes/no/x
    case rowsMissingDates
    case noDatesFound
}
```

This kind of error message — "Your first column has dates, but the cells beside them look like status markers instead of task names" — is the difference between a tool that helps you and one that leaves you debugging.

The app supports multiple worksheets. Each worksheet's tasks get namespaced by worksheet ID (`{worksheetID}::{taskID}`) so completion state stays isolated when you add, remove, or re-order sources.

---

## The AI Task Generation

This is the feature I added second, after living with the pure spreadsheet version for a while.

The spreadsheet is great for recurring structure — things you planned a week ago that still apply today. But sometimes you open the app at 9am and think: "I also need to call the bank, prep for the 2pm, and finish that PR." Those are today-only tasks. You don't want to open Google Sheets, find the right row, type them in, and then re-sync. You want to describe them and have them appear.

The "Plan with AI" flow works like this:

1. You tap the AI button and type something like: *"Finish the app icon, review PR feedback, call Sam, and work out."*
2. The app sends that text — along with today's existing task list — to a backend endpoint (OpenAI via a server I run).
3. The endpoint returns structured operations: add this task, update that one, delete the other.
4. You get a review screen showing each proposed change with a toggle. Duplicates are flagged and unchecked by default.
5. You confirm, and the tasks are added locally.

The wire format for the backend response supports three operations:

```swift
enum AITaskAction: String, Codable {
    case add
    case update
    case delete
}
```

The review step is non-negotiable. I've never shipped an AI feature where I was comfortable with auto-apply. The model gets things right most of the time, but "most of the time" isn't good enough when you're touching someone's task list. Showing a diff and letting the user confirm takes two seconds and prevents the cases where the AI misunderstands your intent.

The existing task list is sent with each request so the model can handle relative instructions — "reschedule my workout to tomorrow," "mark the PR review as done" — rather than treating every prompt as a clean-slate add. The response parser handles a legacy `tasks`-only format alongside the current `operations` format, which I needed for a smooth API version transition.

Duplicate detection runs client-side after the AI responds: normalize both titles (lowercase, letters/numbers only), compare against what's already stored for that date. If there's a match, it gets flagged without being blocked — you can still add it if you meant to.

---

## The Data Model

Everything is date-isolated. The core type is `DailyTask`:

```swift
struct DailyTask: Codable, Hashable, Identifiable {
    let dateID: String    // "2026-06-23"
    let taskID: String    // slug of the task title
    let title: String
    let sortOrder: Int
    var isCompleted: Bool

    var id: String { "\(dateID)|\(taskID)" }  // compound ID
}
```

The compound `dateID|taskID` key means checking off a task on Tuesday doesn't affect Wednesday's instance of the same task. This matters most for recurring tasks from a Google Sheet: the sheet says "DSA (30m/day)" appears on 90 consecutive days, but each day's completion is independent.

Persistence is via `UserDefaults` with an app group suite (`group.com.rxia.BurnTheList.shared`). The app group is what makes widget data-sharing work without any IPC — both targets read and write to the same `UserDefaults` store. This is the most iOS-idiomatic architecture for this use case: no SQLite, no CoreData, no backend. Just serialized JSON in the system key-value store.

There are four distinct stores in `UserDefaults`:

- **History**: all tasks from Google Sheet syncs, keyed by date
- **Generated tasks**: tasks added via AI or manual entry, keyed by date
- **Completion map**: `dateID|taskID → Bool`, isolated per day, pruned of stale entries
- **Overrides**: title edits and deletions layered on top of synced tasks

The read path merges all four, applies overrides, and produces a stable display-ordered list. The write path for sheet sync (`replaceWorksheetTasks`) is careful: it strips all of a worksheet's previous contributions before writing the new ones, so edits to the sheet propagate correctly on the next sync rather than accumulating duplicates.

---

## The Widget

The home screen widget was a priority from day one. A checklist app you have to open is a worse checklist app.

The widget uses WidgetKit's `TimelineProvider` and `AppIntent` for interactive task toggling. Tapping a task row fires `ToggleTaskIntent` without opening the app:

```swift
struct ToggleTaskIntent: AppIntent {
    @Parameter(title: "Task ID") var taskID: String
    @Parameter(title: "Date ID") var dateID: String
    // perform() writes to the shared ChecklistStore and reloads all timelines
}
```

The widget reads from the same app group `UserDefaults`, so it always reflects the current completion state. It refreshes its timeline every day at 00:05 to pick up the new day's tasks automatically.

Theme awareness runs through the widget as well. All five themes — Cyberpunk (neon cyan/magenta on near-black), Vaporwave (purple haze), Terminal (green-on-green), Blood Red, and Minimal — are stored in configuration and read by the widget so it matches whatever theme the user has selected in the app.

---

## The Completion Effect

When you check a task off in the main app, flame particles animate up the screen. Eight particles spawn with randomized x-offsets and scales, rise 20-40pt, and fade out over 700ms. There's also a brief neon flash on the card background.

```swift
private func triggerBurn() {
    // Flash the card
    withAnimation(.easeIn(duration: 0.1)) { showFlash = true }
    withAnimation(.easeOut(duration: 0.4).delay(0.1)) { showFlash = false }

    // Spawn and animate particles
    particles = (0..<8).map { _ in
        FlameParticle(x: .random(in: -20...20), y: 0,
                      scale: .random(in: 0.6...1.2), opacity: 1.0,
                      color: [completedAccent, .orange, .red, .yellow].randomElement()!)
    }
    withAnimation(.easeOut(duration: 0.7)) {
        particles = particles.map { /* rise, spread, fade */ }
    }
}
```

This is the kind of thing that takes 30 minutes to build and makes you actually want to check things off. The name "BurnTheList" came from this effect — the idea that you're burning through your tasks rather than crossing them off.

---

## What "Vibe Coding" Actually Means Here

I want to be specific about this because "vibe coding" gets used loosely. What I mean is: I built this primarily through conversation with an LLM (Claude), describing what I wanted, reviewing what it produced, pushing back on things that felt wrong, and iterating.

This has real implications for the codebase:

**The good:** Features got built faster than they would have solo. The AI was particularly useful for boilerplate-heavy parts — parsing logic, serialization, WidgetKit configuration — where I know what I want but would have spent time looking things up. The test suite is better than it would have been; the AI tends to write tests alongside implementations, and I kept them.

**The instructive:** I had to push hard on certain architecture decisions. The first draft of the completion state model was date-agnostic — one global completion map rather than per-day isolation. I caught this before shipping, but only because I was reading the code carefully. Vibe coding requires active review, not passive acceptance.

**The interesting:** The code has a voice. Monospaced fonts everywhere — not just for the terminal aesthetic, but because the AI and I converged on them early and they stuck. The error messages in `SheetFormatProblem` are verbose and user-friendly in a way I might not have written solo; the AI leans toward explanatory copy. Whether that's better or worse is taste.

**What it's not:** Vibe coding is not "I described an app and it appeared." Every feature required multiple rounds. The sheet format detection heuristics took an afternoon of back-and-forth. The data migration for adding multi-worksheet support — rewriting existing task IDs to the namespaced format while preserving completion state — was careful work that I had to reason through explicitly. The AI helped implement it, but I had to think through the edge cases.

The honest summary: vibe coding is pair programming with a partner who writes fast but needs direction. It's genuinely useful, and the result is genuinely my code — I understand and own every decision in it.

---

## What I'd Do Differently

**Start with multi-worksheet support.** I shipped v1 with a single sheet URL and had to write a migration to namespace task IDs when I added multi-worksheet support. The migration worked, but it's complexity I would have avoided with better upfront modeling.

**Separate the AI endpoint earlier.** Right now the endpoint is a URL I configure at build time via `Info.plist`. That's fine for my personal use, but a proper release would want this to be user-configurable or handled differently.

**Test the parser against more real-world sheets sooner.** The column/row detection heuristics evolved through iteration, and I found several edge cases only by importing actual sheets. More diverse test fixtures from the start would have sharpened the logic faster.

---

The app does exactly what I wanted it to do. Every morning I open it (or glance at my home screen widget), I know what I planned, and by the end of the day I've either burned the list or I haven't. That feedback loop — planned vs. done, no abstraction in between — is what I kept failing to find in existing tools.

Building it myself meant I could make it exactly right, even down to the font being monospaced and the completion marker being a flame.

Sometimes the best tool is the one you wrote for yourself at 11pm because no one else got it right.
