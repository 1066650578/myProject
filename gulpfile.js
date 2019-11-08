var gulp = require("gulp"),
    htmlclean = require("gulp-htmlclean"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    stripDebug = require("gulp-strip-debug"),
    concat = require("gulp-concat"),
    less = require("gulp-less"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    connect = require("gulp-connect"),
    deporder = require("gulp-deporder"),
    util = require("gulp-util");
var devMode = process.env.NODE_ENV ==="development";
console.log(devMode);
var folder = {
    src:"src/",
    dist:"dist/"
};
gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload());
    if(!devMode){
        page .pipe(htmlclean());
    }
        page.pipe(gulp.dest(folder.dist + "html/"));
});
gulp.task("img",function(){
    gulp.src(folder.src + "img/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "img/"))
});
gulp.task("js",function(){
    var js = gulp.src(folder.src + "js/*")
        .pipe(connect.reload());
    if(!devMode){
    js.pipe(uglify()).pipe(stripDebug());
    }
        js.on('error',function(err){
            util.log(util.colors.red('Error'),err.toString());
        }).pipe(gulp.dest(folder.dist + "js/"));
});
gulp.task("css",function(){
    var options = [
        autoprefixer(),
        cssnano()
    ];
    var css = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less());
    if(!devMode){
        css .pipe(postcss(options));
    }
        css.pipe(gulp.dest(folder.dist + "css/"))
});
gulp.task("watch",function(){
    gulp.watch(folder.src+"html/*",["html"]);
    gulp.watch(folder.src+"css/*",["css"]);
    gulp.watch(folder.src+"js/*",["js"]);
    gulp.watch(folder.src+"img/*",["img"]);
});
gulp.task("server",function(){
    connect.server({
        port:8082,
        liverload:true
    })
});
gulp.task("default",["img","html","css","js","watch","server"]);
