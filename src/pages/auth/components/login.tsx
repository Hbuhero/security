import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SplitAuthLayout } from "@/components/auth/split-auth-layout";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Divider } from "@/components/auth/divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormSchema } from "../data/login";
import { useAppDispatch } from "@/hooks/store-hooks";
import { useMutation } from "@tanstack/react-query";
import { addAlert } from "@/store/slices/elert-slice";
import { loginSuccess, setUserInfo } from "@/store/slices/auth-slice";
import axios from "axios";

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  const form = useForm<FormSchema>();

  const mutation = useMutation({
    mutationFn: async (data: FormSchema) => {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', data)
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

      dispatch(loginSuccess({ accessToken: data?.token }))
      dispatch(
        setUserInfo({
          id: data?.user?.id,
          email: data?.user?.email,
          createdAt: data?.user?.createdAt,
          name: data?.user?.name,
          role: data?.user?.role,
          status: data?.user?.status,
          phoneNumber: data?.user?.phoneNumber,
        })
      )
      // navigate('/auth/validate-otp')
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

  const handleLogin = () => {
    mutation.mutate({ email, password })
  }

  return (
    <SplitAuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <OAuthButtons />
      <Divider />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">

              
              <FormLabel>Password</FormLabel>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
              </div>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 transition-all focus:scale-[1.01]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me for 30 days
            </label>
          </div>

          <Button
            type="submit"
            onClick={handleLogin}
            className="w-full h-12 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
          >
            Sign in
          </Button>
        </form>
      </Form>


      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-primary font-medium hover:underline">
          Sign up for free
        </Link>
      </p>
    </SplitAuthLayout>
  );
};

export default Login;
