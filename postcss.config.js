module.exports = {
  plugins: {
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions'],
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
  },
}
