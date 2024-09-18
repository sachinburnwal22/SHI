const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

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

window.addEventListener('load', () => {
    speak("Activating SarathiSwar", () => {
        speak("Going online", () => {
            wishMe();
        });
    });
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    recognition.start();
})

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    if (message.includes('hey') || message.includes('hello')) {
        speech.text = "Hello Boss";
    } else if (message.includes('how are you')) {
        speech.text = "I am fine boss tell me how can I help you";
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
        speak("Please hold on, I am sending your location to the provided email.", askForLocation);
        return; // Prevent further processing
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
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
    const email = "shreshthtarwey3010@gmail.com";
    
    // Construct mailto link
    const mailtoLink = `mailto:${email}?subject=Emergency Assistance&body=User's current location is: ${encodeURIComponent(location)}`;
    
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
