import { z } from "zod";

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
  );

export const loginSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
