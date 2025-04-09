<?php
// index.php

// Start a session so we can store and access data across requests.
session_start();

// Include the validation functions from the external file.
require_once 'validation.php';

// Initialize variables for form data and error messages.
$formData = [
    'name' => '',
    'age' => '',
    'favorite_color' => '', // This will be a select option
];

$errors = [
    'name' => '',
    'age' => '',
    'favorite_color' => '',
];

$finalMessage = '';
$allowedColors = ['Red', 'Green', 'Blue', 'Yellow']; // Allowed options for favorite color

// Check if the form has been submitted (using POST method).
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect data from the form and sanitize using trim().
    $formData['name'] = isset($_POST['name']) ? trim($_POST['name']) : '';
    $formData['age'] = isset($_POST['age']) ? trim($_POST['age']) : '';
    $formData['favorite_color'] = isset($_POST['favorite_color']) ? trim($_POST['favorite_color']) : null;
    
    // Validate Name: must be between 2 and 50 characters.
    if (!validateTextLength($formData['name'], 2, 50)) {
        $errors['name'] = "Name must be between 2 and 50 characters.";
    }

    // Validate Age: must be a number between 1 and 120.
    if (!validateNumberRange($formData['age'], 1, 120)) {
        $errors['age'] = "Age must be a number between 1 and 120.";
    }

    // Validate Favorite Color: if provided, it must be among allowed values.
    if ($formData['favorite_color'] !== null && !validateOption($formData['favorite_color'], $allowedColors)) {
        $errors['favorite_color'] = "Please select a valid color option.";
    }

    // Combine error messages.
    $errorMessages = implode(" ", array_filter($errors));

    if (!empty($errorMessages)) {
        $finalMessage = "Please correct the following errors: " . $errorMessages;
    } else {
        $finalMessage = "Data is valid. Thank you for submitting the form!";
        
        // Store the visitor's name in the session.
        $_SESSION['visitor_name'] = $formData['name'];
        
        // Set a cookie for the favorite color (expires in 1 day, 86400 seconds).
        setcookie("favorite_color", $formData['favorite_color'], time() + 86400);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ClassConnect Form</title>
    <style>
        /* Basic inline styling for the form page */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f7ff;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-radius: 8px;
            padding: 20px;
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        .form-control {
            margin-bottom: 16px;
        }
        .form-control label {
            display: block;
            margin-bottom: 4px;
        }
        .form-control input,
        .form-control select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .error {
            color: red;
            font-size: 0.9rem;
        }
        .final-message {
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
        }
        button {
            background-color: #3b82f6;
            color: #fff;
            padding: 10px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #2563eb;
        }
        .info-box {
            background-color: #e7f3fe;
            border: 1px solid #b3d8fd;
            border-radius: 4px;
            padding: 16px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contact Information Form</h1>
        <?php if ($finalMessage): ?>
            <p class="final-message"><?php echo htmlspecialchars($finalMessage); ?></p>
        <?php endif; ?>
        <form action="" method="POST">
            <!-- Text Input for Name -->
            <div class="form-control">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" 
                       value="<?php echo htmlspecialchars($formData['name']); ?>" required>
                <?php if ($errors['name']): ?>
                    <p class="error"><?php echo htmlspecialchars($errors['name']); ?></p>
                <?php endif; ?>
            </div>
            
            <!-- Number Input for Age -->
            <div class="form-control">
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" 
                       value="<?php echo htmlspecialchars($formData['age']); ?>" required>
                <?php if ($errors['age']): ?>
                    <p class="error"><?php echo htmlspecialchars($errors['age']); ?></p>
                <?php endif; ?>
            </div>
            
            <!-- Options: Favorite Color (Select Box) -->
            <div class="form-control">
                <label for="favorite_color">Favorite Color:</label>
                <select id="favorite_color" name="favorite_color">
                    <option value="">Select a color</option>
                    <?php foreach ($allowedColors as $color): ?>
                        <option value="<?php echo $color; ?>" <?php echo ($formData['favorite_color'] === $color ? "selected" : ""); ?>>
                          <?php echo $color; ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                <?php if ($errors['favorite_color']): ?>
                    <p class="error"><?php echo htmlspecialchars($errors['favorite_color']); ?></p>
                <?php endif; ?>
            </div>
            
            <button type="submit">Submit</button>
        </form>

        <!-- Display stored session and cookie data -->
        <div class="info-box">
            <h2>Stored Visitor Data</h2>
            <p><strong>Your Name (Session):</strong> <?php echo isset($_SESSION['visitor_name']) ? htmlspecialchars($_SESSION['visitor_name']) : 'Not set'; ?></p>
            <p><strong>Favorite Color (Cookie):</strong> <?php echo isset($_COOKIE['favorite_color']) ? htmlspecialchars($_COOKIE['favorite_color']) : 'Not set'; ?></p>
        </div>
    </div>
</body>
</html>
