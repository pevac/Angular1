"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', "uglify-save-license", "del"]
  });
const combine = require("stream-combiner2").obj;
const util = require("./util");

let RELEASE = !!argv.release;
let VISUALIZER = !!!argv.visualizer;

module.exports =  (options) => {
    return () => {
        var partialsInjectFile = gulp.src(`${options.src.templates.dir}/*.js`, { read: false });
        var partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            addRootSlash: false,
            relative : true
        };

       return combine(gulp.src(`${options.src.index}/index.html`),
            $.inject(partialsInjectFile, partialsInjectOptions),
            $.useref(),
            $.if("*.js", combine($.ngAnnotate(),$.uglify({ preserveComments: $.uglifySaveLicense }), $.rename({suffix: ".min", extname: ".js" }), $.rev())),
            $.if("*.css", combine( $.replace("../node_modules/bootstrap-sass/assets/fonts/bootstrap/", "../assets/fonts/bootstrap/"),
                                     $.cssnano(), $.rename({suffix: ".min", extname: ".css" }),  $.rev())),
                                     
            $.revReplace({modifyUnreved: function replaceJsIfMap(filename) {
                                            if (filename.indexOf(".min") > -1) {
                                                return filename.replace(".min", "");
                                            }
                                            return filename;
                                        }
                                }),
            $.if("*.html", combine( $.removeCode({ visualizer: VISUALIZER }),
                $.htmlmin({
                removeEmptyAttributes: true,
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }))),
            gulp.dest(options.build.html),
            $.size({ title: "dist", showFiles: true })
        ).on("error", function (error)  {
            util.reportError.apply(this, [error, options.taskName]);
        });
    }
}