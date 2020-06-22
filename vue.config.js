module.exports = {
  devServer: {
    port: 8181,
  },
  css: {
    loaderOptions: {
      sass: {
        // always import main.scss first
        data: '@import "@/styles/main.scss";',
      },
    },
  },
  parallel: !process.env.NODE_ENV === 'production',
};
