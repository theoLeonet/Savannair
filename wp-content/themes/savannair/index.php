<?php

use Timber\Post;
use Timber\Timber;


$context = Timber::context();
$context['about'] = new Post(savannair_get_by_unique_name('page', 'about'));
$context['blog'] = new Post(savannair_get_by_unique_name('page', 'blog'));
$context['modules'] = Timber::get_posts([
    'post_type' => 'module',
]);
$context['article'] = Timber::get_posts([
    'post_type' => 'article',
    'order_by' => 'desc',
    'posts_per_page' => 1,
])[0];

$context['session'] = $_SESSION;

Timber::render('index.twig', $context);