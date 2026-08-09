import {
  signUpSchema,
  SignUpSchemaType,
} from "@/constants/form-schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "./use-auth";

export const useSignUp = () => {
  const { signup } = useAuth();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const { confirmPassword, ...rest } = data;
      await signup(rest);
      toast.success("Success Register");
    } catch (error) {
      console.error(error);
      toast.error("Failed Register");
    } finally {
      form.reset();
    }
  };
  return {
    onSubmit,
    form,
  };
};
