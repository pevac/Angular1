"use strict";

module.exports =  (options, $) => {
    const argv = $.minimist(process.argv.slice(2));
    const RELEASE = !!argv.release;
    const VISUALIZER = !!!argv.visualizer;

    return () => {
        const partialsInjectFile = $.gulp.src(`${options.src.templates.dir}/*.js`, { read: false });
        const partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            addRootSlash: false,
            relative : true
        };

       return $.combine($.gulp.src(`${options.src.index}/index.html`),
            $.inject(partialsInjectFile, partialsInjectOptions),
            $.useref(),
            $.removeCode({ visualizer: VISUALIZER, production: RELEASE }),
            $.if("*.js", $.combine($.ngAnnotate(),$.uglify({ preserveComments: $.uglifySaveLicense }), $.rename({suffix: ".min", extname: ".js" }), $.rev())),
            $.if("*.css", $.combine( 
                                    $.replace("../node_modules/bootstrap-sass/assets/fonts/bootstrap/", "../assets/fonts/bootstrap/"),
                                     $.cssnano(), 
                                     $.rename({suffix: ".min", extname: ".css" }),  
                                     $.rev())),
            $.revReplace({modifyUnreved: function replaceJsIfMap(filename) {
                                            if (filename.indexOf(".min") > -1) {
                                                return filename.replace(".min", "");
                                            }
                                            return filename;
                                        }
                                }),
            $.if("*.html", $.combine( 
                $.htmlmin({
                    removeEmptyAttributes: true,
                    removeAttributeQuotes: true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true
                })
            )),
            $.gulp.dest(options.build.html),
            $.size({ title: "dist", showFiles: true })
        ).on("error", function (error)  {
            $.util.reportError.apply(this, [error, options.taskName]);
        });
    }
}