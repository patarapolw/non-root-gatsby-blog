---
title: A successful py2app setup.py code
date: 2018-01-27
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWTqh2q4wZ4ZT52Vfr_yoed2HUhOdAUOq3CANT8UBkNGiu_L_E
tag:
  - python
  - pyapp
  - setup.py
---

py2app and py2exe are how to compile a Python package bundle into a single file app. However, I had problem simply running `py2applet --make-setup PatientLogbook.py database/user.db`, so I have to edit the config file myself.

Root causes of the problem running `python setup.py py2app` include the following.

<!-- excerpt_separator -->

- Misplaced data file, default not in the correct directory
- `passlib` in `py2app` defaulted to using `bcryptor` instead of `bcrypt`
- Even though I changed `from passlib.hash import bcrypt` to `import bcrypt`, I still need `cffi` for `bcrypt` to work

Here is a working `setup.py`.

```python
"""
Usage:
python setup.py py2app
"""

from setuptools import setup

APP = ['PatientLogbook.py']
DATA_FILES = [
    ('database',['database/user.db'])
]
OPTIONS = {
    'includes': ['cffi'],
    'plist': {
        'CFBundleName': 'Patient Logbook'
    }
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app','PyQt5','bcrypt','cffi'],
)
```
