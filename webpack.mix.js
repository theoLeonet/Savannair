const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('wp-content/themes/savannair/src/ts/Main.ts', 'js').sourceMaps()
    .sass('wp-content/themes/savannair/src/scss/main.scss', 'css').sourceMaps()
    .options({
        processCssUrls: false
    })
    .setPublicPath('./wp-content/themes/savannair/public')
    .browserSync({
        proxy: 'https://savannair.test',
        notify: false,
        open: true,
        files: [
            'wp-content/themes/savannair/*.php',
            'wp-content/themes/savannair/src/ts/*.ts',
            'wp-content/themes/savannair/public/js/*.js',
            'wp-content/themes/savannair/src/scss/*.scss',
            'wp-content/themes/savannair/public/css/*.css'
        ]
    })
    .version();
