---
title: Git workflow in VS Code
date: 2019-07-16
image: https://miro.medium.com/max/910/1*BCZkmZR1_YzDZy22Vn4uUw.png
tag:
  - vscode
  - git
  - GitHub
  - pinned
---

I am talking about `git branch` and `git worktree add`; and also, `git merge` on GitHub website.

<!-- excerpt_separator -->

Branching in VS Code is as easy as click and type. The option in on the lower left corner.

For `git worktree`, see <https://stackoverflow.com/questions/45491328/git-add-a-worktree-from-existing-remote-branch>

It's `git worktree add ../branch`

After you have done a working set on either, a branch, or a worktree; you proceed to `git add .`, `git commit -m "update"`, `git push origin <BRANCH>`.

Then, you merge on GitHub website.

After than, `git pull origin master` in VS Code.


