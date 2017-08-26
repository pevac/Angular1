"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const util = require("util");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        let appScriptSources = combine(gulp.src([`${options.path.build.app}/app.js`, `!${options.path.build.app}/vendor.js`]),
                             $.angularFilesort()).on("error", (error) => {
                                error.taskName = options.taskName;
                                options.reportError.call(this, error);
                            });
        const appInjectOptions = {
            starttag: "<!-- inject:app -->",
            ignorePath: `../${options.path.build.root}`,
            addRootSlash: false,
            relative : true
        };

        let vendorScriptSources = gulp.src(`${options.path.build.vendor}/vendor.js`, {read: false})
        const vendorInjectOptions = {
            starttag: "<!-- inject:vendor -->",
            ignorePath: `../${options.path.build.root}`,
            addRootSlash: false,
            relative : true
        };

        var partialsInjectFile = gulp.src(`${options.path.build.templates.dir}/${options.path.build.templates.name}`, { read: false });
        var partialsInjectOptions = {
          starttag: '<!-- inject:partials -->',
          ignorePath: `../${options.path.build.root}`,
          addRootSlash: false,
          relative : true
        };

        let otherSources = gulp.src(`${options.path.build.styles}/main.css`, {read: false});
        const otherSourcesOptions = { 
            ignorePath: `../${options.path.build.root}`,
            addRootSlash: false,
            relative : true 
        }

        return combine(gulp.src(options.path.src.html),
            $.inject(appScriptSources, appInjectOptions),
            $.inject(vendorScriptSources, vendorInjectOptions),
            $.inject(partialsInjectFile, partialsInjectOptions),
            $.inject(otherSources, otherSourcesOptions),
            $.removeCode({ production: RELEASE }),
            $.if(RELEASE, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            })),
            gulp.dest(options.path.build.html),
            $.size({title: "index"})
        ).on("error", (error) => {
            util.reportError.call(this, error, options.taskName);
        });
    }
}


 