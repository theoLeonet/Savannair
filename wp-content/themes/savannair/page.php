<?php

use Timber\Post;
use Timber\Timber;

$context = Timber::context();

$timber_post = new Post();
$context['post'] = $timber_post;

if ($timber_post->meta('nom_unique') == 'blog') {
    $context['articles'] = Timber::get_posts([
        'post_type' => 'article',
        'order_by' => 'desc',
        'posts_per_page' => -1,
    ]);
}

Timber::render([
    '/pages/page_' . $timber_post->meta('nom_unique') . '.twig',
    'page.twig'
],
    $context);
