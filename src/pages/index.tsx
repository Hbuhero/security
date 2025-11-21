import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="text-center relative z-10 p-8 animate-fade-in">
        <h1 className="text-6xl font-bold mb-6 gradient-text">
          Premium Auth UI
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Modern authentication pages built with React, TypeScript, and TailwindCSS.
          Inspired by the best SaaS designs.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/auth/login">
            <Button className="h-12 px-8 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 shadow-lg">
              View Login
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button variant="outline" className="h-12 px-8 font-semibold hover:scale-105 transition-all">
              View Sign Up
            </Button>
          </Link>
        </div>
        <div className="mt-8 flex gap-4 justify-center flex-wrap text-sm">
          <Link to="/auth/forgot-password" className="text-muted-foreground hover:text-primary transition-colors">
            Forgot Password
          </Link>
          <Link to="/auth/reset-password" className="text-muted-foreground hover:text-primary transition-colors">
            Reset Password
          </Link>
          <Link to="/auth/verify-otp" className="text-muted-foreground hover:text-primary transition-colors">
            OTP Verification
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
