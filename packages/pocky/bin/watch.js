const path = require('path')
const nodemon = require('nodemon')
const rollup = require('rollup')
const watch = require('rollup-watch')
const log = require('../lib/log')

process.on('SIGINT', process.exit)

module.exports = function (options) {
  const { rollupConfig } = options
  const watcher = watch(rollup, rollupConfig)
  const script = path.resolve(rollupConfig.dest)

  let started
  watcher.on('event', event => {
    switch (event.code) {
      // eslint-disable-next-line no-warning-comments
      case 'STARTING': // TODO this isn't emitted by newer versions of rollup-watch
        log.info('checking rollup-watch version')
        break

      case 'BUILD_START':
        clear()
        log.info('Bundling')
        break

      case 'BUILD_END':
        log.success('Bundled in ' + event.duration + 'ms. Watching for changes')
        if (!started) {
          started = true
          run(script)
        }
        break

      case 'ERROR':
        handleError(event.error)
        break

      default:
        log.error('unknown event', event)
    }
  })
}

function run(script) {
  nodemon({
    script,
    ext: 'js json',
    watch: script
  })
}

function clear() {
  process.stdout.write('\x1Bc')
}

function handleError(err) {
  log.error(err.stack)
  process.exitCode = 1
}
