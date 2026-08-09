import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "./use-auth";
import {
  loginSchema,
  LoginSchemaType,
} from "@/constants/form-schema/login.schema";

export const useLogin = () => {
  const { login } = useAuth();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await login(data);
      toast.success("Success Register");
      window.location.href = "/";
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
