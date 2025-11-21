import { useState, useRef, KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/store-hooks";
import { useAppDispatch } from "@/hooks/store-hooks";
import { getUserInfo } from "@/store/slices/auth-slice";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const user = dispatch(getUserInfo())

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP submitted:", otpCode, user);
    // Redirect after verification
    setTimeout(() => navigate("/"), 1000);
  };

  const handleResend = () => {
    console.log("Resending OTP...");
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We've sent a 6-digit code to your email"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-3 justify-center">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-semibold transition-all focus:scale-110"
              required
            />
          ))}
        </div>

        
        <Button
          type="submit"
          className="mt-4 w-full h-12 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
        >
          Verify email
        </Button>
       

        
      </form>

      <div className="mt-6 text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-primary font-medium hover:underline"
          >
            Resend
          </button>
        </p>
        <Link
          to="/auth/login"
          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default OtpVerification;
