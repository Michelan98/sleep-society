
import { Moon } from "lucide-react";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Moon className="h-12 w-12 text-sleep-purple animate-pulse-gentle mx-auto mb-4" />
        <p className="text-muted-foreground">Loading your sleep data...</p>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
