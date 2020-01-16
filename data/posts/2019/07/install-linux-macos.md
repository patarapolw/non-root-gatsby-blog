---
title: Installing Linux on macOS MacBook Air -- Major Obstacles
date: 2019-07-06
image: https://miro.medium.com/max/3000/1*Qsu6s05Xepx3_YKmmviURg.png
tag:
  - linux
  - macOS
---

Installing Linux is never hard on Windows, with supported hardwares, e.g. Dell, but on macOS, it is another beast; probably because of a very specific proprietary hardware -- main harddisk and cannot install additional internal harddisk. Furthermore, I have both macOS 11" (2015) ad 13" (2017) with different problems. After, it is never as easy as installing Windows.

<!-- excerpt_separator -->

## Major obstacles

- Shrinking the macOS partition, and partitioning the SSD harddisk for Linux.
- Detecting SSD harddisk on installation Live CD.
- Install GRUB2 (has to use [rEFInd](https://www.rodsbooks.com/refind/installing.html) instead.)
- [System Integrity Protection](https://www.imore.com/how-turn-system-integrity-protection-macos) to prevent install bootloader on macOS.
- WiFi driver is not present.

## Solutions

- Most parts of the solution can be found here -- <https://github.com/aroman/elementary-on-a-mac>
- About installing WiFi driver, if not present,
  - Get an Android, and [tether HotSpot via USB cable](https://support.google.com/android/answer/9059108?hl=en)
  - Install additional drivers, `sudo ubuntu-drivers autoinstall`

## Best Linux Distro

- The criteria for this has to be both
  - Support for proprietary drivers
  - New enough to install as many proprietary drivers as possible

For this, I have to vote for Ubuntu-based distros, in which somehow [Elementary OS](https://elementary.io/) (Oct 2018) seems to have better drivers than Ubuntu 19.04 at the time of writing. Also, user experience (UX) is subjectively better as well.

So, the answer is [Elementary OS](https://elementary.io/)

## What is still impossible

- Single install Linux on the main harddisk.
- Installing Linux other than [Elementary OS](https://elementary.io/) on my MacBook Air 11" (2015). Even Ubuntu does not detect the main harddisk.
