---
title: Nuxt magic with asyncData, and planning
date: 2019-11-28
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRP6tsihLLVMDGuWvclr05EvJQPvrhSeSWV2Klic2tkhpQywtbj
tag:
  - nuxt
  - Node.js
---

Nuxt.js is a framework for making JavaScript apps a more static site, that is, pushing more to Server-Side Rendering, making it easier to web crawlers.

However, when it is made more static, reactivity is sacrificed.

===

So, I use `asyncData` to create teasers, and AJAX (fetch) to get more data, as can be seen on how this blog was made.

Indeed, the point of Nuxt.js is SEO. It might also be a little about security, with [JAMstack](https://jamstack.org/).
