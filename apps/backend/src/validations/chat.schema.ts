import z from "zod";

export const chatSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional(),
});
