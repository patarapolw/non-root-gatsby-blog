const yaml = require('js-yaml')

const siteMetadata = require('./config')

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '===',
        engines: {
          yaml: {
            parse: (s) => yaml.safeLoad(s, {
              schema: yaml.JSON_SCHEMA,
            }),
          },
        },
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
