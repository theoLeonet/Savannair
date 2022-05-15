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

mix.ts('wp-content/themes/antilope/resources/ts/Main.ts', 'js').sourceMaps()
    .sass('wp-content/themes/antilope/resources/scss/main.scss', 'css').sourceMaps()
    .options({
        processCssUrls: false
    })
    .setPublicPath('./wp-content/themes/antilope/public')
    .browserSync({
        proxy: 'https://savannair.test',
        notify: false,
        open: true,
        files: [
            'wp-content/themes/antilope/*.php',
            'wp-content/themes/antilope/resources/ts/*.ts',
            'wp-content/themes/antilope/resources/scss/*.scss'
        ]
    })
    .version();
