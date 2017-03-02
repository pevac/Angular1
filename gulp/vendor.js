"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        return combine( gulp.src(options.path.src.script.vendor),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.concat("vendor.js"),
            $.if(RELEASE, combine($.uglify(), $.rename({suffix:".min", extname:".js"}), $.rev())),
            $.if(!RELEASE, $.sourcemaps.write("vendor")),
            gulp.dest(options.path.build.script),
            $.size({title: "vendor"}),
            $.if(RELEASE, combine($.rev.manifest("vendor.json"), gulp.dest("./manifest") ))
        )
    }
}