const rollup = require('rollup')

module.exports = function(options) {
  const { rollupConfig } = options
  return rollup.rollup(rollupConfig).then(bundle => {
    return bundle.write(rollupConfig)
  })
}
