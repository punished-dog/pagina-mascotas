module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "webpack"],
    files: [
      { pattern: "src/tests/**/*.spec.jsx", watched: false },
      { pattern: "public/fotos/*.png", watched: false, included: false, served: true }
    ],
    proxies: {
      "/fotos/": "/base/public/fotos/"
    },
    preprocessors: { "src/tests/**/*.spec.jsx": ["webpack"] },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            resolve: { fullySpecified: false },
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: "defaults" }],
                  ["@babel/preset-react", { runtime: "automatic" }]
                ],
                plugins: [["istanbul", { exclude: ["src/tests/**"] }]]
              }
            }
          }
        ]
      }
    },
    reporters: ["spec", "coverage"],
    specReporter: {
      suppressSkipped: true
    },
    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text", subdir: ".", file: "cobertura.txt" },
        { type: "json-summary", subdir: "." },
        { type: "text-summary" }
      ]
    },
    browsers: ["ChromeSinVentana"],
    customLaunchers: {
      ChromeSinVentana: { base: "ChromeHeadless", flags: ["--no-sandbox"] }
    },
    singleRun: true
  });
};
