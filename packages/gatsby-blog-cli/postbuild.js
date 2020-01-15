const path = require('path')

const fs = require('fs-extra')

const argv = require('./cli-argv.json')

fs.copySync('public', path.resolve(argv.root, 'dist'))
