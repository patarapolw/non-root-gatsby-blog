#!/usr/bin/env node

const { spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const yargs = require('yargs')

const { argv } = yargs
  .option('root', {
    alias: 'r',
    default: process.cwd(),
  })
  .option('pkg', {
    alias: 'p',
    default: path.resolve(process.cwd(), 'package.json'),
  })

fs.writeFileSync(path.join(__dirname, '.cli-input.json'), JSON.stringify(argv))

spawnSync('yarn', ['start'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    ROOT: path.resolve(argv.root),
    PKG: path.resolve(argv.pkg),
  },
})
