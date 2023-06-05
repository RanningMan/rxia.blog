---
title: "Learning Patterns: Book Notes (Part 3)"
date: "2023-06-05"
description: "An opinioned book notes on Learning Patterns by Lydia Hallie and Addy Osmani. This blog covers the third and last part of the book --  Performance Patterns."
tag: ["book notes", "web performance", "architecture", "web development"]
isDraft: false
---

Earlier this year, I started to read the online book [_Learning Patterns_ by Lydia Hallie and Addy Osmani](https://www.patterns.dev/). It's a good book for mid-level developers, which has comprehensive coverage of design and development patterns with perspectives from Object Oriented Design to rendering mechanisms, to performance best practices, with a focus on Javascript & React.js.

This blog summarizes the third and the last part of the book -- rendering patterns. Compare to the first part of the book ([notes can be found here](https://rxia.blog/patterns.dev-1/)), there is some refinement that needs to be done for this part. But it doesn’t prevent us to do a preview of the content and grasp the key idea behind them. So in this blog, I’m going to summarize the key takeaways from this section of the book.

The section of the book starts with proposing an ideal loading sequence, then discusses multiple techniques to achieve the proposed loading sequence.

The section of the book starts with proposing an ideal loading sequence, then discusses multiple techniques to achieve the proposed loading sequence.

# Ideal resource loading sequence

| SEQUENCE OF EVENTS on the main browser thread |                                                   | SEQUENCE OF REQUESTS on the network                |
| --------------------------------------------- | ------------------------------------------------- | -------------------------------------------------- |
| 1                                             | Parse the HTML                                    | FCP blocking 3P resources                          |
| 2                                             |                                                   |                                                    |
| 3                                             |                                                   | Small inline 1P scripts.                           |
| 4                                             | Execute small inline 1P scripts                   | Inlined critical CSS (Preload if external)         |
| 5                                             | Parse FCP blocking 3P resources                   | Inlined critical Fonts (Preconnect if external)    |
| 6                                             | Parse FCP resources (critical CSS, font)          | 3P personalized ATF image required for LCP         |
| 7                                             | First Contentful Paint (FCP)                      | LCP Image (Preconnect if external)                 |
| 8                                             | Render 3P personalized ATF image required for LCP | Fonts (triggered from inline font-css (Preconnect) |
| 9                                             |                                                   | Non-critical (async) CSS                           |
| 10                                            | Render LCP resources (Hero image, text)           | 3P that must execute before first user interaction |
| 11                                            |                                                   | First-party JS for interactivity                   |
| 12                                            | Largest Contentful Paint (LCP)                    |                                                    |
| 13                                            | Render important ATF images                       | Default 3P JS                                      |
|                                               | Visually Complete                                 |                                                    |
| 14                                            | Parse Non-critical (async) CSS                    |                                                    |
| 15                                            | Execute 3P required for first user interaction    | Below the fold images                              |
| 16                                            | Execute 1P JS and hydrate                         | Lazy-loaded JS chunks                              |
|                                               | First Input Delay (FID)                           | Less important 3P JS                               |

Above table is copied from the original online book, but with some modifications based on my personal understanding.

# Different Ways to Load Resources

There are multiple ways to consider when decides strategies to load resources. Most of the below techniques are used with help of bundle splitting by a bundler like Webpack.

- Eager (static import) - load resource right away (the normal way of loading scripts)
- Lazy (Import On Visibility) - load when the user scrolls towards the component
- Lazy (Import On Interaction) - load when the user clicks UI (e.g Show Chat)
- Lazy (Route-based Splitting) - load when a user navigates to a route or component
- Prefetch - load prior to needed, but after critical resources are loaded
- Preload - eagerly, with a greater level of urgency

### Static Import

The default way to import is to use static import by simply using `import` keyword. In this approach, all the code will be loaded at once.

### Import on Visibility

In order to know whether components are currently in our viewport, we can use the **`[IntersectionObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)**, or use libraries such as `react-lazyload` or `react-loadable-visibility` to quickly add import on visibility to our application.

### Import on Interaction

- One option for implementing load-on-interaction is straight-forward: use a **[facade](https://github.com/patrickhulce/third-party-web/blob/10ec0f8f30bbbb73e2de5640cb652a07dd4d7d11/facades.md)**. A facade is a simple "preview" or "placeholder" for a more costly component where you simulate the basic experience, such as with an image or screenshot. When a user clicks on the "preview" (the facade), the code for the resource is loaded. This limits users needing to pay the experience cost for a feature if they're not going to use it. Similarly, facades can **[preconnect](https://web.dev/uses-rel-preconnect/)** to necessary resources on hover.
- To implement in vanilla JS, dynamic import can be used to lazy load modules.
- To implement in React, `React Lazy` and `React Suspence` can be used. If SSR is used by the app, `loadable-components` should be used instead of `React Suspence`.
- **Trade-offs** Shifting costly work closer to user-interaction can optimize how quickly pages initially load, however the technique is not without trade-offs.
  - **What happens if it takes a long time to load a script after the user clicks?**
    One way to reduce the chance of this happening is to better break-up the loading of, or prefetch these resources after critical content in the page is done loading. I'd encourage measuring the impact of this to determine how much it's a real application in your apps.
  - **What about lack of functionality before user interaction?**
    Another trade-off with facades is a lack of functionality prior to user interaction. An embedded video player for example will not be able to autoplay media. If such functionality is key, you might consider alternative approaches to loading the resources, such as lazy-loading these third-party iframes on the user scrolling them into view rather than deferring load until interaction.

### Route-Based Splitting

We can request resources that are only needed for specific routes, by adding *route-based splitting*. By combining **React Suspense** or `loadable-components` with libraries such as `react-router`, we can dynamically load components based on the current route.

### Preload

Preload is a browser optimization that requests critical resources earlier to improve loading performance and metrics in the Core Web Vitals. It can be useful to load JavaScript bundles necessary for interactivity when optimizing for metrics like Time To Interactive or First Input Delay. However, it requires an awareness of trade-offs. Care should be taken to avoid delaying resources like hero images or fonts necessary for First Contentful Paint or Largest Contentful Paint.

For first-party JavaScript, consider using `<script defer>` in the document `<head>` to help with early discover of these resources.

**Preload + the `async` hack:** You can take advantage of the preload + async hack to download a script as high-priority and not block the parser waiting for a script. However, this may delay the download of other resources, which is a trade-off a developer has to make.

```
<link rel="preload" href="emoji-picker.js" as="script">
<script src="emoji-picker.js" async>
```

You may also find `<link rel="preload">` to be helpful for cases where you need to fetch scripts **without executing** them.

### Prefetch

Prefetch (`<link rel="prefetch">`) is a browser optimization which allows us to fetch resources that may be needed for subsequent routes or pages before they are needed. Prefetching can be achieved in a few ways. It can be done declaratively in HTML (such as in the example below), via a HTTP Header (`Link: </js/chat-widget.js>; rel=prefetch`), **Service Workers** or via more custom means such as through Webpack. In many cases, we know that users will request certain resources soon after the initial render of a page. Although they may not visible instantly, thus shouldn't be included in the initial bundle, it would be great to reduce the loading time as much as possible to give a better user experience!

# PRPL Pattern

The PRPL pattern focuses on four main performance considerations:

- Pushing critical resources efficiently, which minimizes the amount of roundtrips to the server and reducing the loading time.
- Rendering the initial route soon as possible to improve the user experience
- Pre-caching assets in the background for frequently visited routes to minimize the amount of requests to the server and enable a better offline experience
- Lazily loading routes or assets that aren't requested as frequently

### Push

To implement PRPL pattern, we use HTTP2's SSE to push resources instead of HTTP1.1.

HTTP/2 splits requests and responses into smaller pieces called frames. An HTTP request containing headers and a body gets split into at least two frames: a headers frame and a data frame. HTTP/2 uses bidirectional streams, allowing a single TCP connection to carry multiple bidirectional streams and multiple request and response frames between the client and server. Once all request frames for a specific request have been received, the server reassembles them and generates response frames, which are sent back to the client. This bidirectional stream allows us to send both request and response frames over the same stream.

### Rendering

The PRPL pattern makes sure that no other resources get requested or rendered before the initial route is visible on the user's device.

### Pre-caching

HTTP/2 introduced server push, which sends additional resources automatically instead of having to explicitly ask for resources each time by sending an HTTP request. These resources get stored in browser cache, reducing the time to receive additional resources when the browser discovers them while parsing the entry file. However, server push is not HTTP cache aware, and the pushed resources won't be available the next time we visit the website and will have to be requested again. To solve this, the PRPL pattern uses service workers after the initial load to cache those resources and prevent unnecessary requests from the client.

Besides service workers, as the authors of a site, we usually know what resources are critical to fetch early on, while browsers do their best to guess this. Therefore, we can help the browser by adding a `preload` resource hint to the critical resources.

### Lazy-Loading

No other resources get loaded before the initial route has loaded and rendered completely! We can achieve this by code-splitting our application into small, performant bundles. Those bundles should make it possible for the users to only load the resources they need, when they need it, while also maximizing cachability!

### Common Implementation of PRPL pattern

The PRPL pattern often uses an app shell as its main entry point, which is a minimal file that contains most of the application's logic and is shared between routes! It also contains the application's router, which can dynamically request the necessary resources.

The PRPL pattern makes sure that no other resources get requested or rendered before the initial route is visible on the user's device. Once the initial route has been loaded successfully, a service worker can get installed in order to fetch the resources for the other frequently visited routes in the background!

Since this data is being fetched in the background, the user won't experience any delays. If a user wants to navigate to a frequently visited route that's been cached by the service worker, the service worker can quickly get the required resources from cache instead of having to send a request to the server.

Resources for routes that aren't as frequently visited can be dynamically imported.

# Bundle Splitting

Often time you will need to use a bundler like Webpack or Vite to split javascript bundle and tree shaking the bundles to get smaller chunks to send to clients.

# Optimize Loading third-parties

### Common strategies

- **Use async or defer to prevent scripts from blocking other content.**
  **Applicable to:** Non-critical scripts (tag managers, analytics)
- **Establish early connections to required origins using resource hints, eg. use `preconnect`**
  or `dns-prefetch`
  **Applicable to:** Critical scripts, fonts, CSS, images from third-party CDNs
- **Lazy load below-the-fold 3P resources**
  **Applicable to:** Embeds such as YouTube, Maps, Advertisements and Social media
- **Self-host 3P scripts to prevent round trips**
  **Applicable to:** JavaScript files, fonts\

- **Use service workers to cache scripts where possible**
  **Applicable to:** JavaScript files, fonts

### Best practices by script type

- **Non-critical JavaScript:** Most third-parties like chat widgets or analytics scripts are not critical to the user experience and can be delayed. Using the `defer` script attribute is the most common method to delay the loading and execution of these scripts.
- **Bot detection/ReCaptcha:** Common strategies to use are: 1. Load it only on a few pages with form inputs from the user that may get spammed by a bot. 2. **[Lazy load the script](https://dev.to/uf4no/improve-page-performance-lazy-loading-recaptcha-442o)** when the user interacts with form elements, for example, on form focus. 3. Use resource hints to establish early connections when you need the script to execute on page load.
- **Google Tag Manager (GTM):** Optimization of GTM scripts is more about **[controlling who accesses GTM](https://www.tunetheweb.com/blog/adding-controls-to-google-tag-manager/)** and monitoring the changes that they make. Another optimization that applies to older third-party script tags is related to **document.write()**.
- **A/B Testing and Personalization:** To optimize third-party A/B testing scripts, you can limit the number of users who receive the script.
- **YouTube and map embeds:** Use of solutions like **[lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed)** is encouraged while noting that double-tap/click is required in iOS/macOS-Safari to play the video using this facade.
- **Social media embeds:** Some social media embeds provide an option to lazy-load their scripts (e.g., **[data-lazy in Facebook](https://developers.facebook.com/docs/plugins/embedded-posts/)** embeds). You can explore this to improve performance. Another alternative is to use image facades created manually or using tools like **tweetpik**.

### Out-of-the-box Optimization Tools

There are some out-of-the-box optimization that we could use, for example Partytown created by Builder.io, or Next.js’s Script component. They both support optimized 3p library loading strategies by default.

# List Virtualization

This is the idea of rendering only visible rows of content in a dynamic list instead of the entire list. The rows rendered are only a small subset of the full list with what is visible (the window) moving as the user scrolls. This can improve rendering performance.

"Virtualizing" a list of items involves **maintaining a window** and **moving that window around your list**. Windowing in react-virtualized works by:

- Having a small container DOM element (e.g `<ul>`) with relative positioning (window)
- Having a big DOM element for scrolling
- Absolutely positioning children inside the container, setting their styles for top, left, width and height.

Rather than rendering 1000s of elements from a list at once (which can cause slower initial rendering or impact scroll performance), **virtualization focuses on rendering just items visible to the user**.

This can help keep list rendering fast on mid to low-end devices. You can fetch/display more items as the user scrolls, unloading previous entries and replacing them with new ones.

# Compressing JavaScript

To optimize performance, compress JavaScript and monitor chunk sizes. Minify JavaScript before compression to remove unnecessary code. Use static compression for infrequently changing files and dynamic compression for frequently changing or application-generated content. Gzip and Brotli are the most common compression algorithms. However, compression alone cannot solve all performance issues, and loading granularity problems need to be addressed across different platforms in the ecosystem.
