const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signToken } = require('../utils/jwt');


// GET /api/auth/google -> redirect to Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


// Google callback
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
// req.user is the user from our DB
const token = signToken(req.user);
// redirect to frontend with token (choose method: query param, fragment or cookie)
const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${token}`;
res.redirect(redirectUrl);
});


// Optional: endpoint to get profile with Bearer token
const jwt = require('jsonwebtoken');
router.get('/me', (req, res) => {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ message: 'No auth header' });
const token = auth.split(' ')[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
return res.json({ user: payload });
} catch (err) {
return res.status(401).json({ message: 'Invalid token' });
}
});


module.exports = router;