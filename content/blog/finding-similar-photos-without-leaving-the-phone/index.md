---
title: "Finding Similar Photos Without Leaving the Phone"
date: "2026-10-23"
description: "How VinciPhoto groups near-duplicate photos and picks the best one entirely on device, and the year of back and forth it took to get there."
tag: ["Indie Hacker", "iOS", "Swift", "AI", "side project", "Vibe Coding"]
isDraft: false
---

_How VinciPhoto groups near-duplicate photos and picks the best one entirely on device, and the year of back and forth it took to get there_

Everyone's camera roll has the same problem. You take fourteen photos of a toddler who won't look at the camera, eight of a sunset because the first seven seemed slightly off, and a burst of a dog mid-jump. A year later your phone is full and most of it is variations on a theme.

VinciPhoto's Similar Photos feature finds those groups and suggests which photo to keep. It does this without sending your photos anywhere. The first half of this post explains how it works today. The second half is the honest version of how it got there, including the parts I got wrong.

---

## Part 1: How it works today

### Fingerprinting each photo on device

VinciPhoto ships Apple's MobileCLIP image encoder as a compiled Core ML model inside the app. Nothing is downloaded at runtime, so analysis doesn't need a network connection.

Each photo is decoded with its EXIF orientation applied, scaled down through ImageIO's thumbnail path so the full-resolution original is never inflated, then aspect-filled and center-cropped to the model's input size. The model turns it into a vector, normalized so that a dot product equals cosine similarity.

Vectors are stored on device, keyed by photo ID and modification time. On a rescan, a photo whose vector is already stored isn't even read from the library, and an edited photo gets re-embedded. The same vector powers VinciPhoto's natural-language search ("receipts", "beach at sunset"), so each photo goes through the model once, whichever feature reaches it first.

### Comparing within a day

Near-duplicates are almost always taken close together in time. So photos are grouped by calendar day and only compared within a day. That keeps the pairwise work small, and it prevents a class of false positives: two visits to the same viewpoint a year apart can look nearly identical to a model, but they aren't the duplicate you want to delete.

### A sparse graph and connected components

Within a day, each photo is linked to its closest matches, but only when the match is strong enough to mean "nearly the same shot" rather than "same scene". Each photo keeps a limited number of links, which stops chaining from sprawling across a busy day. Every connected set of photos becomes a group, and groups are ordered by how tightly their members match.

Connected components are transitive. If A looks like B and B looks like C, all three end up together even if A and C are a little further apart. That's what you want for a burst where the subject moves gradually across frames.

### Picking the best shot

Only photos that landed in a group get scored, which saves a lot of decoding. For each one, the app renders a small grayscale copy and measures:

- **Sharpness**, from the variance of the Laplacian. Blurry images have weak edges.
- **Exposure**, from how much of the frame is crushed to black or blown out to white.
- **Face quality**, from Apple Vision's face-capture-quality request, which accounts for things like closed eyes and motion blur on a face.

The raw numbers aren't comparable across scenes (foliage is always "sharper" than fog), so each signal is normalized within its group before the signals are combined. If nobody in the group has a face, the face signal drops out. The app then tells you why it picked the winner (sharpest, best face, or best exposure) based on which signal set it apart.

### Running politely

The scan watches the device's thermal state and rests in proportion to how long its last batch took, so it adapts to fast and slow phones alike. Low Power Mode slows a scan but never stops it. New photos are picked up incrementally on launch and refresh.

---

## Part 2: How it got here

### v0: burst timing and perceptual hashes

The first working version, in August 2025, was entirely JavaScript. It sorted photos by time, treated anything shot within a couple of seconds as a burst, and compared tiny average hashes: shrink the image to a few pixels, mark each pixel above or below the mean, and compare the bit patterns.

It was fast and easy to understand, but it only caught true bursts. Take a step to the left, or wait for someone to stop blinking, and the hash changed enough to miss it.

### v1: a CNN, and a time kernel I later threw away

The next step was real image features. I added a MobileNetV3 model and ran it through TensorFlow in the React Native layer. Similarity was a blend of the visual score and a Gaussian time kernel, so photos taken close together got a boost.

Two things went wrong. Grayscale and alpha-channel images broke the model input until the pipeline learned to tile or drop channels. And the blended score was hard to reason about: I couldn't easily say why two photos were or weren't grouped. In November 2025 I replaced the time kernel with a blunt rule that's still in place today. Photos are only compared with photos from the same day.

### v2: moving to native, and a default that bit later

Running a CNN through the JavaScript bridge was slow, so at the end of November 2025 clustering moved into a native Swift module. The old hash engine came along too, behind a mode switch, in case I wanted it back.

I never did, and the switch became a trap. Its default was the hash engine. Any caller that forgot to set the mode silently ran the wrong algorithm: same function signature, no error, just different groups. I didn't catch that until mid-2026, when I deleted the hash engine and the switch entirely.

### Two models for every photo

In April 2026 I added text-to-photo search using MobileCLIP, since a classifier backbone like MobileNet can't match photos to words. Now every scan fetched, decoded, and ran a model over each photo twice: once for grouping, once for search. It worked, so I left it.

### July 2026: search was quietly broken

Searching "snow" didn't surface photos of snow. I built a harness that ran the exact shipped encoders on a Mac and found three preprocessing bugs:

- I had applied the standard CLIP mean/std normalization, but Apple's MobileCLIP was trained on raw [0, 1] pixels. The model was seeing out-of-distribution input on every photo.
- EXIF orientation was ignored, so portrait photos were embedded sideways.
- Images were stretched to a square instead of resized and center-cropped.

None of these crashed anything. Results were just worse than they should have been.

Fixing the normalization had a bonus. The models had been exported in fp32 to avoid NaN embeddings, and the NaNs turned out to be a symptom of those out-of-range inputs. With the inputs fixed, I re-exported in fp16, roughly halving the model size and making them eligible for the Neural Engine.

### The cache that never existed

While designing background scans, I noticed the "embeddings cached" counter was always zero. It wasn't a cache miss. The zero was hard-coded, and there was no cache at all. Every scan re-embedded the entire library from scratch.

I added a disk cache, and on device it seemed to work. Then real usage showed the counter stuck at zero again. The cache validated itself by checking that the file size exactly matched the manifest. When a scan was killed after writing vectors but before saving the manifest, the file was longer than expected, which the check treated as corruption, so it discarded everything. On a phone, scans get killed all the time. Rescans of a few thousand photos were taking well over ten minutes until the cache learned to keep what the manifest still described.

### "Best photo" meant "biggest file"

The original selection ranked photos by file size, then resolution, then recency. Inside a burst those are nearly identical, so the ranking came down to tiny file-size differences that have nothing to do with quality. Meanwhile, the native clustering computed the most central photo of each group and then threw it away.

I replaced this with the sharpness, exposure, and face-quality signals described above. Raw signals come from native code, while the weighting lives in JavaScript so it can be tuned without a rebuild or a rescan.

Then Vision started failing on every photo under memory pressure. Because "Vision threw an error" and "Vision found no faces" both produced no face score, every layer above treated them the same. The app quietly ranked everyone's family photos as if nobody was in them. Now the two outcomes are distinct, and failures are counted and logged once per pass, so an outage shows up as a number instead of looking like a library without people.

### Scans that froze forever

A scan could stop at a fixed percentage and never move again. iOS kills the photo library daemon under memory pressure, and when that happens a pending image request never calls its completion handler. My waits had no timeout, so the analysis queue stayed blocked for the life of the process.

The fix touched several layers. Photo library waits now have timeouts and cancel on expiry. Decodes go through bounded thumbnails, so a large HEIC no longer inflates to a huge bitmap just to be shrunk. Temporary memory is released after each photo instead of after each batch. A stall watchdog fails a batch on silence rather than slowness. And a failed batch is no longer marked as done.

### Unifying on CLIP, without guessing

By August 2026 the two-model setup was the obvious waste. Text search needs CLIP's joint image-text space, so the only sensible direction was to cluster on CLIP vectors too. The blocker was the threshold. Cosine similarity is only comparable within one embedding space, and CLIP's space is shaped very differently from MobileNet's. The old threshold would have fused most of a day into one group.

So I didn't guess. First, a dev-only measurement lab split per-photo cost into fetch, decode, and inference, and showed that decoding dominated. That ruled out the fallback of merging the two passes while keeping both models. Second, a diff tool replayed the real clustering code over both stored vector sets with zero new inference, and classified each existing group as identical, grown, shrunk, split, merged, or lost under each candidate threshold. I picked the threshold that best reproduced the existing grouping, then opened every merge in the app and judged it by eye. The fear that CLIP would chain whole days together didn't materialize: its biggest group came out slightly smaller than before, not larger.

That review mattered because it was the last cheap chance to be wrong. Deleting MobileNet would also delete the baseline the diff compared against. After it shipped, each photo cost one fetch, one decode, and one inference instead of two of each, with a third of the storage.

### "The phone is very hot during the scan"

That was the issue title, and it was fair. The fix came in parts. The scan now reads the thermal state and duty-cycles when the phone runs hot, pausing outright when it's critical. The quality pass stopped fetching and decoding the full-resolution original a second time and asks the photo library for the small render it actually needs.

---

## What I'd tell myself a year ago

- **Preprocessing bugs don't crash.** Wrong normalization, ignored orientation, and stretched images all ran fine and produced plausible results. Only a harness running the real model caught them.
- **A missing value with two meanings hides outages.** "No faces" and "face detection failed" have to be different states, or the failure is invisible.
- **Defaults and dead code aren't free.** An unused engine behind a switch defaulted to the wrong algorithm for months.
- **Measure before you delete the baseline.** Changing embedding models meant re-deriving the threshold, and the only way to know it was right was to diff against the model being replaced.
- **On a phone, interruption is normal.** Caches, waits, and progress tracking all have to assume the process can die at any moment.

If you have a camera roll full of almost-the-same photos, give it a try: [VinciPhoto on the App Store](https://apps.apple.com/us/app/vinciphoto-ai-photo-cleanup/id6755752160)
