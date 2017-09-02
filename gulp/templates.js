"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const util = require("util");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
       return combine(gulp.src(options.src.templates),
            $.if(RELEASE, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                removeEmptyAttributes:true
            })),
            $.angularTemplatecache(options.build.templates.name, {
                module : options.build.templates.module, 
                root : options.build.templates.rootPath
            }),
            $.if(RELEASE, combine($.rename({suffix: ".min", extname: ".js" }), $.rev() )),
            gulp.dest(options.build.templates.dir),
            $.size({title: "templates"})
        ).on("error", (error) => {
            util.reportError.call(this, error, options.taskName);
        });
    }
}