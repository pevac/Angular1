"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const path = require("path");

module.exports =  (options) => {
    return () => {
        $.watch([options.path.watch.html], (event, cb) => {
            gulp.start("inject");
        });

        $.watch([options.path.watch.app])
            .on("unlink", (filePath) => {
                delete $.cached.caches["eslint"][path.resolve(filePath)];
                $.remember.forget("eslint", path.resolve(filePath));
                gulp.start("inject:build");
            })
            .on("add", (filePath) => {
                gulp.start("inject:build");
            })
            .on("change", (filePath) => {
                gulp.start("eslint");
            });

        $.watch([options.path.watch.styles], (event, cb) => {
            gulp.start("sass:build");
        })

        // $.watch([options.path.watch.fonts], (event, cb) => {
        //     gulp.start("fonts:build");
        // });

        // $.watch([options.path.watch.img], (event, cb) => {
        //     gulp.start("image:build");
        // });
    }
}