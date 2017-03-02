"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        return combine( gulp.src(options.path.src.script.app),
        $.if(!RELEASE, $.sourcemaps.init()),
        $.angularFilesort(),
        $.concat("app.js"),
        $.if(RELEASE, combine($.ngAnnotate(), $.uglify(),  $.rename({suffix: ".min",extname: ".js"}), $.rev() )),
        $.if(!RELEASE, $.sourcemaps.write("app")),
        gulp.dest(options.path.build.script),
        $.size({title: "app"}),
        $.if(RELEASE, combine($.rev.manifest("app.json"), gulp.dest("./manifest") ))
    ).on("error", options.reportError)
    }
}