const jwt = require('jsonwebtoken');
const User = require('../../models/user.cjs');

module.exports = {
  create,
};

async function create(req, res) {
  try {
    // Add the user to the database:
    const user = await User.create(req.body);
    // token will be a string:
    const token = createJWT(user);
    // Use res.json to send back just a string:
    // (the client code needs to take this into consideration)
    res.json(token);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Helper functions:
function createJWT(user) {
  return jwt.sign(
    // Data payload:
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}
