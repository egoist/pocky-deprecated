const rollup = require('rollup')
const requireFromString = require('require-from-string')

module.exports = filepath => {
  return rollup.rollup({
    entry: filepath
  }).then(bundle => {
    const res = bundle.generate({
      format: 'cjs'
    })
    return requireFromString(res.code, filepath)
  })
}
