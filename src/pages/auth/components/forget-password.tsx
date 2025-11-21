import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset for:", email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset link"
      >
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-muted-foreground mb-6">
            If an account exists for <strong>{email}</strong>, you'll receive
            password reset instructions shortly.
          </p>
          <Link to="/auth/login">
            <Button variant="outline" className="w-full">
              Back to login
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries, we'll send you reset instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 transition-all focus:scale-[1.01]"
          />
        </div>

        <Link to="/auth/verify-otp">
        <Button
          type="submit"
          className="w-full h-12 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
        >
          Send reset instructions
        </Button>
        </Link>
        
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/auth/login"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
