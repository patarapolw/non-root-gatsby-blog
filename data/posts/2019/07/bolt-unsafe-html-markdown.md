---
title: Injecting unsafe HTML into Bolt entries + CodeMirror/UIKit editor
date: 2019-07-09
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDO_p0QiaGehExbdLMqCY2MT7TP759whHkorR0MegIwQ4IHb4R
tag:
  - php
  - bolt CMS
  - markdown
---

By default, both [Markdown field](https://docs.bolt.cm/3.6/fields/markdown#input-sanitisation) and [HTML field](https://docs.bolt.cm/3.6/fields/html#input-sanitisation) is available for [Bolt CMS](https://bolt.cm/), but sanitation is done before inserting into the database, making rendering of certain elements impossible; especially, for those starting with `<` (Unless you use `&lt;`).

So, I fixed this while preserving the editor (CodeMirror/UIKit) here <https://github.com/patarapolw/bolt-markup>
