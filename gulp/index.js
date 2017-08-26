"use strict";

const gulp = require("gulp");
const sequence  = require("run-sequence");
const path = require("path");
const $ = require("gulp-load-plugins")();
const task = require("./loader");
const config = require("./config")

task("sass:build", path.resolve("./gulp/styles"), {
    path: config.path,
    AUTOPREFIXER_BROWSERS: config.AUTOPREFIXER_BROWSERS
});
task("vendor:build", path.resolve("./gulp/vendor"), {
    path: config.path
});
task("app:build", path.resolve("./gulp/app"), {
    path: config.path
});
task("templates:build", path.resolve("./gulp/templates"), {
    path: config.path
});
task("html:build", path.resolve("./gulp/html"), {
    path: config.path
});

task("eslint", path.resolve("./gulp/eslint"), {
    path: config.path
});
task("inject", path.resolve("./gulp/inject"), {
    path: config.path
});
task("useref", path.resolve("./gulp/useref"), {
    path: config.path
});

task("fonts:build", path.resolve("./gulp/fonts"), {
    path: config.path
});
task("image:build", path.resolve("./gulp/images"), {
    path: config.path
});

task("browser-sync", path.resolve("./gulp/server"), {
    path: config.path
});

task("clean", path.resolve("./gulp/clean"), { clean: [config.path.clean.build, "./manifest", "dist"]} );
task("clear:cache", path.resolve("./gulp/clearCache"), { clean: config.path.clean.build} );
task("clean:war", path.resolve("./gulp/clean"), { clean: config.path.clean.war} );

task("watch", path.resolve("./gulp/watch"), {
    path: config.path
});
task("watch:inject", path.resolve("./gulp/watch.inject"), {
    path: config.path
});

task("test", path.resolve("./gulp/unit-tests"), {singleRun: true});
task("test:auto", path.resolve("./gulp/unit-tests"), {singleRun: false});

task("war", path.resolve("./gulp/war"),  {
    path: config.path
});

gulp.task("zip",["clean:war"], (cb) => {
    sequence ( "build", "war", cb);
});


gulp.task("build", ["clear:cache", "clean"],  (cb) => {
    sequence (["sass:build","templates:build", "vendor:build", "app:build",  "fonts:build","image:build"],"html:build", cb);
});

gulp.task("build:inject", ["clear:cache", "clean"],  (cb) => {
    sequence (["sass:build", "eslint"],"inject", cb);
});

gulp.task("build:useref", ["clear:cache", "clean"],  (cb) => {
    sequence (["build:inject", "templates:build"],"useref", cb);
});

gulp.task("serve",  (cb) => {
    sequence ("build",  ["browser-sync","watch"], cb);
});

gulp.task("serve:inject",  (cb) => {
    sequence ("build:inject",  ["browser-sync","watch:inject"], cb);
});

gulp.task("default", ["serve"]);

 