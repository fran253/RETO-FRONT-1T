var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));




gulp.task('compilar-sass', function(done) {
    // Ruta SCSS
    gulp.src('FRONT/source/sass/main.scss', { allowEmpty: true })
    .pipe(sass().on('error', sass.logError))
    // Ruta del CSS
    .pipe(gulp.dest('FRONT/css/menu.css')); 
    done();
});


gulp.task( 'watch', function() {
    gulp.watch( [
       'FRONT/source/*/*.scss',
        'FRONT/source/sass/*.scss'], gulp.series('compilar-sass') );
});

