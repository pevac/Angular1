"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const combine = require("stream-combiner2").obj;
const $ = require("gulp-load-plugins")();

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        return combine( gulp.src(options.src.fonts), 
        // $.flatten(),
        gulp.dest(options.build.fonts))
    }
}