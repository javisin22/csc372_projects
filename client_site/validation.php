<?php
// validation.php
// This file contains functions for validating different types of form inputs

/**
 * Check if a text input is between a minimum and maximum number of characters.
 *
 * @param string $text The text to validate.
 * @param int $min The minimum allowed number of characters.
 * @param int $max The maximum allowed number of characters.
 * @return bool Returns true if valid, false otherwise.
 */
function validateTextLength(string $text, int $min, int $max): bool {
    $length = mb_strlen($text);
    return ($length >= $min && $length <= $max);
}

/**
 * Check if a number input is a valid number within a specified range.
 *
 * @param mixed $number The number to validate.
 * @param float $min The minimum allowed value.
 * @param float $max The maximum allowed value.
 * @return bool Returns true if valid, false otherwise.
 */
function validateNumberRange($number, float $min, float $max): bool {
    if (!is_numeric($number)) {
        return false;
    }
    $num = floatval($number);
    return ($num >= $min && $num <= $max);
}

/**
 * Check if the submitted option is among the allowed values.
 *
 * @param string|null $option The option value submitted by the user.
 * @param array $allowed An array of allowed option values.
 * @return bool Returns true if the option is allowed, false otherwise.
 */
function validateOption(?string $option, array $allowed): bool {
    return in_array($option, $allowed, true);
}
?>
