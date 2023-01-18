---
title: "Learning Patterns: Book Notes (Part 1)"
date: "2023-01-18"
description: "An opinioned book notes on Learning Patterns by Lydia Hallie and Addy Osmani. This blog covers the first part of the book --  Design Patterns."
tag: ["book notes", "design patterns", "architecture", "web development"]
isDraft: false
---

From earlier this year, I started to read the online book [*Learning Patterns* by Lydia Hallie and Addy Osmani](https://www.patterns.dev/). It's a good book for mid-level developers, which has a comprehensive coverage on design and development patterns with perspectives from Object Oriented Design, to rendering mechanisms, to perfermance best practices, with a focus on Javascript & React.js. 

This blog summarizes the first part of the book -- design patterns. This part, from a web development's perspective, provides a good overview of several design patterns on what, why, when, and how. The book covers one pattern in one chapter, therefore I organize my key takeways of this part of the book on a pattern-by-pattern (chapter-by-chapter) basis. But I reoder and group the patterns into three categories, based on the importance/usefulness of each pattern in modern web development/javascript development.

## Must-Knows
*Patterns in this category are super important and every web developer should know when to use them and how to implement them.*
- **Hooks**: Hooks is the most important feature/pattern in modern web development. With the introducation of Hooks, use of more complicated patterns, such as HOC, Render Props pattern, container/presentationer pattern, can be avoided in a lot of cases.
- **Provider Pattern**: Provider pattern is another widely used pattern in modern web applications. We often use context to implement this pattern. A best practice of provider pattern implementation is to create a provider HOC to serve data and to create a hook to access useContext when consuming the data.
    - It avoids prop drilling, makes easier for future maintenance and refactoring, made easy to keep some global state. 
    - But there are performance pitfalls if not used correctly as any consumer components can be rerendered when context data changes.
- **Prototype Pattern**: An object can be a prototype of another object, or/and has a __prototype__ property that points to another object which is its prototype.
    - One can easily use/implement prototype leveraging ES6 class. When using ES6 classes, all properties that are defined on the class itself are automatically added to the prototype (the object that __prototype__ property points to). We can see the `prototype` directly through accessing the `prototype` property on a constructor, or through the `__proto__` property on any instance. They both points to the same object.
    - The `Object.create` method lets us create a new object, to which we can explicitly pass the value of its prototype. The passed in object is the prototype of the created object.
- **Observer Patterns**: With the **observer pattern**, we can *subscribe* certain objects, the **observers**, to another object, called the **observable**. Whenever an event occurs, the observable notifies all its observers! An observable object usually contains 4 important parts:
    - `observers`: an array of observers that will get notified whenever a specific event occurs
    - `subscribe()`: a method in order to add observers to the observers list
    - `unsubscribe()`: a method in order to remove observers from the observers list
    - `notify()`: a method to notify all observers whenever a specific event occurs.

    An important implementation of observer pattern is RxJs.
    
    Using the observer pattern is a great way to enforce separation of concerns and the single-responsiblity principle. However, there may be some performance issue when the observers become complex.
- **Module Pattern**: Modules are everyone in today's web development. Here is a summary on how to import/export modules in ES6.
    - To export (from FooBoo.js):        
        `export function foo;`         
        `export default function boo (in Boo.js)`        
    - To import:       
        `import {foo} from FooBoo.js;`         
        `import {foo as f} from FooBoo.js;`         
        `import boo from FooBoo.js;`        
        `import boo, {foo} from FooBoo.js;`        
        `import b from FooBoo.js;`         
        `import * as fb from FooBoo.js;`        
        dynamic import:        
        `import("./FooBoo.js").then(module ⇒ {module.foo(); module.boo();}`        
        `const module = await import("./FooBoo.js");`        
        dynamic import also accepts a template literal:        
        `const res = await import(`../assets/dog${num}.png`);` 
- **Compound Component Pattern**: In large applications, we often have components that belong to each other. They're dependent on each other through the shared state, and share logic together. You often see this with components like select, dropdown components, or menu items. The **compound component pattern** allows you to create components that all work together to perform a task, which is a common use case when you're building a component library.
    - There are 2 ways to implement this pattern:
        - Using Reaxt.context
        - Using React.Children.map.
    - Prefer using context when implementing because there are limitations when using React.Children — it only supports direct children components, and it can cause name collisions. 
## Sometimes-Useful
*Following patterns are still very important in React applications and you will see them a lot, but I categorize them in this sometimes-useful group because with the introduction of hooks, a lot of their use cases should be replaced by simply using hooks.*
- **Container/Presentational Pattern:** It made easy to separation of concerns.
    - A presentational component receives its data through `props`. Its primary function is to simply **display the data it receives** the way we want them to, including styles, *without modifying* that data. Presentational components receive their data from **container components.**
    - The primary function of container components is to **pass data** to presentational components, which they *contain*.
    - In many cases, the Container/Presentational pattern can be replaced with React Hooks. The introduction of Hooks made it easy for developers to add statefulness without needing a container component to provide that state.
- **HOC Pattern**: with the introduction of hooks, although in general hooks shouldn’t replace HOC, a lot of code that relies on HOC can be optimized by using hook in terms of code quality and logic cleanness.
    - *Best use-cases for a HOC:*
        - The *same, uncustomized* behavior needs to be used by many components throughout the application.
        - The component can work standalone, without the added custom logic.
    - *Best use-cases for Hooks*:
        - The behavior has to be customized for each component that uses it.
        - The behavior is not spread throughout the application, only one or a few components use the behavior.
        - The behavior adds many properties to the component.
    - Other considerations when using HOC:
        - The name of the prop that a HOC can pass to an element, can cause a naming collision.
        - When using multiple composed HOCs that all pass props to the element that's wrapped within them, it can be difficult to figure out which HOC is responsible for which prop. This can hinder debugging and scaling an application easily.
- **Render Props Pattern:** A render prop is a prop on a component, which value is a function that returns a JSX element.
    - Why to use render props: A component that takes a render prop usually does a lot more than simply invoking the `render` prop. Instead, we usually want to pass data from the component that takes the render prop, to the element that we pass as a render prop!
    - When to use render props: in large applications, when you need to do prop lifting to multiple levels higher, or in components that have many children, as this will trigger unnecessary rerenders each time the lifted prop value changes.
    - How to use it: pass in a function that returns an element as prop, or pass in the function that returns element as children.
    - cons:
        - In a lot of cases we can replace render props with hooks. Example: Apollo client.
        - Since we can't add lifecycle methods to a `render`
         prop, we can only use it on components that don't need to alter the data they receive.

*Below patterns are also important and can be useful in some specific scenarios. Get familiar with them can help us design certain applications with a clear architecture.*
- **Proxy Pattern**: Proxies are a powerful way to add control over the behavior of an object. A proxy can have various use-cases: it can help with validation, formatting, notifications, or debugging.
    - Overusing the `Proxy` object or performing heavy operations on each `handler` method invocation can easily affect the performance of your application negatively. It's best to not use proxies for performance-critical code.
- **Mediator/middleware pattern**: The mediator pattern makes it possible for components to interact with each other through a central point: the mediator. Instead of directly talking to each other, the mediator receives the requests, and sends them forward! In JavaScript, the mediator is often nothing more than an object literal or a function. 
    - A real world example is middleware in Express framework.
- **Flyweight Pattern**: The flyweight pattern is useful when you're creating a huge number of objects, which could potentially drain all available RAM. It allows us to minimize the amount of consumed memory. In JavaScript, we can easily implement this pattern through [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain). 
    - Nowadays, hardware has GBs of RAM, which makes the flyweight pattern less important.
- **Command Pattern**: The client that creates a command is not the same client that executes it. This separation provides flexibility in the timing and sequencing of commands. Materializing commands as objects means they can be passed, staged, shared, loaded in a table, and otherwise instrumented or manipulated like any other object.
    - It’s most common use case is to reuse the same operation from different UI entry points.
- **Factory Pattern:** With the factory pattern we can use **factory functions** in order to create new objects. A function is a factory function when it returns a new object without the use of the `new` keyword! 
## Do-Not-Use
*For below patterns, you should know them, but try not to use them because they are somewhat considered anti-patterns in javascript.*
- **Singleton Pattern**: do not use this pattern; always use object directly      
- **Mixin Pattern:** Allow us to easily add functionality to objects without inheritance by injecting functionality into an object's prototype. We can use `Object.assign(targetObj, mixinFunc)` method to implement this pattern. This method lets us add properties to the target object. Always the targetObj is an object’s propotype, and mixinFunc is an object with a group of properties.
    - React team disencourages to use this pattern and consider it harmful, HOC is recommended instead. In general, modifying prototype is considered as an anti-pattern, as it can lead to prototype pollution and a level of uncertainty regarding the origin of our functions.
    - However, it is still widely used in Web APIs: An example of a mixin in the real world is visible on the `Window` interface in a browser environment. The `Window` object implements many of its properties from the [WindowOrWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope) and [WindowEventHandlers](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers) mixins, which allow us to have access to properties such as `setTimeout` and `setInterval`, `indexedDB`, and `isSecureContext`. Since it's a mixin, thus is only used to *add functionality* to objects, you won't be able to create objects of type `WindowOrWorkerGlobalScope`.