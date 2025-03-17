
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

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await authService.login(formData);
      toast({
        title: "Welcome back!",
        description: "You're now logged in to SleepSync"
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
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
          <p className="text-muted-foreground mt-2">Track, share, improve</p>
        </div>
        
        <Card className="border border-border/50 shadow-lg backdrop-blur-sm bg-card/80">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your SleepSync account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-sleep-blue hover:text-sleep-purple transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password"
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-sleep-purple/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sleep-purple hover:bg-sleep-purple/90 text-white transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
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
          <CardFooter>
            <div className="w-full text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-sleep-purple hover:underline transition-all font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
