'use strict';

const conf = require('./config');
const argv = require("minimist")(process.argv.slice(2));
const karma = require('karma');

let pathSrcHtml = [
    "src/app/**/*.html",
];

let pathSrcJs = [
  "./src/app/**/!(*.html|*.spec|*.mock).js"
];
module.exports =  (options, $) => {
    return   (done) => {
        let reporters = ["progress"];
        let preprocessors = {};

        pathSrcHtml.forEach((path) => {
            preprocessors[path] = ["ng-html2js"];
        });

        if (options.singleRun) {
            pathSrcJs.forEach((path) => {
                preprocessors[path] = ["coverage"];
            });
            reporters.push("coverage")
        }

        let localConfig = {
            configFile: $.path.resolve("./karma.conf.js"),
            singleRun: options.singleRun,
            autoWatch: !options.singleRun,
            reporters: reporters,
            preprocessors: preprocessors
        };

        let server = new karma.Server(localConfig, (failCount) => {
            done(failCount ? new Error("Failed " + failCount + " tests.") : null);
        })
        
        server.start();
    }
}
