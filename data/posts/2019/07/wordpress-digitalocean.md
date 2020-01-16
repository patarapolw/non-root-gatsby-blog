---
title: An easy way to self-host WordPress on DigitalOcean
date: 2019-07-14
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTs9vKZQKoNSRYaG51pYZlflYxZg78RGnnaXsWQCX6jfXBF-aHR
tag:
  - wordpress
  - DigitalOcean
  - self hosting
  - pinned
---

This is a thing that can be done easy way, if you strictly follow these steps. The downside of DigitalOcean, is that if you messed up, no one will help you debug.

<!-- excerpt_separator -->

The steps are

1. Get a domain name in advance, probably at Namecheap
2. Register an account on DigitalOcean and create a pre-made one-click install WordPress droplet.
3. Before SSH into the droplet, add your domain first
4. Follow the instructions for everything default, but do add your domain name. For Let's Encrypt, do not redirect.
5. That's it. -- Now the domain name will not be messed up.
