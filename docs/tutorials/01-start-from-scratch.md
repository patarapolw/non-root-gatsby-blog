# 01 Start from Scratch

- `lerna init` + `eslint --init` at root and install ESLint settings at root, to avoid cluttering subpackages.
- `mkdir packages/gatsby-blog-cli && cd packages/gatsby-blog-cli && yarn init -y`
- Minimal packages for Gatsby are
  - React
  - React-dom
  - Gatsby
- Minimal packages for Blog are
  - gatsby-source-filesystem
  - gatsby-transformer-remark
- Packages for externalizing `/data` and `/media` are
  - gatsby-plugin-static-folders
  - fs-extra
- By default, Gatsby cannot yet choose output folder [[issue]](https://github.com/gatsbyjs/gatsby/issues/1878), must be solved with a [postbuild script](/packages/gatsby-blog-cli/postbuild.js).
- Creating [cli.js](/packages/gatsby-blog-cli/cli.js) is quite simple. Don't forget to add `"bin"` to [package.json](/packages/gatsby-blog-cli/package.json)

```json
{
  "bin": {
    "blog": "cli.js"
  },
}
```

- Reading an external `config.yaml` is quite complex, as it might need validation. See [/packages/gatsby-blog-cli/config.js](/packages/gatsby-blog-cli/config.js)
- Create `gatsby-config.js`

```js
const siteMetadata = require('./config')

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- excerpt_separator -->',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${process.env.ROOT}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${process.env.ROOT}/hidden`,
        name: 'hidden',
      },
    },
    {
      resolve: 'gatsby-plugin-static-folders',
      options: {
        folders: [
          `${process.env.ROOT}/media`,
        ],
      },
    },
  ],
}
```

- `yarn install` to link CLI script to workspace.
- Now, test running GraphQL by going to `/__graphql` in the browser.
