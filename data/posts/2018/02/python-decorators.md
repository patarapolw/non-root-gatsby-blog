---
title: Some useful python decorators I have made recently.
date: 2018-02-03
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUt_AjZKjRhRVQ3S3vaqXj2MCzImgWogbC6asInALTSP0NSWqT
tag:
  - python
  - decorator
---

I wonder how could I make it available across projects???

===

```python
from time import time

def iter2list(func):
    def wrapper(*args, **kwargs):
        return list(func(*args, **kwargs))
    return wrapper

def speedWrapper(func):
    def wrapper(*args, **kwargs):
        with speedTest(func.__qualname__):
            return func(*args, **kwargs)
    return wrapper

class speedTest:
    def __init__(self, funcName):
        self.funcName = funcName

    def __enter__(self):
        print('Started: {}'.format(self.funcName))
        self.init_time = time()
        return self

    def __exit__(self, type, value, tb):
        print('Finished: {} in: {} seconds'.format(self.funcName, time() - self.init_time))
```

Usage:-

```python
from common import common

@common.iter2list
def func():
    ...
    yield ...

@common.speedWrapper
def func2():
    ...
```