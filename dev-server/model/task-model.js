import mongoose from 'mongoose';

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: String,
  body: String,
  dueDate: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } // author will come from the user model
});

export default mongoose.model('task', taskSchema);