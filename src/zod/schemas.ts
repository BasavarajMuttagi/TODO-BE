import { z } from "zod";

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
});

type userLoginType = z.infer<typeof userLoginSchema>;

const userSignUpSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
  confirmpassword: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
});

type userSignUpType = z.infer<typeof userSignUpSchema>;

const createTodoSchema = z.object({
  label: z.string().min(1),
  description: z.string(),
});

type createTodoType = z.infer<typeof createTodoSchema>;

const updateTodoSchema = z.object({
  label: z.string().min(1).optional(),
  description: z.string().optional(),
  isComplete: z.boolean().optional(),
  isImportant: z.boolean().optional(),
});

type updateTodoType = z.infer<typeof updateTodoSchema>;

export {
  userLoginSchema,
  userSignUpSchema,
  createTodoSchema,
  updateTodoSchema,
  userLoginType,
  userSignUpType,
  createTodoType,
  updateTodoType,
};
