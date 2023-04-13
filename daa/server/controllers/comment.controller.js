const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      const { comentario, email } = req.body;
      const newComment = new Comment({ comentario, email });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find({});
      res.send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
