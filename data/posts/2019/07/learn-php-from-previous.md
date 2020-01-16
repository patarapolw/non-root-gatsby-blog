---
title: Learning PHP from other programming languages
date: 2019-07-08
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-OMfTIWpQi63ocxmaCRVYOc0QIzgejLDHdFJtJuTYOmJgDqr_
tag:
  - php
  - bolt CMS
  - pinned
---

PHP is a bit different from other languages, like Python or Dart, in that, it is a mainly a web programming language, running on a server. Furthermore, it is actually pre-installed in macOS.

I would actually recommend this -- <https://phptherightway.com/>, and it is quite updated.

<!-- excerpt_separator -->

## Installing PHP

Although there are pre-installed packages for PHP, like [XAMPP](https://www.apachefriends.org/index.html) or [MAMP](https://www.mamp.info/en/), I would rather recommend installing separate parts normally, for learning; for the ease of installing packages: and for project management.

- `brew install php`
- Install [Composer](https://getcomposer.org/)
- Install Apache (`brew install httpd`) or Nginx (`brew install nginx`); and set it up.
  - It seems that Apache is easier to use, but Nginx is faster. Also, Nginx's config looks nicer.

## PHP CLI programming

It seems that in the end, PHP is not only for web servers. CLI app programming can also done...

```php
// script.php
<?php
// Your code here
```

## PHP in HTML

Although this was originally the intent of PHP, it doesn't seem to be a good practice to intermingle PHP and HTML in the same file (just like JavaScript).

## PHP web frameworks

Of course, that is where I am coming from…

## Downloading a repo from the internet / use a project scaffold

For the purpose of testing, I use [Bolt CMS](https://bolt.cm/).

However, in order to upload to Heroku, you have to set your own web server, like no other programming languages -- <https://github.com/patarapolw/bolt-heroku#deploy-bolt-on-heroku>
