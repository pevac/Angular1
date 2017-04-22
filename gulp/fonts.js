"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        return combine( gulp.src(options.path.src.fonts), gulp.dest(options.path.build.fonts))
    }
}