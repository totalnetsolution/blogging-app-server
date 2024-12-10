import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
