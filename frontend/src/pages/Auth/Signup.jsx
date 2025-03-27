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
import { useState } from "react";

const Signup = () => {
  const form = useForm({
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      console.log("Signup data", data);
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        data
      );
      console.log("User created successfully:", response.data);

      setSuccessMessage("User successfully created!");
      setErrorMessage("");

      form.reset();
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      setErrorMessage(
        "There was an error creating your account. Please try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-[#45f3ff] text-2xl font-semibold text-center tracking-wide mb-6">
        Register
      </h1>

      {successMessage && (
        <div className="bg-green-500 text-white p-5 rounded-md mb-4 text-center shadow-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-500 text-white p-5 rounded-md mb-4 text-center shadow-lg">
          {errorMessage}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            rules={{ required: "Full Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="bg-transparent border-gray-700 py-5 px-5 text-white placeholder-gray-400 focus:border-[#45f3ff] focus:ring-2 focus:ring-[#45f3ff]/20"
                    placeholder="Full Name"
                  />
                </FormControl>
                <FormMessage className="text-[#ff2770] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Email is required" }}
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
            rules={{
              required: "Password is required",
              pattern: {
                value: passwordRegex,
                message:
                  "Password must contain at least one letter and one number",
              },
            }}
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
          <div className="text-sm text-gray-400">
            <p>
              Password must have at least 6 characters, one letter, and one
              number.
            </p>
          </div>
          <Button
            type="submit"
            className="w-full mt-5 bg-[#45f3ff] text-[#25252b] hover:bg-[#ff2770] hover:text-white transition-all duration-300 py-6 text-lg font-semibold"
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
