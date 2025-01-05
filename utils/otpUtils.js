const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const verifyOTP = (inputOTP, storedOTP, expiry) => {
  if (storedOTP === inputOTP && new Date() < expiry) {
    return true;
  }
  return false;
};

module.exports = { generateOTP, verifyOTP };
