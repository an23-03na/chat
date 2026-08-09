import z from "zod";
export const passwordShchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
    "email or password invalid",
  );

export const signupSchema = z.object({
  name: z.string().min(2, "minimum 2 symbol"),
  userName: z.string().min(2, "minimum 2 symbol").optional(),
  email: z.email("email or password invalid"),
  password: passwordShchema,
  phone: z.string(),
  avatar: z.string().optional(),
});
export const loginSchema = z.object({
  email: z.email("email or password invalid"),
  password: passwordShchema,
});
export const updateProfileSchema = z.object({
  name: z.string().min(2, "minimum 2 symbol").optional(),
  avatar: z.string().optional(),
  phone: z.string().optional(),
});
