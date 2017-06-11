module.exports = {
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        modules: false,
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [require.resolve('babel-plugin-transform-object-rest-spread')]
}
