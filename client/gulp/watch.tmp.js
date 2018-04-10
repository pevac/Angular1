"use strict";

module.exports =  (options, $) => {
    return (done) => {

        $.gulp.watch([options.watch.html], $.gulp.series("inject"));
        $.gulp.watch([options.watch.vendor], $.gulp.series("inject"));

        $.gulp.watch([options.watch.app])
            .on("unlink", (filePath) => {
                delete $.cached.caches["eslint"][$.path.resolve(filePath)];
                $.remember.forget("eslint", $.path.resolve(filePath));
                return $.gulp.series("inject")();
            })
            .on("add", (filePath) => {
                return $.gulp.series("inject")();
            })
            .on("change", (filePath) => {
                return $.gulp.series("eslint")();
            });

        $.gulp.watch([options.watch.styles], $.gulp.series("styles:tmp"));
    }
}