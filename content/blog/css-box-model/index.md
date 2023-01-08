---
title: CSS box model
date: "2022-01-26"
description: "Review of CSS box model"
tag: ["CSS", "web development"]
isDraft: false
---
  
The box model is one of the most fundamental concepts in CSS area. I summarized some key ideas in below table for easy reference.

## Box model: Block box vs inline box

<style>
table, tr, td {
    border-style: solid;
}
ul {
  list-style: none;
}
</style>

<table>
  <tr>
   <td>
   </td>
   <td>width/height
   </td>
   <td>margin-left/margin-right
   </td>
   <td>margin-top/margin-bottom
   </td>
   <td>padding-left/padding-right
   </td>
   <td>padding-top/padding-bottom
   </td>
  </tr>
  <tr>
   <td>block
   </td>
   <td>Y
   </td>
   <td>Y
   </td>
   <td>Y
   </td>
   <td>Y
   </td>
   <td>Y
   </td>
  </tr>
  <tr>
   <td>inline-block
   </td>
   <td>Y
   </td>
   <td>Y
   </td>
   <td>Y
   </td>
   <td>Y
   </td>
   <td>Y
   </td>
  </tr>
  <tr>
   <td>inline
   </td>
   <td>X
   </td>
   <td>Y
   </td>
   <td>X
   </td>
   <td>Y
   </td>
   <td>Y, but may blend into the line above or below the element
   </td>
  </tr>
</table>

** `block`: The CSS box model as a whole applies to block boxes.

** `inline-block`: It is useful for situations where you do not want an item to break onto a new line, but do want it to respect width and height and avoid the overlapping. Where this can be useful is when you want to give a link a larger hit area by adding padding. `<a>` is an inline element like `<span>`; you can use `display: inline-block` to allow padding to be set on it, making it easier for a user to click the link. You see this fairly frequently in navigation bars.


## Margin & Padding Colors
The margin and padding properties are completely transparent and do not accept any color values. Being transparent, though, they show the background colors of relative elements. For margins, we see the background color of the parent element, and for padding, we see the background color of the element the padding is applied to.

## Border
Shorthand: Border-width, border-style, border-color, border-radius

longhand : border-top, border-right, border-bottom, border-left, border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius

## Box-sizing
content-box (default), padding-box (deprecated), border-box (recommended)

## Margin Collapse
The basic idea is that if two margins are adjoining, they will collapse into one margin, which will have the greater of the two margin values (it will be the more negative of the margins if both margins are negative). [https://www.jonathan-harrell.com/blog/what%E2%80%99s-the-deal-with-margin-collapse/](https://www.jonathan-harrell.com/blog/what%E2%80%99s-the-deal-with-margin-collapse/)