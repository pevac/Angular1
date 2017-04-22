"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        var appScriptSources = combine(gulp.src([options.path.build.app + "/**/*.js", "!"+options.path.build.app +"/vendor.js"]),
                             $.angularFilesort()).on("error", (error) => {
                                error.taskName = options.taskName;
                                options.reportError.call(this, error);
                            });

        var appInjectOptions = {
            starttag: "<!-- inject:app -->",
            ignorePath: "../build/",
            addRootSlash: false,
            relative : true
        };
             
        var otherSources = gulp.src([options.path.build.app  +"/vendor.js", options.path.build.styles + "/*.css"], {read: false});
        return combine(gulp.src(options.path.src.html),
            $.inject(appScriptSources, appInjectOptions),
            $.inject(otherSources, { ignorePath:"../build/", relative : true }),
            $.if(RELEASE, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            })),
            gulp.dest(options.path.build.html),
            $.size({title: "index"})
        ).on("error", (error) => {
            options.reportError.call(this, error, options.taskName);
        });
    }
}


 