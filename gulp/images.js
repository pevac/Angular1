"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const pngquant = require('imagemin-pngquant');

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        return combine(gulp.src(options.path.src.img),
            $.changed(options.path.build.img),
            $.cache($.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()],
                interlaced: true
            })),
            gulp.dest(options.path.build.img),
            $.size({title: "images"})
        ).on("error", options.reportError)
    }
}