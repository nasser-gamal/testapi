const Todo = require("../models/todo");

const createTodo = async (req, res) => {
  try {
    const { content } = req.body;
    console.log("content", content);
    console.log(req.userId);
    const todo = new Todo({
      content,
      userId: req.userId,
    });
    todo.save();
    return res.status(200).json({ message: "Your Data Succesfully Saved" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.find({ userId: id });
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const editTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { content } = req.body;
    const todo = await Todo.findOne({ id, userId: req.userId });
    if (!todo) {
      return res.status(404).json({ message: "ToDo Not Found" });
    }
    todo.content = content;
    todo.save();
    return res.status(200).json({ message: "Content Updated Sucessfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const todo = await Todo.findOne({ _id: id, userId: req.userId });
    if (!todo) {
      return res.status(404).json({ message: "ToDo Not Found" });
    }
    Todo.findByIdAndDelete(todo._id).then((result) => {
      return res.status(200).json({ message: "Content Deleted Sucessfully" });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { createTodo, getTodo, editTodo, deleteTodo };
