# non-root-gatsby-blog

An attempt to create a [Gatsby](https://www.gatsbyjs.org/) blog as a part of Monorepo, with [/data](/data) and `/dist` (output-dir) directories sticking out, instead of being inside [the Gatsby repo](/packages/gatsby-blog-cli).

I also created this from scratch, partly by following <https://www.freecodecamp.org/news/build-a-developer-blog-from-scratch-with-gatsby-and-mdx/>

For tutorials, see [/docs/tutorials](/docs/tutorials).

## Background

Actually, I have already created this kind of blog/cli concept with [Nuxt](https://github.com/patarapolw/blog) and [Vue](https://github.com/patarapolw/git-publisher), but I am [starting to dislike `*.vue` and starting to love `*.tsx`](https://dev.to/patarapolw/a-guide-to-using-typescript-in-vue-with-maximal-vscode-intellisense-2db2) -- so, I am giving React another chance. (Also knowing that [Preact](https://preactjs.com/) is smaller and almost as performant as Vue.)

I have also tried [Gridsome](https://gridsome.org/), which is in many ways similar to Gatsby, in the sense of GraphQL -- but not equally well supported, though...

## Requirements

- Write blog posts using Markdown with YAML front-matter -- passed
- Markdown must be customizable -- [passed](https://using-remark.gatsbyjs.org/custom-components/)
- Customizable excerpt, instead of always cut at 140 chars -- [passed](https://using-remark.gatsbyjs.org/custom-separator/)
- Searchable, using a search bar, that is `/post?q=<SEARCH_STRING>` works -- might fail, but I will try
- Recent posts' view -- obviously passed
- Hidden posts, but viewable, if you have a link -- passed, probably with `hidden: true` or `published: false` in YAML front matter
- Recent posts mean `< Date.now()`. All posts in the future must be hidden, but will auto-show when the time comes -- passed, as long as I create it myself, unlike [Jekyll](https://jekyllrb.com/)
- Custom page type, e.g. [Reveal-md](https://github.com/patarapolw/reveal-md) -- should pass, as I create this myself

## Why

- Gatsby should be fast. Also SEO optimized with [some additional settings](https://www.gatsbyjs.org/docs/add-seo-component/), or perhaps with [Helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/)
  - It's more than SEO, really. I also need a correct preview on Facebook / Twitter / Discord.
- To write a blog while seeing Gatsby's folder structure is a turn off. Seeing only `/data` is so focused mode.
- Sharing themed blog is easy, because it is just a part of the monorepo. Writing `.gitignore` is easy as well.
- I can always author subpackages, like, probably, a newer version of [q2filter](https://github.com/patarapolw/q2filter). Testing is easier than ever with a monorepo.

## First impressions

- GraphQL is magical.
  - Much is already done by Gatsby and plugin creators. (Unlike Gridsome)
  - I can always play with queries in the browser. (Not sure if it is the case with Gridsome)
- React have gotten simpler by [Function Components](https://reactjs.org/docs/components-and-props.html) and [React hooks](https://reactjs.org/docs/hooks-intro.html).
- I will probably use [`@emotion/core`](https://github.com/emotion-js/emotion). Have tested it is another repo.
- Many more VSCode plugins are needed/helpful,
  - GraphQL
  - Highlight Matching Tag
  - lit-html
  - Styled components
