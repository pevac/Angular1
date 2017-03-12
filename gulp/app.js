"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const path = require("path");


let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        return combine( gulp.src(options.path.src.app),
            $.cached("eslint"),
            $.eslint(),
            $.eslint.format(),
            $.eslint.failOnError(),
            $.eslint.result(function (result) {
			    if (result.warningCount > 0 || result.errorCount > 0) {
				    delete $.cached.caches.eslint[path.resolve(result.filePath)]
			    }
		    }),
            $.remember("eslint"),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.angularFilesort(),
            $.concat("app.js"),
            $.if(!RELEASE, $.sourcemaps.write("app")),
            $.if(RELEASE, combine($.ngAnnotate(), $.uglify(),  $.rename({suffix: ".min",extname: ".js"}), $.rev() )),
            gulp.dest(options.path.build.app),
            $.size({title: "app"}),
            $.if(RELEASE, combine($.rev.manifest("app.json"), gulp.dest("./manifest") ))
        ).on("error", function(error){
            options.reportError.call(this, error, options.taskName);
        })
    }
}

