---
title: "[Python-web.py] Turning website into a desktop app"
date: 2018-02-14
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHKVrds2fU5fqVnsmUwdOgNyOUIssq0aXpgit1vx8L6dK3B2_j
tag:
  - python
  - desktop
  - web.py
  - PyQt5
---

This is what I have got:

```python
from ui.mainWindow import MainWindow
from webview.controller import initServer

from PyQt5.QtWidgets import *
import sys
import httplib2
from time import sleep

if __name__ == '__main__':
    initServer().start()

    h = httplib2.Http()
    while True:
        try:
            resp = h.request("http://0.0.0.0:8080/", 'HEAD')
            break
        except ConnectionRefusedError:
            sleep(1)
            continue

    app = QApplication(sys.argv)
    window = MainWindow()
    window.showUI()
    window.setBaseSize(1000, 600)
    window.move(QDesktopWidget().rect().center().x()-window.rect().center().x(), window.rect().y())
    sys.exit(app.exec_())
```

===

```python
# webview/controller.py

import web
from threading import Thread
import sys

import r

urls = (
    '/', 'index'
)
render = web.template.render('webview/templates/', base='index',
globals={'level_labels': r.Level().level_labels})

class index:
    def GET(self):
        return render.mainPage()

class initServer(Thread):
    def __init__(self):
        super().__init__()
        self.daemon = True

    def run(self):
        app = web.application(urls, globals())
        app.run()

    def close(self):
        sys.exit()
```

```python
# ui/mainWindow.py

import web
from threading import Thread
import sys

import r

urls = (
    '/', 'index'
)
render = web.template.render('webview/templates/', base='index',
globals={'level_labels': r.Level().level_labels})

class index:
    def GET(self):
        return render.mainPage()

class initServer(Thread):
    def __init__(self):
        super().__init__()
        self.daemon = True

    def run(self):
        app = web.application(urls, globals())
        app.run()

    def close(self):
        sys.exit()
```