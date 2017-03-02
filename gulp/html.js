"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        var appScriptSources = combine(gulp.src([options.path.build.script + "/**/*.js"]),
                             $.ignore.exclude(options.path.build.script  +"/vendor.min.js"),
                             $.angularFilesort());
  
        var otherSources = gulp.src(["/" +"vendor.min.js", options.path.build.styles + "/*.css"], {read: false});
        var sources = $.merge(otherSources, appScriptSources);
        return combine(gulp.src(options.path.src.index),
            $.inject(sources, { ignorePath:"../build/", relative : true }),
            $.if(RELEASE, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            })),
            gulp.dest(options.path.build.index),
            $.size({title: "index"})
        ).on("error", options.reportError)
    }
}