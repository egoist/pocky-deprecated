#!/usr/bin/env node
const cac = require('cac')
const loudReject = require('loud-rejection')
const readRollupConfig = require('../lib/read-rollup-config')
const log = require('../lib/log')

loudReject()

function getOptions(input, flags) {
  return new Promise(resolve => {
    const entry = input[0] || 'index.js'
    const dest = flags.dest || 'pocky-bundle.js'

    const options = {
      rollupConfig: {
        entry,
        dest,
        format: 'cjs',
        plugins: [
          require('rollup-plugin-babel')({
            exclude: 'node_modules/**',
            presets: [require.resolve('babel-preset-pocky')]
          })
        ]
      }
    }

    if (typeof flags.rollupConfig === 'string') {
      resolve(readRollupConfig(flags.rollupConfig).then(config => {
        Object.assign(options.rollupConfig, config)
        return options
      }))
    }

    resolve(options)
  })
}

const cli = cac()

cli.command(
    '*',
    'Run app in watch mode',
    (input, flags) => {
      getOptions(input, flags).then(options => {
        require('./watch')(options)
      })
    }
  )

cli.command(
    'build',
    'Build app',
    (input, flags) => {
      getOptions(input, flags).then(options => {
        return require('./build')(options)
          .then(() => {
            log.success(`Bundle has been generated to ${options.rollupConfig.dest}`)
          })
      })
    }
  )

cli
  .option('rollup-config', {
    desc: 'Path to custom rollup config file'
  })
  .option('dest', {
    desc: 'Path to dest file',
    alias: 'd'
  })

cli.parse()
