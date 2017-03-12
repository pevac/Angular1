"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "imagemin-pngquant"]
});
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        return combine(gulp.src(options.path.src.img),
            $.changed(options.path.build.img),
            $.cache($.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [$.imageminPngquant()],
                interlaced: true
            })),
            gulp.dest(options.path.build.img),
            $.size({title: "images"})
        ).on("error", function(error){
            options.reportError.call(this, error, options.taskName);
        });
    }
}