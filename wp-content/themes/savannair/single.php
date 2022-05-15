<?php


use Timber\Timber;

$context = Timber::context();
$timber_post = Timber::get_post();
$context['post'] = $timber_post;

if ($timber_post->meta('type') == 'module') {
    $context['modules'] = Timber::get_posts([
        'post_type' => 'module',
        'post__not_in' => [$timber_post->ID]
    ]);

    Timber::render(
        [
            '/single/single_' . $timber_post->post_name . '.twig',
            '/single/single_module.twig'
        ],
        $context);
}

