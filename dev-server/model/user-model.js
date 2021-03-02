import mongoose from 'mongoose';
import { StringUtil } from '../utilities/string-util';
import bcrypt from 'bcrypt-nodejs';

// Define the user schema
const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String
});
userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function() {
  const firstname = StringUtil.capitalize(this.firstname.toLowerCase());
  const lastname = StringUtil.capitalize(this.lastname.toLowerCase());
  return `${firstname} ${lastname}`;
});
// pre-save method runs before saving a user to the database
// setting user, first, and last name to lowercase for consistency
userSchema.pre('save', function(next) {
  this.username = this.username.toLowerCase();
  this.firstname = this.firstname.toLowerCase();
  this.lastname = this.lastname.toLowerCase();
  // accept a password and then encrypt it using bcrypt
  const unencryptedPassword = this.password;
  this.password=bcrypt.hashSync(unencryptedPassword);
  next(); // continue saving the user
})

export default mongoose.model('user', userSchema);