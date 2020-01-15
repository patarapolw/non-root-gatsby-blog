---
title: Various Node.js sqlite packages. What is the best?
date: 2019-07-17
image: https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/1200px-SQLite370.svg.png
tag:
  - node.js
  - javascript
  - sqlite
---

The official implementation is actually [`sqlite3`](https://www.npmjs.com/package/sqlite3), and there are at least 2 packages built on top of it -- [`sqlite`](https://www.npmjs.com/package/sqlite) and [`TypeORM`](https://typeorm.io/#/). There are also other packages that can run SQLite including [`better-sqlite3`](https://www.npmjs.com/package/better-sqlite3) and [`sql.js`](https://github.com/kripken/sql.js/).

===

## Considerations

- Easy to write / maintain
- Client-side / browser only
- Fast
- [Electron.js](https://electronjs.org/)-enabled

In my experience, it seems that, in Node.js environment, Promise-based `sqlite` seems the be the best. Also, being-based on `sqlite3`, it works well with Electron.js (`better-sqlite3` does not work well with Node.js. `sql.js` of course works, but it is not truly file-based.)

However, `better-sqlite3` claims to be faster than `sqlite`...

Being a TypeScript user, I am looking forward to try out `TypeORM` sometime.
