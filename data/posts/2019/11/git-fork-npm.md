---
title: Git fork and NPM install git-URL in your own version
date: 2019-11-22
image: https://img.pngio.com/git-png-4-png-image-git-png-1024_600.png
tag:
  - git
  - GitHub
  - npm
  - python
  - TypeScript
---

Sometimes, you want to in stall an NPM package, but it isn't complete enough, or there isn't a TypeScript definition. You can [extend it](/blog/post/extend-types-typescript), by `git fork` -- and then `npm install <URL>.git`. -- You might need to edit `git fork` in your own computer first, though.

Not only NPM. [Python's PIP can do this as well](https://adamj.eu/tech/2019/03/11/pip-install-from-a-git-repository/).

After extending the fork, you might consider `git merge` to contribute to the main branch.
