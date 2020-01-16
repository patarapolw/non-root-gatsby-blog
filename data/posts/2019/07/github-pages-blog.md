---
title: GitHub Pages as blog Combo
date: 2019-07-03
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqbDL-RdwO45w24ZeCv-N5bQAZxXOnd2nbCpymQvswWr4exu6K
tag:
  - GitHub Pages
  - blogging
---

Right now, I only know one website that allows me to host HTML as full webpage that supports static JavaScript, that is [GitHub Pages](https://pages.github.com), which might not be truly static, if you have some good API supported in the background, e.g. Disqus, or Heroku.

<!-- excerpt_separator -->

However, it seems that many kinds of CSS/JavaScript on GitHub Pages might not always loaded if it conflicts with Jekyll, or for some other reasons (as I described in Cogear.js; SCSS-generated CSS just doesn't load.)

So, how do I ensure it will load? Install Ruby and Jekyll on your computer; and test-drive.

```
# Make sure Ruby is installed first, though
gem install bundler jekyll
gem install bundler jekyll
jekyll new my-awesome-site
cd my-awesome-site
jekyll serve
```

But, even with this, many features are still disabled… Checkout your theme, can be enabled with

```
cd $(bundle show minima)
cat README.md
```

And read the `README.md`. If that isn't enough, read [Jekyll Docs](https://jekyllrb.com/docs/).
