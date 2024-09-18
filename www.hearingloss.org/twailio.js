// Load required libraries
const express = require("express");
const twilio = require("twilio");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Set up Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const emergencyNumber = process.env.EMERGENCY_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle SMS requests
app.post("/send-sms", (req, res) => {
  const { message } = req.body;

  // Use Twilio to send SMS
  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: emergencyNumber,
    })
    .then((message) => {
      console.log("Message sent: ", message.sid);
      res.status(200).json({ success: true, sid: message.sid });
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
      res.status(500).json({ success: false, error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
