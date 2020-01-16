---
title: Creating and editing Anki's *.apkg and *.anki2 via SQLite
date: 2019-07-30
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4ooqth-qfi7gtBk5tgnXGiF6CUAhQzLemTpLRUjtSUox19l9T
tag:
  - anki
  - sqlite
  - peewee
  - pinned
---

\*.apkg and \*.anki2 file structure is very simple, but with some quirks of incompleteness.

[\*.apkg file structure](https://github.com/ankidroid/Anki-Android/wiki/Database-Structure) is a zip of at least two files.

<!-- excerpt_separator -->

```
.
├── example
│   ├── example.anki2
│   ├── media
│   ├── 1  # Media files with the names masked as numbers
│   ├── 2
│   ├── 3
|   └── ...
└── example.apkg
```

\*.anki2 is a SQLite file with foreign key disabled, and the usage of [some JSON schemas](/ankisync2/builder/default.py) instead of [some tables](/ankisync2/db.py#L46)

Also, \*.anki2 is used internally at [`os.path.join(appdirs.user_data_dir('Anki2'), 'User 1', 'collection.anki2')`](https://github.com/patarapolw/ankisync/blob/master/ankisync/dir.py#L9), so editing the SQLite there will also edit the database.

The `media` file is a text file of at least a string of `{}`, which is actually a dictionary of keys -- stringified int; and values -- filenames.

I created a [PyPI package](https://github.com/patarapolw/ankisync2) is ease the editing of this SQLite (and text file), powered by [Peewee ORM](http://docs.peewee-orm.com/en/latest/index.html).

<https://github.com/patarapolw/ankisync2>