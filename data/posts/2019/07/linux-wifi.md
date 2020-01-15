---
title: Installing Linux and WiFi support
date: 2019-07-18
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQSCmge9Ldedr9lg6MVCwYCa-suHasjdnQ59YSn6_yiK-hXT6IR
tag:
  - linux
  - wifi
  - ubuntu
  - Elementary OS
---

I have tried to install Linux ([Elementary OS](https://elementary.io/)) on both macOS and Windows; and number one impediment? -- the lack of WiFi.

Of course, there is an official troubleshooting here -- <https://help.ubuntu.com/stable/ubuntu-help/net-wireless-troubleshooting.html.en>

===

## Immediate connection fix

If you cannot connect to the internet, how are you going to connect to the the internet to find out a solution?

### Requirements

- An Android phone

You can use "USB hotspot tethering" on Android phone to connect to the internet.

## What to do when you now have a connection

Go to <https://help.ubuntu.com/stable/ubuntu-help/net-wireless-troubleshooting.html.en> and find out your WiFi driver, and install it.

Well, it depends on your hardware.

In my case, for Windows, it is Realtek RTL8821ce, and the solution on StackOverflow -- <https://askubuntu.com/a/1071334>

For macOS, it is the matter of activating proprietary Broadcom WiFi driver, and you just need an internet connection...
