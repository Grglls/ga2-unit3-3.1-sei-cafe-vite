const User = require('../../models/user');

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