const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({message:error})
    }
});

// submit post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save()
        res.json(savedPost);
    } catch (error) {
        res.json({message:error})
    }
    
});

// get specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json({message:error});
    }
});

// delete specific post
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.remove({_id: req.params.postId});
        res.json(post);
    } catch (error) {
        res.json({message:error});
    }
});

// update specific post
router.patch('/:postId', async (req, res) => {
    try {
        const post = await Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.title, description: req.body.description}});
        res.json(post);
    } catch (error) {
        res.json({message:error});
    }
});

module.exports = router;