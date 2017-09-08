const MODULE_NAME = "appModule";
const SOURCE_BASE_DIR = "src";
const TMP_DIR = ".tmp";
const BUILD_BASE_DIR = "dist";

exports.watch = {
    templates: SOURCE_BASE_DIR + "/app/**/*.html",
    app: SOURCE_BASE_DIR + "/app/**/*.js",
    styles: SOURCE_BASE_DIR + "/sass/**/*.scss",
    fonts: SOURCE_BASE_DIR + "/assets/fonts/**/*.*",
    img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
    html : SOURCE_BASE_DIR + "/*.html",
    vendor : "./vendor.json"
};

exports.server = {
    tmp: {
        path: [TMP_DIR+"/serve", SOURCE_BASE_DIR],
        watch: [ TMP_DIR  + "/**/*.*", SOURCE_BASE_DIR  + "/**/*.*" ]
    },
    dist: {
        path: BUILD_BASE_DIR,
        watch: [ BUILD_BASE_DIR  + "/**/*.*"]
    } 
}

exports.build = {
    root: BUILD_BASE_DIR,
    vendor: BUILD_BASE_DIR + "/js",
    app: BUILD_BASE_DIR + "/js",
    styles: BUILD_BASE_DIR + "/styles",
    fonts: BUILD_BASE_DIR + "/assets/fonts",
    img: BUILD_BASE_DIR + "/assets/img",
    html : BUILD_BASE_DIR + "/",
    templates : {
        dir : BUILD_BASE_DIR + "/js",
        name : "templateCacheHtml.js",
        rootPath : "app",
        module: MODULE_NAME
    }
}

exports.src = {
    root: SOURCE_BASE_DIR,
    templates: [ SOURCE_BASE_DIR + '/app/**/*.html' ],
    app: [ SOURCE_BASE_DIR + '/app/**/!(*.spec|*.mock).js' ],
    vendor: "./vendor.json",
    styles: SOURCE_BASE_DIR + "/sass/",
    fonts: [SOURCE_BASE_DIR + "/assets/fonts/**/*.*", "./node_modules/bootstrap-sass/assets/fonts/**/*.*"],
    img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
    html : SOURCE_BASE_DIR + "/*.html"
}

exports.tmp = {
    root: TMP_DIR,
    app: TMP_DIR + "/serve/app/",
    styles: TMP_DIR + "/serve/app/",
    serve: TMP_DIR + "/serve/",
    index : TMP_DIR + "/serve/",
    templates : {
        dir : TMP_DIR + "/partials",
        name : "templateCacheHtml.js",
        rootPath : "app",
        module: MODULE_NAME
    }
}

exports.clean = {
    file: [BUILD_BASE_DIR, TMP_DIR, "./*.war", "/*.zip", "coverage"],
    cache: [BUILD_BASE_DIR, TMP_DIR, SOURCE_BASE_DIR]
}

exports.war = {
    src: BUILD_BASE_DIR  + "/**/*.*",
    dest: "./",
    name: "admin.war"
}
 