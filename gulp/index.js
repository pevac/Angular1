"use strict";

const gulp = require("gulp");
const sequence  = require("run-sequence");
const path = require("path");
const task = require("./loader");
const config = require("./config")

task("sass:build", path.resolve("./gulp/styles"), {
    path: config.path,
    AUTOPREFIXER_BROWSERS: config.AUTOPREFIXER_BROWSERS,
    reportError: config.reportError
});
task("vendor:build", path.resolve("./gulp/vendor"), {
    path: config.path
});
task("app:build", path.resolve("./gulp/app"), {
    path: config.path,
    reportError: config.reportError
});
task("templates:build", path.resolve("./gulp/templates"), {
    path: config.path
});
task("html:build", path.resolve("./gulp/html"), {
    path: config.path,
    reportError: config.reportError
});
task("fonts:build", path.resolve("./gulp/fonts"), {
    path: config.path
});
task("image:build", path.resolve("./gulp/images"), {
    path: config.path,
    reportError: config.reportError
});
task("browser-sync", path.resolve("./gulp/server"), {
    path: config.path
});
task("clean", path.resolve("./gulp/clean"), { clean: [config.path.clean.build, "./manifest"]} );
task("clear:cache", path.resolve("./gulp/clearCache"), { clean: config.path.clean.build} );
task("clean:war", path.resolve("./gulp/clean"), { clean: config.path.clean.war} );
task("watch", path.resolve("./gulp/watch"), {
    path: config.path
});
task("war", path.resolve("./gulp/war"),  {
    path: config.path
});

gulp.task("build", ["clear:cache", "clean"], function (cb) {
    sequence (["sass:build","templates:build", "vendor:build", "app:build",  "fonts:build","image:build"],"html:build", cb);
});

gulp.task("zip",["clean:war"], function(cb) {
      sequence ( "build", "war", cb);
});

gulp.task("serve",  function (cb) {
    sequence ("build", ["browser-sync","watch"], cb);
});

gulp.task("default", ["serve"]);

