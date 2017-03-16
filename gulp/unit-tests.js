'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./config');
const argv = require("minimist")(process.argv.slice(2));
const karma = require('karma');

var pathSrcHtml = [
    "src/app/**/*.html",
];

var pathSrcJs = [
  "./src/app/**/!(*.html|*.spec|*.mock).js"
];
module.exports =  function(options){
    return function  (done) {
        var reporters = ["progress"];
        var preprocessors = {};

        pathSrcHtml.forEach(function(path) {
            preprocessors[path] = ["ng-html2js"];
        });

        if (options.singleRun) {
            pathSrcJs.forEach(function(path) {
                preprocessors[path] = ["coverage"];
            });
            reporters.push("coverage")
        }

        var localConfig = {
            configFile: path.resolve("./karma.conf.js"),
            singleRun: options.singleRun,
            autoWatch: !options.singleRun,
            reporters: reporters,
            preprocessors: preprocessors
        };

        var server = new karma.Server(localConfig, function(failCount) {
            done(failCount ? new Error("Failed " + failCount + " tests.") : null);
        })
        server.start();
    }
}
