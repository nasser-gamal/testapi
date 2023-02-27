const {
  createTodo,
  getTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todo");

const router = require("express").Router();
const isAuth = require("../middleware/is-auth");

router.post("/create", isAuth, createTodo);
router.get("/getAll/:id", isAuth, getTodo);
router.put("/edit/:id", isAuth, editTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;