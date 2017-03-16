"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
       return combine(gulp.src(options.path.src.templates),
            $.if(RELEASE, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                removeEmptyAttributes:true
            })),
            $.angularTemplatecache(options.path.build.templates.name, {
                module : options.path.build.templates.module, 
                root : options.path.build.templates.rootPath
            }),
            $.if(RELEASE, combine($.rename({suffix: ".min", extname: ".js" }), $.rev() )),
            gulp.dest(options.path.build.templates.dir),
            $.size({title: "templates"}),
            $.if(RELEASE, combine($.rev.manifest("templateCacheHtml.json"), gulp.dest("./manifest") ))
        ).on("error", function(error){
            options.reportError.call(this, error, options.taskName);
        });
    }
}