// const Post = require("../models/post");
// const { validationResult } = require("express-validator");
// const deleteImage = require("../utils/file");
// const User = require("../models/user");

// const getPosts = async (req, res) => {
//   try {
//     const page = req.query.page || 1;
//     const itemPerPage = 2;
//     const totalItems = await Post.find().countDocuments();

//     const posts = await Post.find()
//       .skip((page - 1) * itemPerPage)
//       .limit(itemPerPage)
//       .populate("author", "firstName lastName ");
//     return res.status(200).json({
//       posts,
//       hasNextPage: page * itemPerPage < totalItems,
//       hasPreviousPage: page > 1,
//       nextPage: page + 1,
//       previousPage: page - 1,
//       currentPage: page,
//       totalItems,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// const getPost = async (req, res) => {
//   try {
//     const id = req.params.postId;
//     const post = await Post.findById(id).populate(
//       "author",
//       "firstName lastName"
//     );
//     if (!post) {
//       return res.status(404).json({
//         errorMessage:
//           "Post Not Found May be it's Deleted Or You Don't have Access This Post",
//       });
//     }
//     return res.status(200).json(post);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// const createPost = async (req, res) => {
//   try {
//     const { content } = req.body;
//     const image = req.file;
//     const author = req.userId;
//     const message = validationResult(req);

//     if (!message.isEmpty()) {
//       return res.status(422).json({ errorMessage: message.array()[0] });
//     }
//     if (!image) {
//       return res.status(400).json({ errorMessage: "No Image Provieded" });
//     }

//     const post = new Post({
//       content,
//       author,
//       image: image.path,
//     });
//     post.save();

//     const user = await User.findById(author);
//     user.posts.push(post._id);
//     user.save();

//     return res.status(201).json({ message: "Post Created Successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// const editPost = async (req, res) => {
//   try {
//     const { content } = req.body;
//     const author = req.userId;
//     const postId = req.params.postId;

//     const post = await Post.findOne({ _id: postId }).populate("author");
//     if (!post) {
//       return res.status(404).json({
//         errorMessage: "Post Not Found May be It's Deleted ",
//       });
//     }

//     if (post.author._id.toString() !== author.toString()) {
//       return res.status(401).json({
//         errorMessage: "You Don't Have Access To Edit This Post",
//       });
//     }

//     if (req.file) {
//       const path = post.image;
//       deleteImage(path);
//     }

//     post.content = content;
//     post.image = req.file ? req.file.path : post.image;

//     post.save();
//     return res.status(200).json({ message: "Post Updated Successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// const deletePost = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const post = await Post.findById(postId).populate("author");

//     if (!post) {
//       return res
//         .status(404)
//         .json({ errorMessage: "Post Not Found May be it's Deleted" });
//     }

//     if (post.author._id.toString() !== req.userId.toString()) {
//       return res
//         .status(401)
//         .json({ errorMessage: "You Don't Have Access To Delete This Post" });
//     }

//     deleteImage(post.image);

//     const user = await User.findById(req.userId);
//     user.posts.pull(postId);
//     user.save();

//     Post.findByIdAndDelete(postId).then((result) => {
//       return res.status(200).json({ message: "Post Deleted Successfully" });
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// module.exports = {
//   getPosts,
//   getPost,
//   createPost,
//   editPost,
//   deletePost,
// };
