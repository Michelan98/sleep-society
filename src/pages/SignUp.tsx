
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/lib/auth-service";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await authService.signup(formData);
      toast({
        title: "Account created!",
        description: "Welcome to SleepSync. Let's get tracking!"
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 animate-fade-in">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[30%] w-[80%] h-[80%] bg-gradient-to-br from-transparent via-sleep-light-purple/10 to-sleep-purple/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[30%] -left-[30%] w-[80%] h-[80%] bg-gradient-to-tr from-transparent via-sleep-light-blue/10 to-sleep-blue/5 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <Moon className="h-10 w-10 text-sleep-purple animate-float" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">SleepSync</h1>
          <p className="text-muted-foreground mt-2">Join the sleep revolution</p>
        </div>
        
        <Card className="border border-border/50 shadow-lg backdrop-blur-sm bg-card/80">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Start tracking your sleep and comparing with friends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="John Doe" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-sleep-purple/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-sleep-purple/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-sleep-purple/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password" 
                  placeholder="••••••••" 
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-sleep-purple/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sleep-purple hover:bg-sleep-purple/90 text-white transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or connect with
                  </span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="transition-all duration-200 hover:bg-sleep-blue/5">
                  Google
                </Button>
                <Button variant="outline" className="transition-all duration-200 hover:bg-sleep-blue/5">
                  Apple
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="underline text-sleep-blue hover:text-sleep-purple transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline text-sleep-blue hover:text-sleep-purple transition-colors">
                Privacy Policy
              </Link>
            </div>
            
            <div className="text-center text-sm text-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-sleep-purple hover:underline transition-all font-medium">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
