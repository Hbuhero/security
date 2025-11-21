import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Password reset:", { password });
    // Redirect to login after successful reset
    setTimeout(() => navigate("/auth/login"), 1000);
  };

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Your new password must be different from previous passwords"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            New password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 transition-all focus:scale-[1.01]"
          />
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-11 transition-all focus:scale-[1.01]"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
        >
          Reset password
        </Button>
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

export default ResetPassword;
