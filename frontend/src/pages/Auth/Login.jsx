import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signin",
        data
      );

      // Salva token e nome do usuário no localStorage
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("fullName", response.data.fullName);

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-[#45f3ff] text-2xl font-semibold text-center tracking-wide mb-6">
        Login
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}{" "}
      {/* Mostra erro */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="bg-transparent border-gray-700 py-5 px-5 text-white placeholder-gray-400 focus:border-[#45f3ff] focus:ring-2 focus:ring-[#45f3ff]/20"
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage className="text-[#ff2770] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="bg-transparent border-gray-700 py-5 px-5 text-white placeholder-gray-400 focus:border-[#45f3ff] focus:ring-2 focus:ring-[#45f3ff]/20"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage className="text-[#ff2770] text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-5 bg-[#45f3ff] text-[#25252b] hover:bg-[#ff2770] hover:text-white transition-all duration-300 py-6 text-lg font-semibold"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
