const { execSync } = require('child_process')
const path = require('path')

const yaml = require('js-yaml')

const siteMetadata = require('./config')

const repoUrl = execSync('git config --get remote.origin.url', {
  cwd: path.dirname(process.env.PKG),
}).toString()

module.exports = {
  pathPrefix: repoUrl ? `/${repoUrl.trim().match(/([^/]+)\.git$/)[1]}` : '/',
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
  ],
}
