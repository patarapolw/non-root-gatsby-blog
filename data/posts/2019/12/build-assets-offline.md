---
title: Building JavaScript assets offline, before deploying to the web server
date: 2019-12-25
tag:
  - JavaScript
  - Netlify
---


**I have always wondered why I have to run `yarn build` scripts online on Heroku / Netlify / Now.sh**; which takes time, does not guarantee to succeed and HTML / JavaScript / CSS are cross platform anyway.

===

Long time ago, I have found [gh-pages](https://www.npmjs.com/package/gh-pages) and wrote a blog about it -- https://www.polvcode.dev/post/2019/08/gh-pages -- which is mostly about publishing to GitHub Pages, and Heroku.

However, there are problems with GitHub Pages; namely, new pages doesn't always update promptly after repeated deployment. There are these kind of problems in Heroku / Netlify / Now.sh.

Lately, I have one another way for Netlify, which is [Netlify CLI deploy](https://github.com/netlify/cli/blob/master/docs/commands/deploy.md), so I just pust `"deploy": "yarn build && netlify deploy --dir dist"` in my `package.json`. Netlify also offers a way to test a real website online (with hash, so that the name doesn't collide).

So, back to the real question, **why do I have to run build script for static JavaScript / CSS / HTML assets online**, again?
