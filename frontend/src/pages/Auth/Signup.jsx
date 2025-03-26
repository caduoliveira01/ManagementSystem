import { useState } from "react";
import { useForm } from "react-hook-form";
import { signup } from "./authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const Signup = () => {
  const [error, setError] = useState("");
  const form = useForm({
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await signup(data.fullName, data.email, data.password);
      console.log("Cadastro realizado!", response);

      // Salvar token no localStorage (se necessário)
      localStorage.setItem("token", response.jwt);

      // Redirecionar para a Home
      window.location.href = "/";
    } catch (err) {
      setError("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-[#45f3ff] text-2xl font-semibold text-center tracking-wide mb-6">
        Register
      </h1>

      {error && <p className="text-[#ff2770] text-center">{error}</p>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" placeholder="Full Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="email" placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
