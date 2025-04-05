const validator = require("validator");

const validateSignup = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) throw new Error("Name is not Valid");
  else if (firstName.length < 4 || firstName.lengyh > 50) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};

module.exports = {
  validateSignup,
};
