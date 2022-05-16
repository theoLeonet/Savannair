<?php

use Savannair\Controllers\ContactFormController;
use Timber\Timber;

require_once(__DIR__ . '/vendor/autoload.php');

//Remove block editor
add_filter('use_block_editor_for_post', '__return_false');

//support for thumbnails
add_theme_support('post-thumbnails');

// Start a PHP session to be able to pass variables from page to page.
add_action('init', 'antilope_session', 1);

function antilope_session()
{
    if (!session_id()) {
        session_start();
    }

    if (isset($_SESSION['contact_form_feedback']['success'])) {
        session_destroy();
    }
}

//Create a new Timber instance
$timber = new Timber();

// Register menus
register_nav_menu('primary', 'Navigation principale (haut de page)');
register_nav_menu('secondary', 'Navigation secondaire (bas de page)');

//Add a filter, so I can add stuff to the context
add_filter('timber/context', 'add_to_context');

function add_to_context(array $context): array
{
    // Add Timber Menu and send it to the context.
    $context['primary_menu'] = new \Timber\Menu('primary');
    $context['footer_menu'] = new \Timber\Menu('secondary');

    return $context;
}

// Add a unique name field to acf
add_filter('acf/validate_value/name=' . 'nom_unique', 'acf_unique_value_field', 10, 4);

function acf_unique_value_field($valid, $value, $field, $input)
{
    if (!$valid || (!isset($_POST['post_ID']) && !isset($_POST['post_id']))) {
        return $valid;
    }
    if (isset($_POST['post_ID'])) {
        $post_id = intval($_POST['post_ID']);
    } else {
        $post_id = intval($_POST['post_id']);
    }
    if (!$post_id) {
        return $valid;
    }
    $post_type = get_post_type($post_id);
    $field_name = $field['name'];
    $args = array(
        'post_type' => $post_type,
        'post_status' => 'publish, draft, trash',
        'post__not_in' => [$post_id],
        'meta_query' => [
            [
                'key' => $field_name,
                'value' => $value
            ]
        ]

    );
    $query = new WP_Query($args);
    if (count($query->posts)) {
        return 'This Value is not Unique. Please enter a unique ' . $field['label'];
    }
    return true;
}

// Find a post based on its unique name
function savannair_get_by_unique_name(string $post_type, string $post_unique_name = null)
{
    $post = new WP_Query([
        'post_type' => $post_type,
        'meta_query' => [
            [
                'key' => 'nom_unique',
                'value' => $post_unique_name,
            ],
        ]
    ]);

    return $post->post;
}

//register a custom post type for the modules
register_post_type('module', [
    'label' => 'Modules',
    'labels' => [
        'name' => 'Modules',
        'singular_name' => 'Module',
    ],
    'description' => 'Les différents articles à propos des modules',
    'public' => true,
    'has_archive' => true,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-cart',
    'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
    'rewrite' => ['slug' => 'modules'],
]);

//register a custom post type for the articles
register_post_type('article', [
    'label' => 'Articles',
    'labels' => [
        'name' => 'Articles',
        'singular_name' => 'Article',
    ],
    'description' => 'Les différents articles à propos de Savannair',
    'public' => true,
    'has_archive' => true,
    'menu_position' => 7,
    'menu_icon' => 'dashicons-media-text',
    'supports' => ['title', 'excerpt', 'thumbnail'],
    'rewrite' => ['slug' => 'articles'],
]);

//Things to do on form sending
add_action('admin_post_submit_contact_form', 'savannair_handle_submit_contact_form');

function savannair_handle_submit_contact_form()
{
    $form = new ContactFormController($_POST);
}

//Create srcset
function savannair_create_srcset($array)
{
    $srcsetArray = [];
    foreach ($array as $key => $size) {
        if (gettype($size) === 'string') {
            $src = $size;
            array_push($srcsetArray, $size);
        }
        if (str_contains($key, 'width')) {
            $width = $size;
            array_push($srcsetArray, $size . 'w,');
        }
    }
    $srcset = implode(' ', $srcsetArray);
    return rtrim($srcset, ', ');
}

// Function to charge compiled assets and return their absolute path.
function savannair_mix($path)
{
    $path = '/' . ltrim($path, '/');

    if (!realpath(__DIR__ . '/public' . $path)) {
        return;
    }

    if (!($manifest = realpath(__DIR__ . '/public/mix-manifest.json'))) {
        return get_stylesheet_directory_uri() . '/public' . $path;
    }

    // Ouvrir mix-manifest.json
    $manifest = json_decode(file_get_contents($manifest), true);

    // Look if there is a key that corresponds to the file loaded in $path.
    if (!array_key_exists($path, $manifest)) {
        return get_stylesheet_directory_uri() . '/public' . $path;
    }

    // Get and return the versioned path.
    return get_stylesheet_directory_uri() . '/public' . $manifest[$path];
}