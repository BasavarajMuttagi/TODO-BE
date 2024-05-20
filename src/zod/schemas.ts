import { z } from "zod";

const userSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).max(12),
});

export default userSchema;
