---
title: Create reusable codes across Projects and potentially ShareIt!
date: 2018-02-07
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiJmcz8lmfxBjO1Svz-urf6yKiZ3RSnYpx2m2F-dnjp_SO204V
tag:
  - python
---

I am programming in modules, and it is easy to share `*.py` within a project. How?

===

- Always code in a `def` or a `class`. Never code outside one.
- For main code, never code outside a block, but code main code inside `if __name__ == '__main__'`:
- Share using `import ...` or `from ... import ...`

But sharing across projects is a different story, but today, I found out how:- <https://python-packaging.readthedocs.io/en/latest/>

- When you have done the packaging, you can run `pip install -e .` to share it for any `*.py` files you will run in the future.
- This will also facilitate others to run `pip install .`, and they can use your git now. (They will have to clone your git first, though.)
- You can publish on PyPI using `python setup.py register`
- Editing `setup.py` a bit, it is `py2app`/`py2exe`.

Good luck modular programming!
