<?php
// Include database connection
require_once 'includes/database-connection.php';

// Uncomment for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Function to safely output data (prevent XSS)
function safe_output($data) {
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

// Initialize variables for feedback messages
$message = '';
$message_type = '';
$affected_rows = 0;

// Process form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create new appointment
    if (isset($_POST['create_appointment'])) {
        $student_id = filter_input(INPUT_POST, 'student_id', FILTER_VALIDATE_INT);
        $tutor_id = filter_input(INPUT_POST, 'tutor_id', FILTER_VALIDATE_INT);
        $start_time = filter_input(INPUT_POST, 'start_time', FILTER_SANITIZE_STRING);
        $end_time = filter_input(INPUT_POST, 'end_time', FILTER_SANITIZE_STRING);
        $status = filter_input(INPUT_POST, 'status', FILTER_SANITIZE_STRING);
        
        if ($student_id && $tutor_id && $start_time && $end_time && $status) {
            try {
                $sql = "INSERT INTO appointments (student_id, tutor_id, start_time, end_time, status) 
                        VALUES (:student_id, :tutor_id, :start_time, :end_time, :status)";
                
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':student_id' => $student_id,
                    ':tutor_id' => $tutor_id,
                    ':start_time' => $start_time,
                    ':end_time' => $end_time,
                    ':status' => $status
                ]);
                
                $message = "New appointment successfully created!";
                $message_type = "success";
            } catch (PDOException $e) {
                $message = "Error creating appointment: " . $e->getMessage();
                $message_type = "error";
                error_log($e->getMessage());
            }
        } else {
            $message = "All fields are required to create an appointment.";
            $message_type = "error";
        }
    }
    
    // Update appointment status
    if (isset($_POST['update_appointment'])) {
        $appointment_id = filter_input(INPUT_POST, 'appointment_id', FILTER_VALIDATE_INT);
        
        // Replace FILTER_SANITIZE_STRING with a manual sanitization
        $status = isset($_POST['status']) ? trim($_POST['status']) : '';
        
        // Debug information - uncomment to see what's being submitted
        error_log("Update request - ID: " . print_r($appointment_id, true) . ", Status: " . print_r($status, true));
        
        if ($appointment_id === null || $appointment_id === false) {
            $message = "Invalid appointment ID for update.";
            $message_type = "error";
        } else if (empty($status)) {
            $message = "Status cannot be empty.";
            $message_type = "error";
        } else {
            try {
                $sql = "UPDATE appointments SET status = :status WHERE id = :id";
                
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':status' => $status,
                    ':id' => $appointment_id
                ]);
                
                $affected_rows = $stmt->rowCount();
                
                if ($affected_rows > 0) {
                    $message = "Appointment status updated successfully! ($affected_rows row affected)";
                    $message_type = "success";
                } else {
                    $message = "No changes were made to the appointment. The status might already be '$status'.";
                    $message_type = "info";
                }
            } catch (PDOException $e) {
                $message = "Error updating appointment: " . $e->getMessage();
                $message_type = "error";
                error_log($e->getMessage());
            }
        }
    }
    
    // Delete appointment
    if (isset($_POST['delete_appointment'])) {
        // Get the appointment ID from the POST data directly
        // Add better debugging to see what's happening
        error_log("Delete POST data: " . print_r($_POST, true));
        
        // Get appointment_id without filtering first
        $raw_id = $_POST['appointment_id'] ?? 'not set';
        error_log("Raw appointment ID: " . $raw_id);
        
        // Convert to integer afterwards
        $appointment_id = (int)$raw_id;
        error_log("Converted appointment ID: " . $appointment_id);
        
        if ($appointment_id < 0) {
            $message = "Invalid appointment ID for deletion: " . htmlspecialchars($raw_id);
            $message_type = "error";
        } else {
            try {
                $sql = "DELETE FROM appointments WHERE id = :id";
                
                $stmt = $pdo->prepare($sql);
                $stmt->execute([':id' => $appointment_id]);
                
                $affected_rows = $stmt->rowCount();
                
                if ($affected_rows > 0) {
                    $message = "Appointment deleted successfully! ($affected_rows row removed)";
                    $message_type = "success";
                } else {
                    $message = "No appointment was found with ID: $appointment_id";
                    $message_type = "error";
                }
            } catch (PDOException $e) {
                $message = "Error deleting appointment: " . $e->getMessage();
                $message_type = "error";
                error_log($e->getMessage());
            }
        }
    }
}

// Fetch all users for dropdown menus
$students = [];
$tutors = [];
try {
    $stmt = $pdo->query("SELECT id, name FROM users WHERE role = 'student'");
    $students = $stmt->fetchAll();
    
    $stmt = $pdo->query("SELECT id, name FROM users WHERE role = 'tutor'");
    $tutors = $stmt->fetchAll();
} catch (PDOException $e) {
    error_log("Error fetching users: " . $e->getMessage());
}

// Set up the query - joining appointments with users table to get both student and tutor information
$sql = "SELECT 
            a.id, 
            a.start_time, 
            a.end_time, 
            a.status,
            s.name AS student_name, 
            t.name AS tutor_name
        FROM 
            appointments a
        INNER JOIN 
            users s ON a.student_id = s.id
        INNER JOIN 
            users t ON a.tutor_id = t.id
        ORDER BY 
            a.start_time DESC";

try {
    // Execute query 
    $stmt = $pdo->query($sql);
    
    // Fetch all records as an associative array
    $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>ClassConnect - Appointments Manager</title>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8" lang="en">
    <style>
        .appointment-list, .users-list, .form-container {
            margin: 20px 0;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f0f0f0;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .message {
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .success {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .error {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        .info {
            background-color: #e8f4fd;
            border: 1px solid #b8d4f5;
            color: #004085;
        }
        .status-confirmed {
            color: green;
            font-weight: bold;
        }
        .status-pending {
            color: orange;
            font-weight: bold;
        }
        .status-canceled {
            color: red;
            text-decoration: line-through;
        }
        .status-complete {
            color: blue;
            font-weight: bold;
        }
        h1, h2 {
            margin-top: 30px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
        form {
            margin: 20px 0;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .btn {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .btn:hover {
            background-color: #0069d9;
        }
        .btn-danger {
            background-color: #dc3545;
        }
        .btn-danger:hover {
            background-color: #c82333;
        }
        .action-cell {
            display: flex;
            gap: 5px;
            min-width: 200px;
        }
    </style>
</head>
<body>
    <div class="content">
        <header>
            <div id="header-container">
                <img src="images/logo_ClassConnect_transparent.png" width="200" height="200" alt="Class Connect Logo" id="logo">
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="login.html">Login</a></li>
                        <li><a href="signup.html">Signup</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        
        <h1>Appointments Management System</h1>
        
        <?php if ($message): ?>
            <div class="message <?php echo $message_type; ?>">
                <?php echo safe_output($message); ?>
            </div>
        <?php endif; ?>
        
        <!-- Create New Appointment Form -->
        <div class="form-container">
            <h2>Create New Appointment</h2>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                <div class="form-group">
                    <label for="student_id">Student:</label>
                    <select name="student_id" id="student_id" required>
                        <option value="">Select a student</option>
                        <?php foreach ($students as $student): ?>
                            <option value="<?php echo $student['id']; ?>">
                                <?php echo safe_output($student['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="tutor_id">Tutor:</label>
                    <select name="tutor_id" id="tutor_id" required>
                        <option value="">Select a tutor</option>
                        <?php foreach ($tutors as $tutor): ?>
                            <option value="<?php echo $tutor['id']; ?>">
                                <?php echo safe_output($tutor['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="start_time">Start Time:</label>
                    <input type="datetime-local" name="start_time" id="start_time" required>
                </div>
                
                <div class="form-group">
                    <label for="end_time">End Time:</label>
                    <input type="datetime-local" name="end_time" id="end_time" required>
                </div>
                
                <div class="form-group">
                    <label for="status">Status:</label>
                    <select name="status" id="status" required>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="canceled">Canceled</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>
                
                <button type="submit" name="create_appointment" class="btn">Create Appointment</button>
            </form>
        </div>
        
        <!-- Current Appointments Table -->
        <?php if (count($appointments) > 0): ?>
            <h2>Current Appointments</h2>
            <div class="appointment-list">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Tutor</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    
                    <?php foreach ($appointments as $appointment): ?>
                        <?php 
                            // Format datetime for better readability
                            $start_time = date('M j, Y g:i A', strtotime($appointment['start_time']));
                            $end_time = date('M j, Y g:i A', strtotime($appointment['end_time']));
                            
                            // Determine status class for styling
                            $status_class = '';
                            switch($appointment['status']) {
                                case 'confirmed': $status_class = 'status-confirmed'; break;
                                case 'pending': $status_class = 'status-pending'; break;
                                case 'canceled': $status_class = 'status-canceled'; break;
                                case 'complete': $status_class = 'status-complete'; break;
                            }
                        ?>
                        <tr>
                            <td><?php echo safe_output($appointment['id']); ?></td>
                            <td><?php echo safe_output($appointment['student_name']); ?></td>
                            <td><?php echo safe_output($appointment['tutor_name']); ?></td>
                            <td><?php echo safe_output($start_time); ?></td>
                            <td><?php echo safe_output($end_time); ?></td>
                            <td class="<?php echo $status_class; ?>"><?php echo safe_output(ucfirst($appointment['status'])); ?></td>
                            <td class="action-cell">
                                <!-- Update Status Form (inline) -->
                                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" style="display:inline;">
                                    <input type="hidden" name="appointment_id" value="<?php echo $appointment['id']; ?>">
                                    <select name="status">
                                        <option value="pending" <?php echo ($appointment['status'] === 'pending') ? 'selected' : ''; ?>>Pending</option>
                                        <option value="confirmed" <?php echo ($appointment['status'] === 'confirmed') ? 'selected' : ''; ?>>Confirmed</option>
                                        <option value="canceled" <?php echo ($appointment['status'] === 'canceled') ? 'selected' : ''; ?>>Canceled</option>
                                        <option value="complete" <?php echo ($appointment['status'] === 'complete') ? 'selected' : ''; ?>>Complete</option>
                                    </select>
                                    <button type="submit" name="update_appointment" class="btn">Update</button>
                                </form>
                                
                                <!-- Delete Form (inline) -->
                                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" style="display:inline;">
                                    <input type="hidden" name="appointment_id" value="<?php echo $appointment['id']; ?>">
                                    <button type="submit" name="delete_appointment" class="btn btn-danger" 
                                            onclick="return confirm('Are you sure you want to delete this appointment?');">
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </table>
            </div>
        <?php else: ?>
            <div class="message info">
                <p>No appointments were found in the database.</p>
                <p>Please use the form above to create a new appointment.</p>
            </div>
        <?php endif; ?>
        
        <!-- Users Table -->
        <h2>Users in the System</h2>
        <?php
            $sql_users = "SELECT id, name, email, role FROM users ORDER BY role, name";
            $stmt_users = $pdo->query($sql_users);
            $users = $stmt_users->fetchAll(PDO::FETCH_ASSOC);
            
            if (count($users) > 0):
        ?>
            <div class="users-list">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td><?php echo safe_output($user['id']); ?></td>
                            <td><?php echo safe_output($user['name']); ?></td>
                            <td><?php echo safe_output($user['email']); ?></td>
                            <td><?php echo safe_output(ucfirst($user['role'])); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </table>
            </div>
        <?php else: ?>
            <p>No users found in the database.</p>
        <?php endif; ?>
        
        <footer>
            <p>Designed by Javier Sin - <a href="mailto:javier.sinpelayo@uri.edu">javier.sinpelayo@uri.edu</a></p>
            <p>&copy; 2025 ClassConnect. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>

<?php
} catch (PDOException $e) {
    // Handle database errors
    echo '<div class="error">';
    echo '<p>Sorry, a database error occurred. Please try again later.</p>';
    echo '</div>';
    
    // Log error (but don't display it to users in production)
    error_log("Database error: " . $e->getMessage());
}
?>