#!/usr/bin/env node
const path = require('path')
const yargs = require('yargs')
const loudReject = require('loud-rejection')
const pkg = require('../package')

loudReject()

const commands = new Set(['watch', 'build'])

function getOptions(argv) {
  const entry = commands.has(argv._[0]) ? argv._[1] : argv._[0]
  const options = {
    rollupConfig: {
      entry: entry || 'index.js',
      dest: argv.dest || 'pocky-bundle.js',
      format: 'cjs',
      plugins: [
        require('rollup-plugin-babel')({
          exclude: 'node_modules/**',
          presets: [require.resolve('babel-preset-pocky')]
        })
      ]
    }
  }

  if (argv.rollupConfig) {
    let rollupConfig = argv.rollupConfig
    if (typeof rollupConfig === 'string') {
      rollupConfig = require(path.resolve(rollupConfig))
      Object.assign(options.rollupConfig, rollupConfig)
    } else if (typeof rollupConfig === 'object') {
      Object.assign(options.rollupConfig, rollupConfig)
    } else if (typeof rollupConfig === 'function') {
      options.rollupConfig = rollupConfig(options.rollupConfig)
    }
  }

  return options
}

yargs
  .command(
    ['*', 'watch'],
    'Run app in watch mode',
    yargs => {},
    argv => {
      const options = getOptions(argv)
      require('./watch')(options)
    }
  )
  .command(
    'build',
    'Build app',
    yargs => {},
    argv => {
      const options = getOptions(argv)
      require('./build')(options)
    }
  )
  .option('rollup-config', {
    desc: 'Path to custom rollup config file'
  })
  .option('dest', {
    desc: 'Path to dest file',
    alias: 'd'
  })
  .example('pocky src/server.js -d dist/server-bundle.js')
  .alias('h', 'help')
  .alias('v', 'version')
  .version(pkg.version)
  .help().argv
