"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const path = require("path");

module.exports =  function(options){
    return function(){
        $.watch([options.path.watch.html], function(event, cb) {
            gulp.start("html:build");
        });

        $.watch([options.path.watch.templates], function(event, cb) {
            gulp.start("templates:build");
        });
    
        $.watch([options.path.watch.styles], function(event, cb) {
            gulp.start("sass:build");
        });

        $.watch([options.path.watch.app], function(event, cb) {
            gulp.start("app:build");
        }).on("unlink", function(filePath){
            delete $.cached.caches["eslint"][path.resolve(filePath)];
            $.remember.forget("eslint", path.resolve(filePath));
        });

        $.watch([options.path.watch.fonts], function(event, cb) {
            gulp.start("fonts:build");
        });

        $.watch([options.path.watch.img], function(event, cb) {
            gulp.start("image:build");
        });

        $.watch([options.path.watch.vendor], function(event, cb) {
            gulp.start("vendor:build" );
        });
    }
}