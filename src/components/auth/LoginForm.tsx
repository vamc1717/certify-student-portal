
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types/auth";

interface LoginFormProps {
  role: UserRole;
  title: string;
  description: string;
  requirePassword?: boolean;
  requireOtp?: boolean;
  requireRegistration?: boolean;
}

const LoginForm = ({
  role,
  title,
  description,
  requirePassword = true,
  requireOtp = false,
  requireRegistration = false
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  
  const { login, loading, sendOtp, verifyOtp } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (requireOtp && !otpSent) {
      try {
        await sendOtp(email);
        setOtpSent(true);
      } catch (error) {
        console.error("Failed to send OTP:", error);
      }
      return;
    }
    
    if (requireOtp && otpSent) {
      await verifyOtp(email, otp, role);
      return;
    }
    
    await login({ 
      email, 
      password: requirePassword ? password : undefined,
      registrationNumber: requireRegistration ? registrationNumber : undefined
    }, role);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                {requirePassword && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={requirePassword}
                    />
                  </div>
                )}
                
                {requireRegistration && (
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="Enter your registration number"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      required={requireRegistration}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter the verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500">
                  A verification code has been sent to your email
                </p>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : otpSent ? "Verify OTP" : requireOtp ? "Send OTP" : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
      
      {otpSent && (
        <CardFooter>
          <Button 
            variant="link" 
            className="w-full"
            onClick={() => setOtpSent(false)}
          >
            Back to Login
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LoginForm;
