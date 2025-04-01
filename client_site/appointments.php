<?php
// appointments.php
// Author: Javier Sin
// Demonstrates using a class to represent Appointment objects for ClassConnect.

/**
 * Class Appointment
 * Represents a tutoring session with properties and methods
 * that can be used to manage its state.
 */
class Appointment {
    // Properties (private for encapsulation)
    private string $tutor;
    private string $student;
    private string $subject;
    private string $date;
    private string $startTime;
    private string $endTime;
    private string $location;
    private string $status;

    /**
     * Constructor to initialize an Appointment object.
     *
     * @param string $tutor
     * @param string $student
     * @param string $subject
     * @param string $date
     * @param string $startTime
     * @param string $endTime
     * @param string $location
     * @param string $status
     */
    public function __construct(
        string $tutor,
        string $student,
        string $subject,
        string $date,
        string $startTime,
        string $endTime,
        string $location,
        string $status = "scheduled"
    ) {
        $this->tutor = $tutor;
        $this->student = $student;
        $this->subject = $subject;
        $this->date = $date;
        $this->startTime = $startTime;
        $this->endTime = $endTime;
        $this->location = $location;
        $this->status = $status;
    }

    // Getter methods for each property
    public function getTutor(): string {
        return $this->tutor;
    }

    public function getStudent(): string {
        return $this->student;
    }

    public function getSubject(): string {
        return $this->subject;
    }

    public function getDate(): string {
        return $this->date;
    }

    public function getStartTime(): string {
        return $this->startTime;
    }

    public function getEndTime(): string {
        return $this->endTime;
    }

    public function getLocation(): string {
        return $this->location;
    }

    public function getStatus(): string {
        return $this->status;
    }

    // Setter for status (if you want direct updates)
    public function setStatus(string $status): void {
        $this->status = $status;
    }

    /**
     * book()
     * Creates a new appointment by setting its status to "scheduled".
     */
    public function book(): void {
        $this->status = "scheduled";
    }

    /**
     * cancel()
     * Cancels the appointment by updating the status to "canceled".
     */
    public function cancel(): void {
        $this->status = "canceled";
    }

    /**
     * reschedule()
     * Updates date, startTime, endTime, and resets status to "scheduled".
     *
     * @param string $newDate
     * @param string $newStartTime
     * @param string $newEndTime
     */
    public function reschedule(string $newDate, string $newStartTime, string $newEndTime): void {
        $this->date = $newDate;
        $this->startTime = $newStartTime;
        $this->endTime = $newEndTime;
        $this->status = "scheduled";
    }

    /**
     * checkStatus()
     * Returns the current status of the appointment.
     *
     * @return string
     */
    public function checkStatus(): string {
        return $this->status;
    }
}

// --- Creating Objects --- //

// 1) Tutor Claudia & Student Javichu
$appt1 = new Appointment(
    "Tutor Claudia",
    "Student Javichu",
    "Mathematics",
    "2025-05-10",
    "10:00 AM",
    "11:30 AM",
    "61 Upper College Rd, Kingston, RI 02881"
);

// 2) Tutor Javier & Student Ana
$appt2 = new Appointment(
    "Tutor Javier",
    "Student Ana",
    "Chemistry",
    "2025-05-12",
    "2:00 PM",
    "3:00 PM",
    "Online (Zoom)"
);

// Perform some actions on the appointments
$appt1->cancel(); // Example: Appointment 1 was canceled
$appt2->reschedule("2025-05-13", "3:00 PM", "4:00 PM"); // Appt 2 is rescheduled

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ClassConnect Appointments</title>
    <style>
        /* Basic inline CSS for styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f7ff;
            margin: 0;
            padding: 20px;
        }
        h1 {
            margin-bottom: 1rem;
        }
        .appointment {
            background-color: #ffffff;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .appointment h2 {
            margin-top: 0;
        }
        .label {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>ClassConnect - Appointment Objects</h1>
    <p>This page demonstrates the Appointment class with properties and methods.</p>

    <!-- Display information for Appointment 1 -->
    <div class="appointment">
        <h2>Appointment 1</h2>
        <p><span class="label">Tutor:</span> <?php echo $appt1->getTutor(); ?></p>
        <p><span class="label">Student:</span> <?php echo $appt1->getStudent(); ?></p>
        <p><span class="label">Subject:</span> <?php echo $appt1->getSubject(); ?></p>
        <p><span class="label">Date:</span> <?php echo $appt1->getDate(); ?></p>
        <p><span class="label">Time:</span> <?php echo $appt1->getStartTime() . " - " . $appt1->getEndTime(); ?></p>
        <p><span class="label">Location:</span> <?php echo $appt1->getLocation(); ?></p>
        <p><span class="label">Status:</span> <?php echo $appt1->checkStatus(); ?></p>
        <p><em>Note:</em> I called <code>$appt1->cancel()</code> to change its status to "canceled".</p>
    </div>

    <!-- Display information for Appointment 2 -->
    <div class="appointment">
        <h2>Appointment 2</h2>
        <p><span class="label">Tutor:</span> <?php echo $appt2->getTutor(); ?></p>
        <p><span class="label">Student:</span> <?php echo $appt2->getStudent(); ?></p>
        <p><span class="label">Subject:</span> <?php echo $appt2->getSubject(); ?></p>
        <p><span class="label">Date:</span> <?php echo $appt2->getDate(); ?></p>
        <p><span class="label">Time:</span> <?php echo $appt2->getStartTime() . " - " . $appt2->getEndTime(); ?></p>
        <p><span class="label">Location:</span> <?php echo $appt2->getLocation(); ?></p>
        <p><span class="label">Status:</span> <?php echo $appt2->checkStatus(); ?></p>
        <p><em>Note:</em> I called <code>$appt2->reschedule()</code> to update its date/time and reset status to "scheduled".</p>
    </div>
</body>
</html>
