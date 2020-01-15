---
title: Sharing Python project that works in another computer!
date: 2018-02-27
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSW4Ywh9fnwlOBcxAG8Mgg94zC55j3dYh1Y88YcB83wCjaBZVmA
tag:
  - python
---

I find that the issue may includes:-

- Module dependencies
  - This can be solved by using virtualenv since the very beginning of the project
- Different python version
  - This can be managed very beautifully with tox
- Requiring something else outside the first two. For example, `brew install phantomjs`
  - I don't yet know how to manage this one...
  - Perhaps Docker
