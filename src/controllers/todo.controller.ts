import prisma from "../../prisma/PrismaClient";
import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { createTodoType, updateTodoType } from "../zod/schemas";

const createTodo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const { label, description } = req.body as createTodoType;
    const newTodo = await prisma.todo.create({
      data: {
        userId,
        label,
        description,
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const { id } = req.params;
    const { label, description, isComplete, isImportant } =
      req.body as updateTodoType;
    const updatedTodo = await prisma.todo.update({
      where: { id, userId },
      data: { label, description, isComplete, isImportant },
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

const getTodoById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: { id, userId },
    });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todo" });
  }
};

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const todos = await prisma.todo.findMany({
      where: { userId },
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
};

const hardDeleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id },
    });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
export { createTodo, updateTodo, hardDeleteTodo, getTodoById, getAllTodos };
