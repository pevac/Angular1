"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        var appScriptSources = combine(gulp.src([options.path.build.app + "/**/*.js"]),
                             $.ignore.exclude(options.path.build.script  +"/vendor.js"),
                             $.angularFilesort()).on("error", function(error){
                                error.taskName = options.taskName;
                                options.reportError.call(this, error);
                            });

             
        var otherSources = gulp.src(["/" +"vendor.js", options.path.build.styles + "/*.css"], {read: false});
        var sources = $.merge(otherSources, appScriptSources);
        return combine(gulp.src(options.path.src.html),
            $.inject(sources, { ignorePath:"../build/", relative : true }),
            $.if(RELEASE, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            })),
            gulp.dest(options.path.build.html),
            $.size({title: "index"})
        )
    }
}