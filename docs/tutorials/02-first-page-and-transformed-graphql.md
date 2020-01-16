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
