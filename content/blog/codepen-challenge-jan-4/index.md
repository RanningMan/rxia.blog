---
title: "CodePen Weekly Challenge - Jan Week 4"
date: "2023-01-29"
description: "My Solution to this week's CodePen challenge"
tag: ["HTML", "CSS", "web development", "CodePen Challenge"]
isDraft: false
---
  

*Challenge Link: https://codepen.io/challenges/2023/january/4*

This month's challenge encourages us to learn and catch up with the newest CSS properties! CodePen team has chosen new color methods as the forth one!

In CSS Color Module Level4, the W3C introduces new options to display color in the browser. Here is a quick rundown of what's new in the spec, as well as the current browser support for each new method.

| color | description | syntax | browser support |
| ------------ | ------------ | ------------ | ------------ |
| hwb | The hwb() functional notation expresses a given color according to its hue, whiteness, and blackness. An optional alpha component represents the color's transparency. | `hwb(12 50% 0%);` | all browsers |
| lab | The lab() functional notation expresses a given color in the CIE L*a*b* color space. Lab represents the entire range of color that humans can see. | `lab(52.2345% 40.1645 59.9971 / .5);` | Safari 15+, Chrome & Firefox behind feature flags |
| lch | The lch() functional notation expresses a given color in the LCH color space. It has the same L axis as lab(), but uses polar coordinates C (Chroma) and H (Hue). | `lch(52.2345% 72.2 56.2 / .5);` | Safari 15+, Chrome & Firefox behind feature flags |
| oklab | The oklab() functional notation expresses a given color in the Oklab color space, which attempts to mimic how color is perceived by the human eye. The oklab() works with a Cartesian coordinate system on the OKlab color space, the a- and b-axes. If you want a polar color system, chroma and hue, use oklch(). | `oklab(59.69% 0.1007 0.1191 / 0.5);` | Safari 15.4+ |
| oklch | The oklch() functional notation expresses a given color in the OKLCH color space. It has the same L axis as oklab(), but uses polar coordinates C (Chroma) and H (Hue). | `oklch(59.69% 0.156 49.77 / .5)` | Safari 15.4+ |
| color-mix | The color-mix() functional notation takes two color values and returns the result of mixing them in a given colorspace by a given amount. | `color-mix(in lch, peru 40%, lightgoldenrod);` | Safari & Firefox behind feature flags |
| color-contrast | The color-contrast() functional notation takes a color value and compares it to a list of other color values, selecting the one with the highest contrast from the list. | `color-contrast(wheat vs tan, sienna, #d2691e);` | Safari & Firefox behind feature flags |
| relative color | The new relative color syntax allows existing colors to be modified using the color functions: if an origin color is specified, then each color channel can either be directly specified, or taken from the origin color (and possibly modified with math functions). | `rgb(from var(--bg-color) r g b / 80%);` | Safari & Firefox behind feature flags |


## Solutions:  
1. A transformer between rgb color and hwb color: 
<iframe height="300" style="width: 100%;" scrolling="no" title="Convert To HWB" src="https://codepen.io/ranningman/embed/oNMMPbr?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ranningman/pen/oNMMPbr">
  Convert To HWB</a> by Ran Xia (<a href="https://codepen.io/ranningman">@ranningman</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

