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
  label: z.string(),
  description: z.string(),
});

type createTodoType = z.infer<typeof createTodoSchema>;

export {
  userLoginSchema,
  userSignUpSchema,
  createTodoSchema,
  userLoginType,
  userSignUpType,
  createTodoType,
};
