"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        return combine( gulp.src(options.path.src.styles),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.sass(),
            $.autoprefixer({browsers: options.AUTOPREFIXER_BROWSERS}),
            $.if(RELEASE, $.cssmin()),
            $.if(RELEASE, combine( $.rename({suffix: ".min", extname: ".css" }),  $.rev())),
            $.if(!RELEASE, $.sourcemaps.write({sourceRoot: "./src/sass"})),
            gulp.dest(options.path.build.styles),
            $.size({title: "styles"}),
            $.if(RELEASE, combine($.rev.manifest("css.json"), gulp.dest("./manifest") ))
        ).on("error", options.reportError)
    }
}