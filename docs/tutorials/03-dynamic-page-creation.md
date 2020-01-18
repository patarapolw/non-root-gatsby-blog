# 03 - Dynamic Page Creation

Apparently, everything a blog requires, is dynamic page creation. The official tutorial is here. -- <https://www.gatsbyjs.org/tutorial/part-seven/>

## How I did it

- Firstly, I moved `/src/pages/index.tsx` to [/src/templates/Listing.tsx](/packages/gatsby-blog-cli/src/templates/Listing.tsx). Basically, I am gonna use it for template.
- I also created [/src/templates/Post.tsx](/packages/gatsby-blog-cli/src/templates/Post.tsx) to use to create posts.
- There are two magics on [gatsby-node.js](/packages/gatsby-blog-cli/gatsby-node.js) for this,
  - `exports.createPages`
  - `exports.onCreateNode`
- You should inspect what `slug` entails, in case you want to customize it.

```js
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/page/${i + 1}`,
      component: path.resolve('./src/templates/Listing.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
      },
    })
  })

  posts.forEach((p) => {
    createPage({
      path: `/posts${p.node.fields.slug}`,
      component: path.resolve('./src/templates/Post.tsx'),
      context: {
        slug: p.node.fields.slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}
```

## Bonus

I am also trying to find out how to lazy load images and and iframes. I ended up using

- [lazysizes](https://github.com/aFarkas/lazysizes)
  - This allow lazyloading inside components as well.
- [gatsby-remark-lazy-load](https://www.gatsbyjs.org/packages/gatsby-remark-lazy-load) along with [gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/)
  - These will transform `![]()` to lazyloading.
