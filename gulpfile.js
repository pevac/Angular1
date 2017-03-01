"use strict";

const gulp = require("gulp");
const del = require("del");
const pngquant = require('imagemin-pngquant');
const sequence  = require("run-sequence");
const browserSync = require("browser-sync").create();
const spa         = require("browser-sync-spa");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const angularTemplateCache   = require("gulp-angular-templatecache");
const angularFilesort        = require("gulp-angular-filesort");
const ngAnnotate             = require("gulp-ng-annotate");
const bowerComponent = require("./vendor");
const events = require("events");
const emitter = new events.EventEmitter();
const combiner = require('stream-combiner2').obj;

let currentTask = "";
let RELEASE = !!argv.release;
const AUTOPREFIXER_BROWSERS = [             
    "ie >= 9",
    "ie_mob >= 9",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 5",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
];

const MODULE_NAME = "appModule";
const SOURCE_BASE_DIR = "./src";
const TARGET_DIR = "./build";
const BUILD_BASE_DIR = TARGET_DIR;
const PROXY_PATHS = BUILD_BASE_DIR;

const path = {
    build: { 
        script: BUILD_BASE_DIR + "/js",
        styles: BUILD_BASE_DIR + "/css",
        fonts: BUILD_BASE_DIR + "/fonts",
        img: BUILD_BASE_DIR + "/img",
        index : BUILD_BASE_DIR + "/",
        templates : {
            dir : BUILD_BASE_DIR + "/js",
            name : "templates.js",
            rootPath : ""
        },
    },
    src: { 
        templates: [ SOURCE_BASE_DIR + '/app/**/*.html' ],
        script: {
            app: [ SOURCE_BASE_DIR + '/app/**/*.js' ],
            vendor: bowerComponent
        },
        styles: SOURCE_BASE_DIR + "/assets/sass/*.scss",
        fonts: [SOURCE_BASE_DIR + "/assets/fonts/**/*.*", "./src/assets/lib/bootstrap-sass/assets/fonts/**/*.*"],
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        index : SOURCE_BASE_DIR + "/index.html"
    },
    watch: { 
        templates: SOURCE_BASE_DIR + "/app/**/*.html",
        views: SOURCE_BASE_DIR + '/app/**/*.html',
        script: SOURCE_BASE_DIR + "/app/**/*.js",
        styles: SOURCE_BASE_DIR + "/assets/sass/**/*.scss",
        fonts: SOURCE_BASE_DIR + "/assets/fonts/**/*.*",
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        index : SOURCE_BASE_DIR + "/index.html",
        reload: BUILD_BASE_DIR + "/**/*.*"
    },
    zip: {
        src: BUILD_BASE_DIR  + "/**/*.*",
        dest: "./"
    },
    clean: BUILD_BASE_DIR
};

gulp.task("sass:build", function(){
    currentTask = this.currentTask;
    return combiner( gulp.src(path.src.styles),
        $.if(!RELEASE, $.sourcemaps.init()),
        $.sass(),
        $.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}),
        $.if(RELEASE, $.cssmin()),
        $.rename({
            suffix: ".min",
            extname: ".css"
        }),
        $.if(!RELEASE, $.sourcemaps.write({sourceRoot: "./src/sass"})),
        gulp.dest(path.build.styles),
        $.size({title: "styles"}),
        browserSync.stream()
    ).on("error", reportError)
});

gulp.task("vendor:build", function(){
    return combiner(gulp.src(path.src.script.vendor),
        $.if(!RELEASE, $.sourcemaps.init()),
        $.concat("vendor.js"),
        $.if(RELEASE,$.uglify()),
        $.rename({
            suffix: ".min",
            extname: ".js"
        }),
        $.if(!RELEASE, $.sourcemaps.write()),
        gulp.dest(path.build.script),
        $.size({title: "vendor"})
    )
});

gulp.task("script:build", function() {
    currentTask = this.currentTask;
    return combiner( gulp.src(path.src.script.app),
        $.if(!RELEASE, $.sourcemaps.init()),
        angularFilesort(),
        $.concat("app.js"),
        $.if(RELEASE, ngAnnotate()),
        $.if(RELEASE, $.uglify()),
        $.rename({
            suffix: ".min",
            extname: ".js"
        }),
        $.if(!RELEASE, $.sourcemaps.write()),
        gulp.dest(path.build.script),
        $.size({title: "app"})
    ).on("error", reportError)
});

gulp.task("templates:build", function() {
    return combiner(gulp.src(path.src.templates),
        $.if(RELEASE, $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            removeEmptyAttributes:true
        })),
        angularTemplateCache(path.build.templates.name, {
            module : MODULE_NAME, root : path.build.templates.rootPath
        }),
        $.rename({
            suffix: ".min",
            extname: ".js"
        }),
        gulp.dest(path.build.templates.dir),
        $.size({title: "templates"})
    )
});

gulp.task("index:build", function() {
    var appScriptSources = combiner(gulp.src([path.build.script + "/**/*.js"]),
                             $.ignore.exclude(path.build.script  +"/vendor.min.js"),
                             angularFilesort());
  
    var otherSources = gulp.src(["/" +"vendor.min.js", path.build.styles + "/*.css"], {read: false});
    var sources = $.merge(otherSources, appScriptSources);
    return combiner(gulp.src(path.src.index),
        $.inject(sources, { ignorePath:"../build/", relative : true }),
        $.if(RELEASE, $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true
        })),
        gulp.dest(path.build.index),
        $.size({title: "index"})
    )
});

gulp.task("fonts:build", function() {
    return combiner( gulp.src(path.src.fonts), gulp.dest(path.build.fonts))
});

gulp.task('image:build', function () {
    currentTask = this.currentTask;
    return combiner(gulp.src(path.src.img),
        $.plumber({errorHandler:  reportError}),
        $.changed(path.build.img),
        $.cache($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })),
        gulp.dest(path.build.img),
        $.size({title: "images"})
    ).on("error", reportError)
});

gulp.task("clean", del.bind(null, path.clean));

gulp.task("clean:war", del.bind(null, "./admin.war"));

gulp.task("build", ["clean"], function (cb) {
    sequence (["sass:build","templates:build", "vendor:build", "script:build",  "fonts:build","image:build"],"index:build", cb);
});

gulp.task("public",  function (cb) {
    RELEASE = true;
    sequence ("build", cb);
});

gulp.task("war",  ["clean:war", "public"],  function() {
    return combiner(gulp.src(path.zip.src),
        $.war({
            welcome: "index.html",
            displayName: "Gulp WAR",
        }),
        $.zip("admin.war"),
        gulp.dest(path.zip.dest),
        $.size({title: "war"}),
        $.notify({
            title   : "Gulp Task Complete",
            message : "Archiving have been compiled",
            sound: false
        })
    )
});

gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: PROXY_PATHS,
            directory: true
        },
        ui: {
            port: 8889
        },
        port: 8888,
        open: true,
        notify: false,
        ghostMode: false,
        logFileChanges: true
    });

    browserSync.watch(path.watch.reload).on("change", browserSync.reload);

    browserSync.use(spa({
        selector: "[ng-app]",
        history: {
            index: PROXY_PATHS + '/index.html'
        }
    }));
});

gulp.task("watch", function(cb){
    $.watch([path.watch.index], function(event, cb) {
        gulp.start("index:build");
    });

    $.watch([path.watch.templates], function(event, cb) {
        gulp.start("templates:build");
    });
  
    $.watch([path.watch.styles], function(event, cb) {
        gulp.start("sass:build");
    });

    $.watch([path.watch.script], function(event, cb) {
        gulp.start("script:build");
    });

    $.watch([path.watch.fonts], function(event, cb) {
        gulp.start("fonts:build");
    });

    $.watch([path.watch.img], function(event, cb) {
        gulp.start("image:build");
    });
});

gulp.task("serve", function (cb) {
    sequence ("build", ["browser-sync","watch"], cb);
});

gulp.task("default", ["serve"]);

function reportError(error) {
    var lineNumber = (error.line) ? "LINE " + error.line + " -- " : "";
    var pluginName = (!error.plugin) ? ": ["+error.plugin+"]" : "["+currentTask+"]";
 
    $.notify({
        title: "Task Failed "+ pluginName,
        message: lineNumber + "See console.",
        sound: false
    }).write(error);

    var report = "";
    var chalk = $.util.colors.white.bgRed;
 
    report += chalk("TASK:") + pluginName+"\n";
    report += chalk("ERROR:") + " " + error.message + "\n";
    if (error.line) { report += chalk("LINE:") + " " + error.line + "\n"; }
    if (error.file) { report += chalk("FILE:") + " " + error.file + "\n"; }
 
    console.error(report);
    this.emit("end");
}

var _gulpStart = gulp.Gulp.prototype.start;

gulp.Gulp.prototype.start = function (taskName) {
    this.currentTask = taskName;

    _gulpStart.apply(this, arguments);
};



