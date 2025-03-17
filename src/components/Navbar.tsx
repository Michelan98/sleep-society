
import { Link } from "react-router-dom";
import { Moon, BarChart2, Users, Settings, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserType } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth-service";

interface NavbarProps {
  user: UserType | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong logging you out",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl">
        <div className="mr-4 flex">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Moon className="h-6 w-6 text-sleep-purple" />
            <span className="font-bold text-lg hidden sm:inline-block">SleepSync</span>
          </Link>
        </div>
        
        <div className="flex-1 flex justify-end md:justify-center">
          <nav className="flex items-center space-x-2 md:space-x-6">
            <Link 
              to="/dashboard" 
              className="text-sm font-medium transition-colors hover:text-sleep-purple flex items-center"
            >
              <Moon className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link 
              to="/analytics" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-sleep-purple flex items-center"
            >
              <BarChart2 className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Analytics</span>
            </Link>
            <Link 
              to="/social" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-sleep-purple flex items-center"
            >
              <Users className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Social</span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
