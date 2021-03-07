import jwt from 'jsonwebtoken';

// function to take in the user object
export function generateJWT(user) {
  const tokenData = { username: user.username, id: user._id };
  // create the token
  return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET);
}

// Require login for any routes that the user needs to be logged in to access
export function requireLogin(req, res, next) {
  const token = decodeToken(req);
  // If there is no token, then return an error letting the user know they must login
  if (!token) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  // Otherwise, we know we have a valid token and the user is logged in
  next();
}

// Decrypt the token
export function decodeToken(req) {
  // Obtain the token from the headers
  const token = req.headers.authorization || req.headers ['authorization'];

  // If there is no token, return null, otherwise decrypt the token
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}