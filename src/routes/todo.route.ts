import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  hardDeleteTodo,
  updateTodo,
} from "../controllers/todo.controller";
import { validate } from "../middlewares/validation.middleware";
import { createTodoSchema } from "../zod/schemas";

const TodoRouter = express.Router();

TodoRouter.post("/create", validate(createTodoSchema), createTodo);
TodoRouter.post("/update", updateTodo);
TodoRouter.post("/hardDeleteById", hardDeleteTodo);
TodoRouter.get("/getTodoById", getTodoById);
TodoRouter.get("/getAllTodos", getAllTodos);

export { TodoRouter };
