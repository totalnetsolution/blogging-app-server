import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blogImage: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Blog', blogSchema);
