"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();


module.exports =  function(options){
    return function(){
        $.watch([options.path.watch.index], function(event, cb) {
            gulp.start("index:build");
        });

        $.watch([options.path.watch.templates], function(event, cb) {
            gulp.start("templates:build");
        });
    
        $.watch([options.path.watch.styles], function(event, cb) {
            gulp.start("sass:build");
        });

        $.watch([options.path.watch.script], function(event, cb) {
            gulp.start("script:build");
        });

        $.watch([options.path.watch.fonts], function(event, cb) {
            gulp.start("fonts:build");
        });

        $.watch([options.path.watch.img], function(event, cb) {
            gulp.start("image:build");
        });
    }
}