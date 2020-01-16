---
title: My common.py
date: 2018-02-03
image: https://upload.wikimedia.org/wikipedia/commons/a/ad/Lozingle_10032014.jpg
tag:
  - python
  - common.py
---

A list of classes / functions I use repeatedly across projects. Also, please see ^^post blog/2018/02/python-decorators.md^^

<!-- excerpt_separator -->

```python
import collections
from time import time

def flatten(d, parent_key='', sep='_'):
    items = []
    for k, v in d.items():
        new_key = parent_key + sep + k if parent_key else k
        if isinstance(v, collections.MutableMapping):
            items.extend(flatten(v, new_key, sep=sep).items())
    else:
        items.append((new_key, v))
    return dict(items)

class SpeedTest:
    def __init__(self, funcName):
        self.funcName = funcName

    def __enter__(self):
        print('Started: {}'.format(self.funcName))
        self.init_time = time()
        return self

    def __exit__(self, type, value, tb):
        print('Finished: {} in: {} seconds'.format(self.funcName, time() - self.init_time))
```
