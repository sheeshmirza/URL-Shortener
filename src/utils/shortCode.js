const shortCode = () => {
  // shortCode return string (length -> 6)
  return Math.random().toString(36).substring(2, 8);
};

module.exports = shortCode;