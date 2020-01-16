---
title: Create an Electron app from any web server in any programming language.
date: 2019-07-04
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMQFZ9SzNkt7LXFk6YgFPaVLs7tA2dZoM0tJokNVNz7q7Mi5Qa
tag:
  - electron
  - web server
  - pinned
---

As Electron is actually an containerized extended Chromium web engine, I reckon that this must be possible somehow. However, by default, Electron uses `ipcMain`/`ipcRenderer` rather than `http` or `websocket`...

As for a lazy reader, you can see my example project at <https://github.com/patarapolw/rep2recall-sqlite>, which is Python Flask in Electron. There is also a pure TypeScript version -- <https://github.com/patarapolw/e-rep2recall>

<!-- excerpt_separator -->

## Finding a random PORT

You might use <https://www.random.org/integers/?num=1&min=5001&max=49151&col=5&base=10&format=html&rnd=new>. Just make sure you don't use too common a port number.

## Containerizing web server

This is quite easy for Python, using <https://www.pyinstaller.org/>. For a guide on how to add data files, you might follow <https://github.com/smoqadam/PyFladesk#packaging>.

For Java/Kotlin/other JVM languages, you might use <https://github.com/johnrengelman/shadow>, i.e. fat JAR, shadow JAR, uber JAR.

For JavaScript/TypeScript itself, you don't need containerizing, but make use you use absolute path, relative to `__dirname` for everything, and avoid hidden imports. For Express.js, at least `pug` and `ejs` templating engine works, but make sure to use `pug.renderFile()` and `ejs.renderFile()`. You can avoid this altogether, though, by making use of static files.

## Starting web server at app start, and killing web server at app exit, including on errors

For non-JavaScript, see <https://github.com/patarapolw/rep2recall-sqlite/blob/master/src/node/electron.ts>

For JavaScript/TypeScript, see <https://github.com/patarapolw/e-rep2recall/blob/master/src/node/electron.ts>

To kill on error, you might try [doing a cleanup action just before node.js exits](https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits)

## Webpack-dev-server settings

See <https://github.com/patarapolw/rep2recall-sqlite/blob/master/webpack.dev.js>.

Have only tried `http` and `socket.io`. Never tried `websocket` directly yet, though.

This allows you to run Electron in your default web browser in development mode using two terminal, `webpack-dev-server`, and another running your default web server. Make sure to hide Electron specific code on development, though; otherwise it will throw an error in Webpack and in web browser.

## Electron builder, and file associations

This might give you some ideas -- <https://github.com/patarapolw/rep2recall-sqlite/blob/master/package.json#L61>

`asarUnpack` is needed for Python and static files. -- <https://github.com/patarapolw/rep2recall-sqlite/blob/master/package.json#L86>.
