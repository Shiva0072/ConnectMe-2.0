const gulp=require('gulp');
const sass=require('gulp-sass');
const cssnano=require('gulp-cssnano');
const rev=require('gulp-rev');
const uglify=require('gulp-uglify');
const del=require('del');
// const imagemin=require('gulp-imagemin');

gulp.task('css',function(done){
    console.log('minifying css...');
    // gulp.src('./assets/sass/**/*.scss')
    // .pipe(sass())
    // .pipe(cssnano())
    // .pipe(gulp.dest('./assets.css'));
    gulp.src('./assets/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    gulp.src('./assets/css/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));

    done(); //instead of returning from above, we do done()
});

gulp.task('js',function(done){
    console.log('minifying JS...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// gulp.task('images',function(done){
//     console.log('minifying images..');
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(image())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets/images'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });

//empty the public/assets directory
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build',gulp.series('clean:assets','css','js'),function(done){
    console.log('Building assets...');
    done();
});
