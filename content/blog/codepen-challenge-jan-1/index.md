---
title: "CodePen Weekly Challenge - Jan Week 1"
date: "2023-01-08"
description: "My Solution to this week's CodePen challenge"
tag: ["HTML", "CSS", "web development", "CodePen Challenge"]
isDraft: false
---
  

*Challenge Link: https://codepen.io/challenges/2023/january/1*

This month's challenge encourages us to learn and catch up with the newest CSS properties! CodePen team has chosen :has() as the first one!

:has() is one of the most popular topic among frontend developers and CSS passioners in this past few months. It enables relationship selection among DOM nodes using pure CSS. :has() selects a target element that contains or remains a certain relationship between selector element.

## Syntax:
`__target__:has(__selector__)`

## Popular use cases:  
There are a lot of use cases for :has() that help us write clean and morden css code. The most common two are:
- Selecting an element based on its succeeding (child) elements. For instance, targeting a `<section>` element that contains a `<p>` element.
- Selecting an element’s previous siblings, such as a form label that precedes a valid or invalid input.

## Solutions:  
Use Case 1 - Pricing Cards:
<iframe height="600" style="width: 100%;" scrolling="no" title="Pricing Card" src="https://codepen.io/ranningman/embed/qBVgmwM?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ranningman/pen/qBVgmwM">
  Pricing Card</a> by Ran Xia (<a href="https://codepen.io/ranningman">@ranningman</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<br/><br/>
<br/><br/>
  
  
Use Case 2 - Style label for valid/invalid input:
<iframe height="300" style="width: 100%;" scrolling="no" title="Use :has() to Style Valid/Invalid Input Labels" src="https://codepen.io/ranningman/embed/PoBbgPe?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ranningman/pen/PoBbgPe">
  Use :has() to Style Valid/Invalid Input Labels</a> by Ran Xia (<a href="https://codepen.io/ranningman">@ranningman</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>