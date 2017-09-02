"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const path = require("path");
const browserSync = require("browser-sync");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
         (done) => {
            var params = process.argv;
            var args = params.length > 3 ? [params[3], params[4]] : [];
          
            gulp.src(path.join("e2e", "/**/*.js"))
              .pipe($.protractor.protractor({
                configFile: "protractor.conf.js",
                args: args
              }))
              .on("error", function (err) {
                throw err;
              })
              .on("end", function () {
                browserSync.exit();
                done();
              });
          }
    }
}

