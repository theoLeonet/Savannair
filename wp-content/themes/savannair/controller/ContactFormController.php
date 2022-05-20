<?php

namespace Savannair\Controllers;

use Savannair\Validators\AcceptedValidator;
use Savannair\Validators\EmailValidator;
use Savannair\Validators\RequiredValidator;
use Savannair\Validators\Sanitizers\TextSanitizer;
use Savannair\Validators\Sanitizers\EmailSanitizer;

class ContactFormController extends BaseFormController
{
    protected function getNonceKey(): string
    {
        return 'nonce_submit_contact';
    }

    protected function getSanitizableAttributes(): array
    {
        return [
            'firstname' => TextSanitizer::class,
            'lastname' => TextSanitizer::class,
            'email' => EmailSanitizer::class,
            'message' => TextSanitizer::class,
            'rules' => TextSanitizer::class,
        ];
    }

    protected function getValidatableAttributes(): array
    {
        return [
            'firstname' => [RequiredValidator::class],
            'lastname' => [RequiredValidator::class],
            'email' => [RequiredValidator::class, EmailValidator::class],
            'message' => [RequiredValidator::class],
            'rules' => [AcceptedValidator::class],
        ];
    }

    protected function redirectWithErrors($errors)
    {
        // C'est pas OK, on place les erreurs de validation dans la session
        $_SESSION['contact_form_feedback'] = [
            'success' => false,
            'data' => $this->data,
            'errors' => $errors,
        ];

        // On redirige l'utilisateur vers le formulaire pour y afficher le feedback d'erreurs.
        return wp_safe_redirect(($this->data['_wp_http_referer'] ?? '') . '#contact', 302);
    }

    protected function handle()
    {
        if ($this->data['user-group'] === 'Un(e) scientifique') $recipient = 'theoleonet.dev@gmail.com';
        else if ($this->data['user-group'] === 'Une ville') $recipient = 'theoleonet.dev@gmail.com';
        else if ($this->data['user-group'] === 'Un(e) étudiant(e)') $recipient = 'theoleonet.dev@gmail.com';
        else $recipient = 'theoleonet.dev@gmail.com';
        // Envoyer l'email à l'admin
        wp_mail($recipient, 'Nouveau message !', $this->data['message']);
    }

    protected function redirectWithSuccess()
    {
        // Ajouter le feedback positif à la session
        $_SESSION['contact_form_feedback'] = [
            'success' => true,
        ];

        //return wp_safe_redirect($this->data['_wp_http_referer'] . '#contact', 302);
        return wp_safe_redirect($this->data['_wp_http_referer'] . '#contact', 302);
    }
}