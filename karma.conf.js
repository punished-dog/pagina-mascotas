module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: [
      'src/**/*.spec.js',
      { pattern: 'public/fotos/*.png', included: false, served: true, watched: false },
    ],
    proxies: {
      '/fotos/': '/base/public/fotos/',
    },
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [['istanbul', { exclude: ['src/**/*.spec.js', 'src/tests/**'] }]],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'] },
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text', subdir: '.', file: 'cobertura.txt' },
        { type: 'text-summary' },
      ],
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
