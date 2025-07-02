const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Create our JWT
    const token = jwt.sign({
      userId: req.user._id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log("CLIENT_REDIRECT is:", process.env.CLIENT_REDIRECT); 
res.redirect(`${process.env.CLIENT_REDIRECT}?token=${token}`);


  }
);

module.exports = router;
