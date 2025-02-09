// ================================
// Selecting HTML Elements
// ================================

// Select the main heading (<h1>) of the page.
const mainHeader = document.querySelector('h1');

// Select the introductory paragraph right after the main header.
// The ">" selects the direct <p> childs of ".content". It's only returning the first <p> because querySelector() returns the first match.
const introParagraph = document.querySelector('.content > p'); 

// Select the first button in the ".content" div (the "Get Started" button).
const getStartedButton = document.querySelector('.content > button');

// Select the unordered list in the first <section> that shows "Client's Goals".
const clientsGoalsList = document.querySelector('section ul');

// ================================
// Updating Text & Markup Immediately
// ================================

// Update the main heading to welcome visitors.
mainHeader.textContent = "Welcome to ClassConnect!";

// Update the introductory paragraph with a brief overview.
introParagraph.textContent = "Discover a smarter way to connect with expert tutors, book appointments, and enhance your learning experience.";

// ================================
// Event Handling: "Get Started" Button Click
// ================================

/**
 * Event handler function for the "Get Started" button click event.
 * This function:
 *   - Changes the main heading text to guide the user.
 *   - Appends a new goal to the "Client's Goals" list.
 *   - Changes the button text to provide immediate feedback.
 */
function onGetStartedClick() {
  // Update the main header to signal the start of the user's journey.
  mainHeader.textContent = "Your Tutoring Journey Begins Now!";

  // Create a new list item element to add another client goal.
  const newGoal = document.createElement('li');
  newGoal.textContent = "Innovate your learning with interactive sessions.";
  
  // Append the new goal to the existing goals list.
  clientsGoalsList.appendChild(newGoal);

  // Update the button text to reflect the action.
  getStartedButton.textContent = "Let's Go!";
}

// Attach the event listener to the "Get Started" button.
getStartedButton.addEventListener('click', onGetStartedClick);
