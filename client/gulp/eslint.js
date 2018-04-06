"use strict";

module.exports =  (options, $) => {
    return (done) => {
        return $.combine( $.gulp.src(options.src.app),
            $.cached("eslint"),
            $.eslint(),
            $.eslint.format(),
            $.eslint.result((result) => {
			    if (result.warningCount > 0 || result.errorCount > 0) {
				    delete $.cached.caches.eslint[$.path.resolve(result.filePath)]
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

