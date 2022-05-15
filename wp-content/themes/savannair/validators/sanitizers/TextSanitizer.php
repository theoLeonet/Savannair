<?php

namespace Savannair\Validators\Sanitizers;

use Savannair\Validators\Sanitizers\BaseSanitizer;

class TextSanitizer extends BaseSanitizer
{

    public function getSanitizedValue()
    {
        return sanitize_text_field($this->value);
    }
}