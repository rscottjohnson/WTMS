import { StringUtil } from '../../utilities/string-util';
import User from '../../model/user-model';

export function index(req, res) {
  const validation = validateIndex(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }
  // find the user by username (login)
  User.findOne({ username: req.body.username.toLowerCase() }, 
  (error, user) => {
    // if error, return error
    if (error) {
      return res.status(500).json();
    }

    // if no user is returned, return error
    if (!user) {
      return res.status(401).json();
    }

    // set a constant for password comparison
    const passwordsEqual = User.passwordEqual(req.body.password, user.password);
    // if the passwords do not match, return an error
    if (!passwordsEqual) {
      return res.status(401).json();
    }
    return res.status(200).json();
  });
}

function validateIndex(body) {
  let errors = '';

  if (StringUtil.isEmpty(body.username)) {
    errors += 'Username is required. ';
  }

  if (StringUtil.isEmpty(body.password)) {
    errors += 'Password is required. ';
  }

  return {
    isValid: String.isEmpty(errors),
    message: errors
  }
}