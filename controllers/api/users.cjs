const jwt = require('jsonwebtoken');
const User = require('../../models/user.cjs');

module.exports = {
  create,
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);
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
