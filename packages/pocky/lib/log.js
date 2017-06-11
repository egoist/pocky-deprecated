const chalk = require('chalk')

exports.info = (...msg) => {
  console.log(chalk.cyan('>'), ...msg)
}

exports.error = (...msg) => {
  console.error(chalk.red('>'), ...msg)
}

exports.success = (...msg) => {
  console.error(chalk.green('>'), ...msg)
}
