import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import Blog from '../models/blog.js';
import User from '../models/User.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Create Blog
router.post('/', upload.single('blogImage'), async (req, res) => {
  try {
    const { title, description, postedBy } = req.body;

    let blogImageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      blogImageUrl = result.secure_url;
    }

    const blog = new Blog({ title, description, postedBy, blogImage: blogImageUrl });
    await blog.save();

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('postedBy', 'username fullName');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('postedBy', 'username fullName');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
