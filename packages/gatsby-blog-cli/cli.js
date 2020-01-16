#!/usr/bin/env node

const { spawnSync } = require('child_process')
const path = require('path')

const yargs = require('yargs')
const ghPages = require('gh-pages')

const { argv } = yargs
  .option('root', {
    alias: 'r',
    default: process.cwd(),
  })
  .option('pkg', {
    alias: 'p',
    default: path.resolve(process.cwd(), 'package.json'),
  })
  .option('build', {
    alias: 'b',
    type: 'boolean',
  })
  .option('publish', {
    type: 'boolean',
  })

spawnSync('yarn', [
  (() => {
    if (argv.build || argv.publish) return 'build'
    return 'start'
  })(),
], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    ROOT: path.resolve(argv.root),
    PKG: path.resolve(argv.pkg),
  },
})

if (argv.publish) {
  ghPages.publish(path.join(argv.pkg, '../dist'), (err) => {
    if (err) {
      console.error(err)
      console.error('Not published')
    } else {
      console.log('Published')
    }
  })
}
