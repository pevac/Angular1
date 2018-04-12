"use strict";

module.exports =  (options, $) => {
    const argv = $.minimist(process.argv.slice(2));
    const RELEASE = !!argv.release;
    const VISUALIZER = !!argv.visualizer;

    return (done) => {
       return $.combine($.gulp.src(options.src.templates),
            $.removeCode({ visualizer: VISUALIZER, production: RELEASE }),
            $.if(RELEASE || options.build.root == ".tmp", $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                removeEmptyAttributes:true
            })),
            $.angularTemplatecache(options.build.templates.name, {
                module : options.build.templates.module, 
                root : options.build.templates.rootPath
            }),
            $.if(RELEASE, $.combine($.rename({suffix: ".min", extname: ".js" }), $.rev() )),
            $.gulp.dest(options.build.templates.dir),
            $.size({title: "templates"})
        ).on("error", (error) => {
            $.util.reportError.call(this, error, options.taskName);
        });
    }
}