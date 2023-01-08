---
title: CSS selectors cheatsheet
date: "2022-02-26"
description: "Review of CSS selectors"
tag: ["CSS", "web development"]
isDraft: false
---
  
In this blog, I put common css selectors inside below table so that they can be easily referenced.

## Popular css selectors

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
   <td>Selector Name
   </td>
   <td>Syntax
   </td>
   <td>Example
   </td>
   <td>When to Use
   </td>
   <td>Notes
   </td>
  </tr>
  <tr>
   <td rowspan="5" >Regular selectors
   </td>
   <td>ID selector
   </td>
   <td>#happy-cake{}
   </td>
   <td>
   </td>
   <td>Most powerful selector
   </td>
   <td>Too powerful, avoid use
   </td>
  </tr>
  <tr>
   <td>Class selector
   </td>
   <td>.happy-cake{}
   </td>
   <td>ul.important selects all ul elements that have class="important"
   </td>
   <td>Most useful and versatile selector.
<p>
Special case: Combine Class selector.You can combine the class selector with other selectors, like the type selector.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Tag selector
   </td>
   <td>h2{}
   </td>
   <td>
   </td>
   <td>1.when changing properties that are unique to that HTML element
<p>
2. Reset styles for a page (<a href="https://perishablepress.com/a-killer-collection-of-global-css-reset-styles/">popular css resets</a>)
   </td>
   <td>Don’t rely on it too much. Use class selector
   </td>
  </tr>
  <tr>
   <td>Attribute selector
   </td>
   <td>[food=”happy-cake”]{}
<p>
[food]
<p>
div[food]
<p>
div[food=”happy-cake”]
<p>
A[attr^=val] : attribute begins with val
<p>
A[attr|=val] : attribute whose value exactly matches val OR begins with val, immediately followed by a dash (hyphen)
<p>
A[attr$=val] : attribute ends with val
<p>
A[attr*=val] : an attribute that contains val anywhere within the value string
<p>
A[attr~=val] : attribute where the value string is val OR contains val in a space-separated list
   </td>
   <td>&lt;div food=”happy-cake”>&lt;/div>
   </td>
   <td>Maybe more powerful than class
   </td>
   <td>Not supported in IE6 and before
   </td>
  </tr>
  <tr>
   <td>Universal selector
   </td>
   <td>*
   </td>
   <td>p *
   </td>
   <td>You can select all elements with the universal selector.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td rowspan="33" >Pseudo selectors
   </td>
   <td colspan="5" >Link related pseudo selectors
   </td>
  </tr>
  <tr>
   <td>Link selector
   </td>
   <td>:link{}
   </td>
   <td>
   </td>
   <td>It is equivalent to a[href]
   </td>
   <td rowspan="4" >It is best practice to cover all of the “states”, particularly for links. An easy way to do that is “LOVE HATE” or
<ul>

  <li>L :link

  <li>O

  <li>V :visited

  <li>E

  <li>H :hover

  <li>A :active

  <li>T

  <li>E

  <p>
  Doing them in that order is ideal.
  </li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Link-visited selector
   </td>
   <td>:visited{}
   </td>
   <td>
   </td>
   <td>Selects links that have already been visited by the current browser
   </td>
  </tr>
  <tr>
   <td>Link-hover selector
   </td>
   <td>:hover{}
   </td>
   <td>
   </td>
   <td>When the mouse cursor rolls over an element, that element is in its hover state and this will select it.
<p>
Apply to any elements
   </td>
  </tr>
  <tr>
   <td>Link-active selector
   </td>
   <td>:active{}
   </td>
   <td>
   </td>
   <td>Selects the element while it is being activated (being clicked on or otherwise activated).
<p>
Apply to any elements
   </td>
  </tr>
  <tr>
   <td>Target selector
   </td>
   <td>#happy-cake:target{}
   </td>
   <td>
   </td>
   <td>The target pseudo class is used in conjunction with IDs, and match when the hash tag in the current URL matches that ID. So if you are at URL www.yoursite.com/#home then the selector #home:target will match.
   </td>
   <td>Used in tab style implementation
   </td>
  </tr>
  <tr>
   <td colspan="5" >Input related pseudo selectors
   </td>
  </tr>
  <tr>
   <td>Input-focus selector
   </td>
   <td>:focus{}
   </td>
   <td>
   </td>
   <td>:focus will select elements that are the current focus of the keyboard, inputs and textareas
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Input-enabled selector
   </td>
   <td>:enabled{}
   </td>
   <td>
   </td>
   <td>Selects inputs that are in the default state of enabled and ready to be used.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Input-disabled selector
   </td>
   <td>:disabled{}
   </td>
   <td>
   </td>
   <td>Selects inputs that have the disabled attribute.
   </td>
   <td>A lot of browsers will make the input a faded out gray, you can control that with this selector.
   </td>
  </tr>
  <tr>
   <td>Input-checked selector
   </td>
   <td>:checked{}
   </td>
   <td>
   </td>
   <td>Selects checkboxes that are checked
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Input-indeterminate selector
   </td>
   <td>:indeterminate{}
   </td>
   <td>
   </td>
   <td>Selects radio buttons that are in the purgatory state of neither chosen or unchosen 
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Input-required selector
   </td>
   <td>:required{}
   </td>
   <td>
   </td>
   <td>Selects inputs with the required attribute
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Input-optional selector
   </td>
   <td>:optional{}
   </td>
   <td>
   </td>
   <td>Selects inputs that do not have the required attribute
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Placeholder selector
   </td>
   <td>:placeholder-shown{}
   </td>
   <td>
   </td>
   <td>Selects elements that haven’t been interacted with yet and still display the default placeholder text.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>read-only/read-write selector
   </td>
   <td>.test:read-only {
<p>
background: tomato;
<p>
}
<p>
.test:read-write {
<p>
background:lightgreen;
<p>
}
   </td>
   <td>&lt;input class="test" type="text" value="Regular input" />
<p>
&lt;input class="test" type="text" value="Disabled input" disabled />
<p>
&lt;input class="test" type="text" value="Readonly input" readonly />
<p>
&lt;p class="test" contenteditable>Contenteditable paragraph&lt;/p>
<p>
&lt;p class="test">Regular paragraph&lt;/p>
   </td>
   <td>Selects elements based on a combination of readonly and disabled attributes
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td colspan="5" >Position related pseudo selectors
   </td>
  </tr>
  <tr>
   <td>Root selector
   </td>
   <td>:root{}
   </td>
   <td>
   </td>
   <td>In the overwhelming majority of cases you’re likely to encounter, :root refers to the &lt;html> element in a webpage
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:first-child
   </td>
   <td>:first-child{}
   </td>
   <td>
   </td>
   <td>Selects the first element within a parent
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:last-child
   </td>
   <td>:last-child{}
   </td>
   <td>
   </td>
   <td>Selects the last element within a parent
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:nth-child
   </td>
   <td>:nth-child(params){} 
<p>
where params can be either a keyword, or an expression. The keyword can be either even or odd, the expression can be a number or a numeric formula
   </td>
   <td>&lt;style>
<p>
li:nth-child {2}
<p>
&lt;/style>
<p>
&lt;ul>
<p>
  &lt;li>nope&lt;/li>
<p>
  &lt;!-- WILL match -->
<p>
  &lt;li>yep, I'm #2&lt;/li>
<p>
  &lt;li>nope&lt;/li>
<p>
&lt;/ul>
   </td>
   <td>
   </td>
   <td>Not supported in IE8 and before
<p>
Weird enough, the index starts from 1
   </td>
  </tr>
  <tr>
   <td>:nth-last-child
   </td>
   <td>:nth-last-child(params)
   </td>
   <td>
   </td>
   <td>Works like :nth-child, but it counts up from the bottom instead of the top
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:only-child
   </td>
   <td>:only-child{}
   </td>
   <td>
   </td>
   <td>Select an element that are the only element inside of another one
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:first-of-type
   </td>
   <td>:first-of-type{}
   </td>
   <td>
   </td>
   <td>Selects the first element of this type within any parent.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:last-of-type
   </td>
   <td>:last-of-type{}
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:nth-of-type
   </td>
   <td>:nth-of-type(<strong><em>params</em></strong>){}
   </td>
   <td>&lt;style>
<p>
li:nth-of-type {2}
<p>
&lt;/style>
<p>
&lt;ul>
<p>
  &lt;li>nope&lt;/li>
<p>
  &lt;div>nope&lt;/div>
<p>
  &lt;!-- WILL match -->
<p>
  &lt;li>yep, I'm #2&lt;/li>
<p>
  &lt;li>nope&lt;/li>
<p>
&lt;/ul>
   </td>
   <td>Particularly useful when working with definition lists and their alternating &lt;dt> and &lt;dd> elements
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:nth-last-of-type
   </td>
   <td>:nth-last-of-type(<strong><em>params</em></strong>){}
   </td>
   <td>
   </td>
   <td>Works like :nth-of-type, but it counts up from the bottom instead of the top
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>:only-of-type
   </td>
   <td>:only-of-type
   </td>
   <td>
   </td>
   <td>Selects only if the element is the only one of its kind within the current parent
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td colspan="5" >Relational pseudo selectors
   </td>
  </tr>
  <tr>
   <td>Not selector
   </td>
   <td>:not{}
   </td>
   <td>all divs except those with a class of “music” = div:not(.music)
   </td>
   <td>Removes elements from an existing matched set that match the selector inside the parameter of :not().
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Empty selector
   </td>
   <td>:empty{}
   </td>
   <td>&lt;style>
<p>
section:empty {
<p>
  background-color: tomato;
<p>
}
<p>
&lt;/style>
<p>
&lt;section>
<p>
  &lt;p>I have content&lt;/p>
<p>
&lt;/section>
<p>
&lt;section>
<p>
  &lt;p>I have content, too!&lt;/p>
<p>
&lt;/section>
<p>
&lt;section> // HIGHLIGHT
<p>
  &lt;!-- No content, just an HTML comment. 🎺 -->
<p>
&lt;/section>
   </td>
   <td>selects any element that does not contain children for a given selector.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td colspan="5" >other
   </td>
  </tr>
  <tr>
   <td>Parent selector
   </td>
   <td>:has(){}
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>Only supported by safari 15.4+
   </td>
  </tr>
  <tr>
   <td rowspan="4" >Child and sibling selectors
   </td>
   <td>Descendant selector
   </td>
   <td>parent child
   </td>
   <td>ul li{}
   </td>
   <td>The descendant selector will select any list items that are anywhere underneath an unordered list in the markup structure.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Child combinator selector
   </td>
   <td>>
   </td>
   <td>ul > li{}
   </td>
   <td>The second child combinator selector will only select list items that are direct children of an unordered list.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Adjacent sibling combinator
   </td>
   <td>+
   </td>
   <td>p + p
   </td>
   <td>select an element that is directly after another specific element.
   </td>
   <td></td>
  </tr>
  <tr>
   <td>General sibling combinator
   </td>
   <td>~
   </td>
   <td>p ~ p
   </td>
   <td>select an element that appears anywhere after another specific element.
   </td>
   <td></td>
  </tr>
</table>


## CSS pseudo elements


<table>
  <tr>
   <td>Pseudo elements name
   </td>
   <td>Syntax
   </td>
   <td>Example
   </td>
   <td>When to use
   </td>
   <td>Notes
   </td>
  </tr>
  <tr>
   <td>Before pseudo element
   </td>
   <td>::before{}
   </td>
   <td rowspan="2" >
<ol>

<li>Draw shapes: <a href="https://css-tricks.com/the-shapes-of-css/">https://css-tricks.com/the-shapes-of-css/</a>

<li>Styled Tooltips

<li>ClearFix
More examples here: <a href="https://css-tricks.com/pseudo-element-roundup/#top-of-site">https://css-tricks.com/pseudo-element-roundup/#top-of-site</a>
</li>
</ol>
   </td>
   <td rowspan="2" >
   </td>
   <td> The pseudo-elements generated by ::before and ::after are <a href="https://www.w3.org/TR/CSS2/generate.html#before-after-content">contained by the element's formatting box</a>, and thus don't apply to <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element">replaced elements</a> such as <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img">&lt;img></a>, or to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br">&lt;br></a> elements
   </td>
  </tr>
  <tr>
   <td>After pseudo element
   </td>
   <td>::after{}
   </td>
   <td> The pseudo-elements generated by ::before and ::after are <a href="https://www.w3.org/TR/CSS2/generate.html#before-after-content">contained by the element's formatting box</a>, and thus don't apply to <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element">replaced elements</a> such as <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img">&lt;img></a>, or to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br">&lt;br></a> elements
   </td>
  </tr>
  <tr>
   <td>First letter pseudo element
   </td>
   <td>::first-letter{}
   </td>
   <td>&lt;style>
<p>
p::first-letter {
<p>
  font-weight: bold;
<p>
  color: red;
<p>
}
<p>
&lt;/style>
<p>
&lt;p>The first letter is bold and red&lt;/p>
   </td>
   <td>Selects the first letter of the text in the element. Typical use: drop caps.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>First line pseudo element
   </td>
   <td>::first-line{}
   </td>
   <td>
   </td>
   <td>Selects the first line of text in the element. Typical use: setting the first sentence in small caps as a typographical eye-catcher/lead-in.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Selection pseudo element
   </td>
   <td>::selection{}
   </td>
   <td>
   </td>
   <td>Using your cursor select this sentence. Notice how as you select the text a background color fills the space? You can change the background color and color of selected text by styling ::selection.
   </td>
   <td>the double colon is necessary in the syntax for this pseudo element
   </td>
  </tr>
</table>


All Pseudo-classes can be found here: [https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) 