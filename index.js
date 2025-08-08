/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
    // Write your code here
    // This section will run whenever the button is clicked
    document.documentElement.classList.toggle("dark-mode")
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);


/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
const submitButton = document.querySelector('#rsvp-button');
const participantsContainer = document.querySelector('#rsvp-participants');
let count = 3;

const addParticipant = (event, person) => {
  // Step 2: Write your code to manipulate the DOM here
  
  // Stop the form from reloading the page
  event.preventDefault();

  // Get the input elements and their values
  const nameInput = document.querySelector('#name');
  const locationInput = document.querySelector('#from');

  // Create a new <p> element
  const newParticipantElement = document.createElement('p');

  // Add the 'rsvp-item' class to the new element
  newParticipantElement.classList.add('rsvp-item');

  // Set the text content using the desired format
  newParticipantElement.textContent = `😈 ${person.name} from ${person.hometown} has RSVP'd.`;

  // Add the new element to the participants container
  participantsContainer.appendChild(newParticipantElement);

  // --- Corrected Counter Logic ---
  // Increment the global count variable
  count++;

  // Find the counter element and update its text
  const counterElement = document.querySelector('#rsvp-count');
  if (counterElement) {
    counterElement.textContent = `⭐ ${count} people have RSVP'd for the KSA event!`;
  }

  // Clear the input fields
  nameInput.value = '';
  locationInput.value = '';
};

// Step 3: Add a click event listener to the submit RSVP button here
// submitButton.addEventListener('click', addParticipant);

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  event.preventDefault();

  let formHasErrors = false;

  const rsvpInputs = document.getElementById("rsvp-form").elements;

  let person = {
    name: rsvpInputs[0].value, 
    email: rsvpInputs[2].value,
    hometown: rsvpInputs[1].value
  }

  for (let i = 0; i < rsvpInputs.length; i++) {
    rsvpInputs[i].classList.remove('error');
  }

  // Validate Name
  if (person.name.length < 2) {
    formHasErrors = true;
    rsvpInputs[0].classList.add('error');
  } 
  
  // email
  if (person.email.length < 2 || !person.email.includes('@')) {
    formHasErrors = true;
    rsvpInputs[2].classList.add('error');
  }

  // hometown
  if (person.hometown.length < 2) {
    formHasErrors = true;
    rsvpInputs[1].classList.add('error');
  }

  if (!formHasErrors) {
    addParticipant(event, person);
    toggleModal(person);
  }
};

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
submitButton.addEventListener('click', validateForm);

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/


const toggleModal = (person) => {
  const modal = document.getElementById('success-modal');
  const modalText = modal.querySelector('p');
  
  modal.style.display = 'flex';
  modalText.textContent = `Thank you for RSVPing, ${person.name}! We can't wait to see you at the event!`;

  // Step 5-B: Use setInterval to animate the image
  // Start the animation and save the interval ID
  let intervalId = setInterval(animateImage, 500); // Calls animateImage every 0.5 seconds

  // Set modal timeout
  setTimeout(() => {
    modal.style.display = 'none';
    // When the modal disappears, stop the animation to save resources
    clearInterval(intervalId);
  }, 5000); // Modal stays open for 5 seconds
};

// TODO: animation variables and animateImage() function

// Step 5-A: Animation variables and the animation function
const modalImage = document.querySelector('#success-modal img');
let rotateFactor = 0;

const animateImage = () => {
  // Check if the rotateFactor is 0
  if (rotateFactor === 0) {
    // If it is, set it to -10
    rotateFactor = -10;
  } else {
    // If not, set it back to 0
    rotateFactor = 0;
  }

  // Apply the rotation to the image
  // Note the use of backticks ` ` for the template literal string
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};