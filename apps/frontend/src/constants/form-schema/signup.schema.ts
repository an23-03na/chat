import { z } from "zod";

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
  );

export const signUpSchema = z
  .object({
    name: z.string().min(2, "minimum 2 symbol"),
    email: z.email(),
    phone: z.string(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Enter correct password",
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
