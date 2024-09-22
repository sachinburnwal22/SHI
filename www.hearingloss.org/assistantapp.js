/*const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let isEmergencyMode = false; // Track whether the app is in emergency mode
let userEmail = ''; // Store user's email address
let emailTimeout; // Variable for the timeout
let emailInputVisible = false; // Track if the email input is currently visible

function speak(sentence, callback) {
    const text_speak = new SpeechSynthesisUtterance(sentence);
    text_speak.rate = 1;
    text_speak.pitch = 1;

    text_speak.onend = () => {
        if (callback) callback();
    };

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if (hr >= 0 && hr < 12) {
        speak("Good Morning Boss");
    } else if (hr == 12) {
        speak("Good Noon Boss");
    } else if (hr > 12 && hr <= 17) {
        speak("Good Afternoon Boss");
    } else {
        speak("Good Evening Boss");
    }
}

// Function to handle the email input
function handleEmailInput() {
    if (emailInputVisible) return; // Exit if the input is already visible
    emailInputVisible = true; // Set the flag to true

    // Create an input element dynamically
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Enter your email for emergency alerts";
    emailInput.style.position = "absolute";
    emailInput.style.top = "10px"; // Position at the top
    emailInput.style.left = "50%";
    emailInput.style.transform = "translate(-50%, 0)";
    emailInput.style.zIndex = "9999"; // Ensure it appears on top of everything
    emailInput.style.padding = "10px";
    emailInput.style.border = "1px solid #00bcd4";
    emailInput.style.borderRadius = "5px";
    emailInput.style.backgroundColor = "#fff";
    document.body.appendChild(emailInput);

    // Set a timeout of 15 seconds
    emailTimeout = setTimeout(() => {
        if (!userEmail) {
            userEmail = "shreshthtarwey3010@gmail.com"; // Default email
            speak("No email entered, default email will be used.");
            document.body.removeChild(emailInput); // Remove the input box after timeout
            emailInputVisible = false; // Reset the flag
        }
    }, 15000); // 15 seconds timeout

    // Add an event listener for user input
    emailInput.addEventListener("input", (event) => {
        userEmail = event.target.value; // Update userEmail while typing
        clearTimeout(emailTimeout); // Clear the timer if user is typing
    });

    // Add an event listener to close the input if the user clicks outside
    emailInput.addEventListener("blur", () => {
        if (!userEmail) {
            userEmail = "shreshthtarwey3010@gmail.com"; // Default email if none entered
            speak("No email entered, default email will be used.");
        }
        document.body.removeChild(emailInput); // Remove the input box
        emailInputVisible = false; // Reset the flag
    });
}

window.addEventListener('load', () => {
    handleEmailInput(); // Call the email input handler on page load

    speak("Activating SarathiSwar", () => {
        speak("Going online", () => {
            wishMe();
        });
    });
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;

    if (isEmergencyMode) {
        sendEmergencyMail(transcript); // Handle emergency message
    } else {
        speakThis(transcript.toLowerCase()); // Handle normal commands
    }
}

btn.addEventListener('click', () => {
    startRecognition();
});

function startRecognition() {
    if (recognition) {
        recognition.stop(); // Stop any ongoing recognition
        recognition = new SpeechRecognition(); // Create a new instance
        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            content.textContent = transcript;

            if (isEmergencyMode) {
                sendEmergencyMail(transcript);
            } else {
                speakThis(transcript.toLowerCase());
            }
        };
        recognition.start(); // Start recognition
    }
}

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    if (message.includes('hey') || message.includes('hello')) {
        speech.text = "Hello Boss";
    } else if (message.includes('how are you')) {
        speech.text = "I am fine boss. How can I help you?";
    } else if (message.includes('name')) {
        speech.text = "My name is SarathiSwar";
    } else if (message.includes('open google')) {
        window.open("https://google.com", "_blank");
        speech.text = "Opening Google";
    } else if (message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        speech.text = "Opening Instagram";
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speech.text = "This is what I found on the internet regarding " + message;
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        speech.text = "This is what I found on Wikipedia regarding " + message;
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speech.text = time;
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speech.text = date;
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        speech.text = "Opening Calculator";
    } else if (message.includes('speech to text')) {
        window.open("Txt_to_sph.html", "_blank");
        speech.text = "Opening Speech to Text";
    } else if (message.includes('text to speech')) {
        window.open("text_speech.html", "_blank");
        speech.text = "Opening Text to Speech";
    } else if (message.includes('mayday') || message.includes('help')) {
        handleEmergency();
        return; // Prevent further processing
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speech.text = "I found some information for " + message + " on Google";
    }

    window.speechSynthesis.speak(speech);
}

function handleEmergency() {
    isEmergencyMode = true; // Set to emergency mode
    speak("Please hold on, I am sending your location to the provided email.", () => {
        speak("Please tell the message to add to the emergency mail.", () => {
            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const userMessage = event.results[current][0].transcript;
                sendEmergencyMail(userMessage);
                recognition.stop(); // Stop recognition after handling the message
            };
            recognition.start(); // Start listening for the emergency message
        });
    });
}

function sendEmergencyMail(userMessage) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            sendLocation(position, userMessage);
        }, showError);
    } else {
        speak("Geolocation is not supported by this browser.");
    }
}

function sendLocation(position, userMessage) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = `Latitude: ${lat}, Longitude: ${lon}`;
    
    // Use the email entered by the user or fallback to default
    const email = userEmail || "shreshthtarwey3010@gmail.com";  // Fallback email if none entered
    
    // Construct mailto link with user's message and location
    const mailtoLink = `mailto:${email}?subject=Emergency Assistance&body=User's current location: ${encodeURIComponent(location)}%0D%0AUser's message: ${encodeURIComponent(userMessage)}`;
    
    // Redirect to mailto link
    window.location.href = mailtoLink;

    // Notify user
    speak("Sending your location and message to the provided email.");

    // Reset emergency mode and restart recognition for normal use
    isEmergencyMode = false;
    startRecognition();
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            speak("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            speak("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            speak("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            speak("An unknown error occurred.");
            break;
    }
}*/

const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

// Variable to store the emergency email
let emergencyEmail = "";

// Function to ask for the emergency email
function askForEmergencyEmail() {
  emergencyEmail = prompt("Please enter your emergency email address:", "");
  if (!emergencyEmail) {
    speak("Emergency email is not set. Please provide an email when asked.");
  } else {
    speak("Emergency email has been set.");
  }
}

function speak(sentence, callback) {
  const text_speak = new SpeechSynthesisUtterance(sentence);
  text_speak.rate = 1;
  text_speak.pitch = 1;

  text_speak.onend = () => {
    if (callback) callback();
  };

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hr = day.getHours();

  if (hr >= 0 && hr < 12) {
    speak("Good Morning Boss");
  } else if (hr == 12) {
    speak("Good noon Boss");
  } else if (hr > 12 && hr <= 17) {
    speak("Good Afternoon Boss");
  } else {
    speak("Good Evening Boss");
  }
}

window.addEventListener("load", () => {
  speak("Activating SarathiSwar", () => {
    speak("Going online", () => {
      wishMe();
      // Prompt for emergency email on page load
      askForEmergencyEmail();
    });
  });
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  speakThis(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
});

function speakThis(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;

  if (message.includes("hey") || message.includes("hello")) {
    speech.text = "Hello Boss";
  } else if (message.includes("how are you")) {
    speech.text = "I am fine boss tell me how can I help you";
  } else if (message.includes("name")) {
    speech.text = "My name is SarathiSwar";
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    speech.text = "Opening Google";
  } else if (message.includes("open instagram")) {
    window.open("https://instagram.com", "_blank");
    speech.text = "Opening Instagram";
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    speech.text = "This is what I found on the internet regarding " + message;
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
      "_blank"
    );
    speech.text = "This is what I found on Wikipedia regarding " + message;
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speech.text = time;
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    speech.text = date;
  } else if (message.includes("calculator")) {
    window.open("Calculator:///");
    speech.text = "Opening Calculator";
  } else if (message.includes("speech to text")) {
    window.open("Txt_to_sph.html", "_blank");
    speech.text = "Opening Speech to Text";
  } else if (message.includes("text to speech")) {
    window.open("text_speech.html", "_blank");
    speech.text = "Opening Text to Speech";
  } else if (message.includes("mayday") || message.includes("help")) {
    speak(
      "Please hold on, I am sending your location to the provided email.",
      askForLocation
    );
    return; // Prevent further processing
  } else {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    speech.text = "I found some information for " + message + " on Google";
  }

  window.speechSynthesis.speak(speech);
}

function askForLocation() {
  // Ask for user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation, showError);
  } else {
    speak("Geolocation is not supported by this browser.");
  }
}

function sendLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const location = `Latitude: ${lat}, Longitude: ${lon}`;

  if (!emergencyEmail) {
    speak("No emergency email provided.");
    return;
  }

  // Construct mailto link
  const mailtoLink = `mailto:${emergencyEmail}?subject=Emergency Assistance&body=User's current location is: ${encodeURIComponent(
    location
  )}`;

  // Redirect to mailto link
  window.location.href = mailtoLink;

  // Notify user
  speak("Sending your location to the provided email.");
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      speak("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      speak("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      speak("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      speak("An unknown error occurred.");
      break;
  }
}
