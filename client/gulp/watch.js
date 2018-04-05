"use strict";

module.exports =  (options, $) => {
    return () => {
        $.watch([options.watch.html], (event, cb) => {
            $.gulp.start("html:build");
        });

        $.watch([options.watch.templates], (event, cb) => {
            $.gulp.start("templates:build");
        });
        $.watch([options.watch.app], (event, cb) => {
            $.gulp.start("app:build");
        }).on("unlink", (filePath) => {
            delete $.cached.caches["eslint"][$.path.resolve(filePath)];
            $.remember.forget("eslint",$.path.resolve(filePath));
        });
        $.watch([options.watch.vendor], (event, cb) => {
            $.gulp.start("vendor:build" );
        });
    
        $.watch([options.watch.styles], (event, cb) => {
            $.gulp.start("styles:build");
        })

        $.watch([options.watch.fonts], (event, cb) => {
            $.gulp.start("fonts:build");
        });

        $.watch([options.watch.img], (event, cb) => {
            $.gulp.start("image:build");
        });
    }
}