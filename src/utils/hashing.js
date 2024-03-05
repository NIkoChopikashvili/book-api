const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  const hashedPwd = await bcrypt.hash(password, 12);
  return hashedPwd;
};

exports.comparePassword = async (password, userPwd) => {
  try {
    const isCorrect = await bcrypt.compare(password, userPwd);
    return isCorrect;
  } catch (error) {
    console.log(error);
    return false;
  }
};
