"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const path = require("path");

module.exports =  (options) => {
    return () => {
        $.watch([options.path.watch.html], (event, cb) => {
            gulp.start("html:build");
        });

        $.watch([options.path.watch.templates], (event, cb) => {
            gulp.start("templates:build");
        });
    
        $.watch([options.path.watch.styles], (event, cb) => {
            gulp.start("sass:build");
        });

        $.watch([options.path.watch.app], (event, cb) => {
            gulp.start("app:build");
        }).on("unlink", (filePath) => {
            delete $.cached.caches["eslint"][path.resolve(filePath)];
            $.remember.forget("eslint", path.resolve(filePath));
        });

        $.watch([options.path.watch.fonts], (event, cb) => {
            gulp.start("fonts:build");
        });

        $.watch([options.path.watch.img], (event, cb) => {
            gulp.start("image:build");
        });

        $.watch([options.path.watch.vendor], (event, cb) => {
            gulp.start("vendor:build" );
        });
    }
}