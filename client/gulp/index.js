"use strict";

const gulp = require("gulp");
const task = require("./loader")(gulp);
const config = require("./config");

task("styles:tmp",  { src: config.src,  build: config.tmp });
// task("postcss:tmp",  { src: config.src,  build: config.tmp });
task("templates:tmp",  { src: config.src, build: config.tmp });
task("eslint",  { src: config.src });
task("fonts:build",  { src: config.src, build: config.build });
task("images:build",  { src: config.src, build: config.build });
task("inject:tmp",  { src: config.src, build: config.tmp });
task("useref",  { src: config.tmp, build: config.build });
task("server:tmp",  { server: config.server.tmp });
task("server:dist",  { server: config.server.dist });
task("watch.tmp",  { watch: config.watch });
task("clean",  { clean: config.clean.file} );
task("clear.cache");
task("war", { war: config.war });

task("unit.tests:single", { singleRun: true });
task("unit.tests:single:auto", { singleRun: false });
task("e2e.tests");

task("inject", gulp.series(gulp.parallel("styles:tmp", "eslint"),"inject:tmp"));
task("inject:build", gulp.series(gulp.parallel("clear.cache", "clean"), "inject"));
task("build", gulp.series("inject:build", gulp.parallel("templates:tmp", "fonts:build","images:build"),"useref"));
task("war:build", gulp.series("clean", "build", "war"));
task("test", gulp.series("eslint", "unit.tests:single"));
task("test:auto", gulp.series("watch.tmp", "unit.tests:single:auto"));

task("serve",  gulp.series ("inject:build",  gulp.parallel("server:tmp","watch.tmp")));
task("serve:dist", gulp.series("build",  "server:dist"));
task("serve:e2e", gulp.series("inject:build",  "server:tmp"));
task("serve:e2e:dist", gulp.series("build",  "server:dist"));

task("webdriver:update", { webdriver: "webdriver_update" });
task("webdriver:standalone", { webdriver:"webdriver_standalone" });
task("protractor:src", gulp.series( gulp.parallel("serve:e2e", "webdriver:update"), "e2e.tests"));
task("protractor:dist", gulp.series( gulp.parallel("serve:e2e:dist", "webdriver:update"), "e2e.tests"));
task("protractor", ["protractor:src"]);

task("default", ["serve"]);

