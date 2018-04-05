"use strict";
    
module.exports =  (options, $) => {
    const argv = $.minimist(process.argv.slice(2));
    const RELEASE = !!argv.release;
    const VISUALIZER = !!!argv.visualizer;

    return () => {
        const appScriptSources = combine($.gulp.src([`${options.build.app}/app.js`, `!${options.build.vendor}/vendor.js`]),
                             $.angularFilesort()).on("error", (error) => {
                                error.taskName = options.taskName;
                                $.util.reportError.call(this, error);
                            });
        const appInjectOptions = {
            starttag: "<!-- inject:app -->",
            ignorePath: `../${options.build.root}`,
            addRootSlash: false,
            relative : true
        };

        const vendorScriptSources = $.gulp.src(`${options.build.vendor}/vendor.js`, {read: false})
        const vendorInjectOptions = {
            starttag: "<!-- inject:vendor -->",
            ignorePath: `../${options.build.root}`,
            addRootSlash: false,
            relative : true
        };

        const partialsInjectFile = $.gulp.src(`${options.build.templates.dir}/${options.build.templates.name}`, { read: false });
        const partialsInjectOptions = {
          starttag: '<!-- inject:partials -->',
          ignorePath: `../${options.build.root}`,
          addRootSlash: false,
          relative : true
        };

        const otherSources = $.gulp.src(`${options.build.styles}/main.css`, {read: false});
        const otherSourcesOptions = { 
            ignorePath: `../${options.build.root}`,
            addRootSlash: false,
            relative : true 
        }

        return $.combine($.gulp.src(options.src.html),
            $.inject(appScriptSources, appInjectOptions),
            $.inject(vendorScriptSources, vendorInjectOptions),
            $.inject(partialsInjectFile, partialsInjectOptions),
            $.inject(otherSources, otherSourcesOptions),
            $.removeCode({ visualizer: VISUALIZER }),
            $.if(RELEASE, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            })),
            $.gulp.dest(options.build.html),
            $.size({title: "index"})
        ).on("error", (error) => {
            $.util.reportError.call(this, error, options.taskName);
        });
    }
}


 