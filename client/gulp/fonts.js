"use strict";

const gulp = require("gulp");
const combine = require("stream-combiner2").obj;
const $ = require("gulp-load-plugins")();

module.exports =  (options) => {
    return () => {
        return combine( gulp.src(options.src.fonts), 
        gulp.dest(options.build.fonts))
    }
}