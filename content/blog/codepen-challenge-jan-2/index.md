---
title: "CodePen Weekly Challenge - Jan Week 2"
date: "2023-01-11"
description: "My Solution to this week's CodePen challenge"
tag: ["HTML", "CSS", "web development", "CodePen Challenge"]
isDraft: false
---
  

*Challenge Link: https://codepen.io/challenges/2023/january/2*

This month's challenge encourages us to learn and catch up with the newest CSS properties! CodePen team has chosen container query as the second one!

Container queries allow us to look at a container size and apply styles to the contents based on the size of their container rather than the viewport or other device characteristics.

## Syntax:
To use container query, we first need to set container properties to a containment element.
```
.container {
  container-type: inline-size | inline | none;
  container-name: containerName; // can be any name
}
```
or using shorthand syntax
```
.container {
  container: containerName / inline-size;
}
```

Then we can use @container at-rule, which is very similar to media query, to set styles for different container sizes.

```
@container <container-condition> {
  <stylesheet>
}
```

## Popular use cases:  
Container queries are useful for creating responsive designs that adapt to the layout of the page, rather than just the screen size. Here are a few examples of use cases for container queries:
- Grid layout: Container queries can be used to change the number of columns in a grid layout based on the size of the container, so that the grid looks good on both large and small screens.
- Stacked layout: When the container becomes too small to display its content in a horizontal layout, container queries can be used to switch to a stacked layout, to improve readability.
- Navigation Bar: When the screen size get smaller, container queries can be used to change the navigation bar from a horizontal layout to a vertical layout, to improve usability on mobile devices.
- Text Flow: When the container becomes too small to fit the text, container queries can be used to change the text flow, to improve readability.

Shadeed has a great page to demo use cases of container queries: https://lab.ishadeed.com/container-queries/

Overall, Container Queries enable us to create flexible design system, where the layout of the components can change dynamically based on the context of the surrounding elements.


## Solutions:  
1. A grid layout using container query: 
<iframe height="300" style="width: 100%;" scrolling="no" title="cat image gallery: container query + grid layout" src="https://codepen.io/ranningman/embed/abjWqJB?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ranningman/pen/abjWqJB">
  cat image gallery: container query + grid layout</a> by Ran Xia (<a href="https://codepen.io/ranningman">@ranningman</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

2. A navigation bar:
<iframe height="300" style="width: 100%;" scrolling="no" title="Responsive Navigation: Container Query" src="https://codepen.io/ranningman/embed/poZPLwP?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ranningman/pen/poZPLwP">
  Responsive Navigation: Container Query</a> by Ran Xia (<a href="https://codepen.io/ranningman">@ranningman</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
