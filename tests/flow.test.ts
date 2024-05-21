import { PrismaClient, Todo } from "@prisma/client";
import supertest from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import App from "..";
import { createTodoType, updateTodoType } from "../src/zod/schemas";

describe("Integration Tests", () => {
  let testUser: {
    fullname: string;
    email: string;
    password: string;
    confirmpassword: string;
  };

  let createTodoData: createTodoType;
  let updateTodoData: updateTodoType;
  let currentTodo: Todo;
  let prisma: PrismaClient;
  let token: string;
  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    testUser = {
      fullname: "Integration Test User",
      email: "integration@test.com",
      password: "password",
      confirmpassword: "password",
    };
  });

  afterAll(async () => {
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("should sign up", async () => {
    const result = await supertest(App).post("/auth/signup").send(testUser);
    expect(result.status).toBe(201);
    expect(result.body.message).toBe("Account Created SuccessFully!");
  });

  it("should login", async () => {
    const result = await supertest(App).post("/auth/login").send(testUser);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    token = result.body.token;
  });

  it("should create todo", async () => {
    createTodoData = { label: "Test Todo", description: "Love India!" };
    const result = await supertest(App)
      .post("/todo/create")
      .set("Authorization", "Bearer " + token)
      .send(createTodoData);
    expect(result.status).toBe(201);
    expect(result.body.id).toBeTypeOf("string");
    currentTodo = result.body;
  });

  it("should update todo", async () => {
    updateTodoData = {
      label: "Test Todo updated",
      description: "Love India! Always",
    };
    const result = await supertest(App)
      .put(`/todo/update/${currentTodo.id}`)
      .set("Authorization", "Bearer " + token)
      .send(updateTodoData);
    expect(result.status).toBe(200);
  });

  it("should get todo by id", async () => {
    const result = await supertest(App)
      .get(`/todo/getTodoById/${currentTodo.id}`)
      .set("Authorization", "Bearer " + token);
    expect(result.status).toBe(200);
  });

  it("should get all todos", async () => {
    const result = await supertest(App)
      .get(`/todo/getAllTodos`)
      .set("Authorization", "Bearer " + token);
    expect(result.status).toBe(200);
  });

  it("should delete todo by id", async () => {
    const result = await supertest(App)
      .delete(`/todo/hardDeleteById/${currentTodo.id}`)
      .set("Authorization", "Bearer " + token);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Todo deleted successfully");
  });
});
