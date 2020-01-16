# 02 - First Page and Transformed GraphQL Query

When I play with GraphQL, I realize that my `frontmatter.date` is actually a custom format.

- Sometimes `2019-01-01`
- Sometimes `2019-01-01 01:00` (which in non-UTC)
- Sometimes `2020-01-16T12:40:18.101Z`

So, it is hard to query using

```gql
allMarkdownRemark(
  sort: {fields: frontmatter___date, order: DESC},
  filter: {frontmatter___date: {lt: ${new Date().toISOString()}}},
  limit: 5
)
```

Also, another problem is GraphQL template string [doesn't allow string interpolation](https://github.com/gatsbyjs/gatsby/issues/17159).

So, what is the solution?

<https://www.gatsbyjs.org/docs/schema-customization/>

Now, I need [gatsby-node.js](/packages/gatsby-blog-cli/gatsby-node.js).

- Convert custom date string to Epoch using Moment.js.

```js
  let m = moment(dateString, [
    'YYYY-MM-DD HH:MM ZZ',
    'YYYY-MM-DD ZZ',
    'YYYY-MM-DD HH:MM',
    'YYYY-MM-DD',
  ])
```

- Creating custom fields

```js
exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: 'MarkdownRemark',
      interfaces: ['Node'],
      fields: {
        correctedDateEpoch: {
          type: 'Float',
          resolve: (s) => customDateStringToEpoch(s.frontmatter.date),
        },
        isPast: {
          type: 'Boolean!',
          /**
           * `s.correctedDateEpoch` failed, no matter how I tried
           */
          resolve: (s) => {
            const epoch = customDateStringToEpoch(s.frontmatter.date)
            return epoch ? epoch < now : false
          },
        },
      },
    }),
  ])
}
```

Now, now, I have one more problem, [YAML front matter sometimes convert Date String without quotes to Date object](https://github.com/jonschlinkert/gray-matter/issues/62). This is also solvable by setting [`gray-matter`'s `options.engines.yaml`](https://github.com/jonschlinkert/gray-matter#optionsengines) -- which is also settable in `gatsby-transformer-remark`

[gatsby-config.js](/packages/gatsby-blog-cli/gatsby-config.js)

```js
const yaml = require('js-yaml')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        engines: {
          yaml: {
            parse: (s) => yaml.safeLoad(s, {
              schema: yaml.JSON_SCHEMA,
            }),
          },
        },
      },
    },
  ]
}
```

Actually, I have also created [src/pages/index.jsx](/packages/gatsby-blog-cli/src/pages/index.jsx) but it isn't really magic.

## Bonus

I replace [gatsby-plugin-static-folders](https://www.gatsbyjs.org/packages/gatsby-plugin-static-folders/) with

```js
// gatsby-node.js

exports.onPostBuild = () => {
  rimraf.sync(
    path.join(process.env.ROOT, 'dist'),
  )
  fs.copySync(
    path.join(__dirname, 'public'),
    path.join(process.env.ROOT, 'dist'),
  )
  fs.copySync(
    path.join(process.env.ROOT, 'media'),
    path.join(process.env.ROOT, 'dist/media'),
  )
}

exports.onCreateDevServer = ({ app }) => {
  app.use('/media', require('express').static(path.join(process.env.ROOT, 'media')))
}
```

And also deleted `postbuild.js`.

I found the original source code for `gatsby-plugin-static-folders` here -- <https://github.com/imdaveead/plugins/tree/master/gatsby-plugin-static-folders>.

## Next Episode

I will attempt dynamic page creation, with [fallback to `404.html`](https://help.github.com/en/github/working-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site) or `200.html` next time.
