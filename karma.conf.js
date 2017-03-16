"use strict";

const path = require("path");
const vendor = require("./vendor");

var pathSrcHtml = [
  "src/app/**/*.html",
  "src/*.html"
];

function listFiles() {

  var patterns = vendor
    .concat([
      "./src/assets/lib/angular-mocks/angular-mocks.js",
      "./src/app/**/*.module.js",
      "./src/app/**/*.js",
      "./src/app/**/*.spec.js"
    ])
    .concat(pathSrcHtml);

  var files = patterns.map(function(pattern) {
    return {
      pattern: pattern
    };
  });
 
  return files;
}

module.exports = function(config) {
  var  configuration ={

    basePath: "",

    files: listFiles(),

    exclude: ["./src/assets/lib"],

    frameworks: ["phantomjs-shim", "jasmine", "angular-filesort"],

    angularFilesort: {
      whitelist: ["./src/app/**/!(*.html|*.spec|*.mock).js"]
    },

    ngHtml2JsPreprocessor: {
      moduleName: "appModule"
    },

    plugins : [
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-ie-launcher",
      "karma-opera-launcher",
      "karma-safari-launcher",
      "karma-phantomjs-launcher",
      "karma-phantomjs-shim",
      "karma-angular-filesort",
      "karma-ng-html2js-preprocessor",
      "karma-jasmine",
      "karma-coverage",
      "karma-eslint"
    ],

    preprocessors: {
      "./src/app/**/*.js": ["eslint"]
    },

    coverageReporter: {
      type : "html",
      dir : "coverage/"
    },

    reporters: ["progress"],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    browsers : ["PhantomJS","Chrome"],

    singleRun: false,

    autoWatch: true,

    concurrency: Infinity
  }

  configuration.preprocessors = {};
  pathSrcHtml.forEach(function(path) {
      configuration.preprocessors[path] = ["ng-html2js"];
  });

   if(configuration.browsers[0] === "Chrome" && process.env.TRAVIS) {
      configuration.customLaunchers = {
        "chrome-travis-ci": {
          base: "Chrome",
          flags: ["--no-sandbox"]
        }
      };
      configuration.browsers = ["chrome-travis-ci"];
  }

  config.set(configuration);

}


