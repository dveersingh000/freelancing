const sendSms = async (mobile, message) => {
    // Integrate an SMS service like Twilio or Nexmo here
    console.log(`Sending SMS to ${mobile}: ${message}`);
};

module.exports = sendSms;
