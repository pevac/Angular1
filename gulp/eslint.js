"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const browserSync = require("browser-sync");
const combine = require("stream-combiner2").obj;
const path = require("path");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        return combine( gulp.src(options.path.src.app),
            $.cached("eslint"),
            $.eslint(),
            $.eslint.format(),
            $.eslint.result((result) => {
			    if (result.warningCount > 0 || result.errorCount > 0) {
				    delete $.cached.caches.eslint[path.resolve(result.filePath)]
			    }
		    }),
            $.eslint.failAfterError(),
            $.remember("eslint")
        ).on("error", function (error)  {
                $.notify({
                    title: "Task Failed " + options.taskName,
                    message: "-- " + "See console.",
                    sound: false
                }).write(error);
                this.emit("end");
            })
    }
}

