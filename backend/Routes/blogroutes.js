/** @format */

const multer = require('multer');
const Blog = require('../Models/blog');
const ensureAuthentication = require('../Middlewares/auth');
const express = require('express');
const mongoose = require('mongoose');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const blogRouter = express.Router();

// Create a new blog post
blogRouter.post(
	'/create_blogs',
	ensureAuthentication,
	upload.single('image'),
	async (req, res) => {
		try {
			console.log('Authenticated User ID:', req.userId);
			console.log('Received Data:', req.body);

			const {
				userId,
				title,
				author,
				category,
				content,
				metaTitle,
				metaDescription,
				imagePreview,
			} = req.body;
			const image = req.file ? req.file.buffer.toString('base64') : null;

			if (!title || !content || !image) {
				return res.status(400).json({ message: 'All fields are required' });
			}

			const newBlog = new Blog({
				userId: req.userId,
				title,
				author,
				category,
				content,
				metaTitle,
				metaDescription,
				image,
				imagePreview,
			});

			await newBlog.save();
			res
				.status(201)
				.json({ message: 'Blog created successfully!', blog: newBlog });
		} catch (err) {
			res
				.status(500)
				.json({ message: 'Error creating blog', error: err.message });
		}
	}
);

blogRouter.get("/:userId", ensureAuthentication, async (req, res) => {
  try {
    console.log("Received User ID: " + req.params.userId);
    
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    const blogs = await Blog.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
});

blogRouter.get('/user_blogs/api', ensureAuthentication, async (req, res) => {
	try {
		const userId = req.userId;
		if (!userId) {
			return res.status(400).json({ message: 'User ID is required' });
		}

		const blogs = await Blog.find({ userId: new mongoose.Types.ObjectId(userId) });
		if (blogs.length === 0) {
			return res.status(404).json({ message: 'No blogs found for this user' });
		}

		res.status(200).json(blogs);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching blogs', error: err.message });
	}
});


blogRouter.put('/:userId', ensureAuthentication, async (req, res) => {
	try {
		const {
			title,
			author,
			category,
			content,
			metaTitle,
			metaDescription,
			image,
			imagePreview,
		} = req.body;
		const userId = req.userId;

		const updatedBlog = await Blog.findOneAndUpdate(
			{ userId: new mongoose.Types.ObjectId(userId) },
			{
				title,
				author,
				category,
				content,
				metaTitle,
				metaDescription,
				image,
				imagePreview,
			},
			{ new: true }
		);

		if (!updatedBlog) {
			return res
				.status(404)
				.json({ message: 'Blog not found or unauthorized' });
		}
		res
			.status(200)
			.json({ message: 'Blog updated successfully', blog: updatedBlog });
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error updating blog', error: err.message });
	}
});

blogRouter.delete('/:userId', ensureAuthentication, async (req, res) => {
	try {
		const userId = req.userId;

		const deletedBlog = await Blog.findOneAndDelete({userId: new mongoose.Types.ObjectId(userId)});

		if (!deletedBlog) {
			return res
				.status(404)
				.json({ message: 'Blog not found or unauthorized' });
		}
		res.status(200).json({ message: 'Blog deleted successfully' });
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error deleting blog', error: err.message });
	}
});

module.exports = blogRouter;
