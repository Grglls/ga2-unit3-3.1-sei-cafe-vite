const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user.cjs');

module.exports = {
  create,
  login,
  checkToken
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

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error(); 
    res.json( createJWT(user) ); 
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent:
  console.log('req.user', req.user);
  res.json(req.exp);
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
