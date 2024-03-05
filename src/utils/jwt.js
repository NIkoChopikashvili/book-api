const jwt = require("jsonwebtoken");

module.exports.generateJwt = (user, secret, res) => {
  const token = jwt.sign(
    {
      userId: user.id,
      username: user?.username,
    },
    secret
  );

  res.cookie("token", token, {
    maxAge: 24 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return token;
};
