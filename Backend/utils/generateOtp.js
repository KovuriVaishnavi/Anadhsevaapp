const generateOtp = async () => {
    try {
      return `${Math.floor(1000 + Math.random() * 9000)}`;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = generateOtp;
  