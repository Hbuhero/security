import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/auth-layout";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Divider } from "@/components/auth/divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SplitAuthLayout } from "@/components/auth/split-auth-layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormSchema } from "../data/sign-up";
import { useAppDispatch } from "@/hooks/store-hooks";
import { loginSuccess, setUserInfo } from "@/store/slices/auth-slice";
import { addAlert } from "@/store/slices/elert-slice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { log } from "console";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (data: FormSchema) => {
      const response = await axios.post('http://localhost:8080/api/v1/auth/signup', data)
      console.log(response)
      return response
    },
    onSuccess: async (data: any) => {
      console.log(data)
      dispatch(
        addAlert({
          message: 'Sign in successful',
          title: 'Sign in successful',
          type: 'success',
        })
      )

      dispatch(loginSuccess({ accessToken: null }))
      dispatch(
        setUserInfo({
          id: null,
          email: data?.email,
          createdAt: null,
          name: null,
          role: null,
          phoneNumber: null,
          status: data?.status,
        })
      )
      navigate('/auth/verify-otp')
    },
    onError: (error) => {
      console.log(error)

      dispatch(
        addAlert({
          message: error.message,
          title: 'Sign successful',
          type: 'error',
        })
      )
    },
  })

  const form = useForm<FormSchema>();

  const handleSignIn = (data: any) => {
    console.log("Sign Up:", data);
    mutation.mutate(data)
  }

  return (
    <SplitAuthLayout
          title="Welcome back"
          subtitle="Sign in to your account to continue"
        >
          
      <OAuthButtons />
      <Divider />

      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  required
                  className="h-11 transition-all focus:scale-[1.01]"
                />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  required
                  className="h-11 transition-all focus:scale-[1.01]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+25512345678"
                  {...field}
                  required
                  className="h-11 transition-all focus:scale-[1.01]"
                />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  {...field}
                  required
                  type="password"
                  className="h-11 transition-all focus:scale-[1.01]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
          onClick={handleSignIn}
        >
          Create account
        </Button>
      </form>
      </Form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </SplitAuthLayout>
  );
};

export default Signup;
