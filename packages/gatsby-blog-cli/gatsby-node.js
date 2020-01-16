const path = require('path')

const fs = require('fs-extra')
const rimraf = require('rimraf')
/**
 * I use `momentjs`, because `momentjs` is already included in Gatsby
 */
const moment = require('moment')

/**
 * By default, JavaScript timestamp is in milliseconds,
 *
 * but moment().unix() is in seconds
 */
const now = +new Date()

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

function customDateStringToEpoch (date) {
  if (!date) {
    return null
  }

  /**
   * Moment will default timezone to local if not specified, unlike Date.parse
   *
   * https://momentjs.com/docs/#/parsing/
   *
   * See #please-read
   */
  let m = moment(date, [
    'YYYY-MM-DD HH:MM ZZ',
    'YYYY-MM-DD ZZ',
    'YYYY-MM-DD HH:MM',
    'YYYY-MM-DD',
  ])

  if (m.isValid()) {
    /**
     * moment().unix() is in milliseconds
     */
    return m.unix() * 1000
  }

  m = moment(date)

  if (m.isValid()) {
    return m.unix() * 1000
  }

  return null
}
