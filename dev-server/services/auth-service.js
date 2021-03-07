import jwt from 'jsonwebtoken';

// function to take in the user object
export function generateJWT(user) {
  const tokenData = { username: user.username, id: user._id };
  // create the token
  return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET);
}