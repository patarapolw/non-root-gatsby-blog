---
title: Linux Live CD runs slowly in VirtualBox
date: 2019-07-18
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRcYZ2nd_E3QdJB9eb6AHjKZOMfyWnJdovpEonB1A8Ge7r6p8Yn
tag:
  - live linux
  - virtualbox
---

So, I googled for solution, and found this <https://forums.virtualbox.org/viewtopic.php?f=3&t=59456>

Another problem is that there is no x64 enabled in VirtualBox, despite running Windows x64 <https://superuser.com/questions/866962/why-does-virtualbox-only-have-32-bit-option-no-64-bit-option-on-windows-7>

===

In short,

- Go to BIOS, and enable certain settings
- Create a virtual machine, with multiple cores and enable I/O APIC