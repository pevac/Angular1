"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const path = require("path");

module.exports =  (options) => {
    return () => {
        $.watch([options.watch.html], (event, cb) => {
            gulp.start("inject");
        });

        $.watch([options.watch.app])
            .on("unlink", (filePath) => {
                delete $.cached.caches["eslint"][path.resolve(filePath)];
                $.remember.forget("eslint", path.resolve(filePath));
                gulp.start("inject");
            })
            .on("add", (filePath) => {
                gulp.start("inject");
            })
            .on("change", (filePath) => {
                gulp.start("eslint");
            });

        $.watch([options.watch.vendor])
            .on("change", (filePath) => {
                gulp.start("inject");
            });

        $.watch([options.watch.styles], (event, cb) => {
            gulp.start("sass:build");
        })
    }
}