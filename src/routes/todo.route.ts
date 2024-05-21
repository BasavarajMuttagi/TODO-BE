import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  hardDeleteTodo,
  updateTodo,
} from "../controllers/todo.controller";
import { validate } from "../middlewares/validation.middleware";
import { createTodoSchema, updateTodoSchema } from "../zod/schemas";
import { validateToken } from "../middlewares/auth.middleware";

const TodoRouter = express.Router();

TodoRouter.post(
  "/create",
  validateToken,
  validate(createTodoSchema),
  createTodo,
);
TodoRouter.put(
  "/update/:id",
  validateToken,
  validate(updateTodoSchema),
  updateTodo,
);

TodoRouter.get("/getTodoById/:id", validateToken, getTodoById);
TodoRouter.get("/getAllTodos", validateToken, getAllTodos);
TodoRouter.delete("/hardDeleteById/:id", validateToken, hardDeleteTodo);

export { TodoRouter };
