"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "imagemin-pngquant"]
});
const combine = require("stream-combiner2").obj;
const util = require("util");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
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
        ).on("error", (error) => {
            util.reportError.call(this, error, options.taskName);
        });
    }
}