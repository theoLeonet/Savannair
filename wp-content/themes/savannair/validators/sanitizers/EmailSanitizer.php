<?php

namespace Savannair\Validators\Sanitizers;

use Savannair\Validators\Sanitizers\BaseSanitizer;

class EmailSanitizer extends BaseSanitizer
{
    public function getSanitizedValue()
    {
        return sanitize_email($this->value);
    }
}