'use strict';
/*
    利用gulp-sass编译css
        * requie(): 导入模块
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

//创建一个任务
gulp.task('compileSass',function(){
    // 查找文件位置
    gulp.src('./src/sass/base.scss')//得到一个文件流
        .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))//编译sass文件
        .pipe(gulp.dest('./src/css/'))//输出到硬盘
});

// 监听文件的任务、
gulp.task('jtSass',function(){
    // 如果监听的文件有修改，则执行compileSass任务
    gulp.watch('./src/sass/base.scss',['compileSass'])
});

//运行任务
//命令行输入（项目根目录）：gulp 任务名