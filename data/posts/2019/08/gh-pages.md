---
title: Publish static websites to GitHub Pages (or any Git) cleanly with gh-pages
date: 2019-08-17
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFKi5a1hzYykg3TJiYcMvOJa2mjhRwSXxX2LCRPC-TfoUIc5TB
tag:
  - gh-pages
  - GitHub Pages
  - heroku
---

This is as simple as `npm run build && gh-pages -d dist`, and there will be no pollution from build remnants. You can safely as `/dist/` to `.gitignore`.

The new branch called `gh-pages` will be created, with only built elements, no other code.

See the package here <https://www.npmjs.com/package/gh-pages>

===

To publish elsewhere, e.g. [Heroku](https://www.heroku.com/), it can be more complex. I resorted to a Node script, rather than CLI.

```js
const ghPages = require("gh-pages");
const fs = require("fs");
const {spawnSync} = require("child_process");
const rimraf = require("rimraf");

rimraf.sync("node_modules/gh-pages/.cache")

spawnSync("npm", ["run", "build"], {
  stdio: "inherit"
});

fs.writeFileSync("public/index.php", "<?php header( 'Location: /index.html' ) ;  ?>");

ghPages.publish("public", {
  branch: "master",
  repo: "https://git.heroku.com/<BLAHBLAH>.git"
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Posted to https://<BLAHBLAH>.herokuapp.com")
});

```

One of the reasons is that Heroku requires a buildpack. At least a PHP file (`index.php`) with `<?php header( 'Location: /index.html' ) ;  ?>` is sufficient to trigger this.

In reality, what I am using this for? -- <https://zhdiary.herokuapp.com>, with [Cogear.js](https://cogearjs.org/docs)
