const fs = require('fs')
const path = require('path')

const Ajv = require('ajv')
const yaml = require('js-yaml')
const dotProp = require('dot-prop')

let config = {}
if (fs.existsSync(path.join(process.env.ROOT, 'config.yaml'))) {
  config = yaml.safeLoad(
    fs.readFileSync(path.join(process.env.ROOT, 'config.yaml'), 'utf8'), yaml.JSON_SCHEMA)
}

const pkg = require(process.env.PKG)

config.title = config.title || dotProp.get(pkg, 'blog.title') || pkg.title || pkg.name
config.description = config.description || dotProp.get(pkg, 'blog.description') || pkg.description

const ajv = new Ajv()
const valid = ajv.validate({
  $schema: 'http://json-schema.org/schema#',
  $id: 'config',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
  },
}, config)

if (!valid) {
  console.error(ajv.errors)
  process.exit(1)
}

module.exports = config
