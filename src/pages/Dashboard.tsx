
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import SleepSummary from "@/components/dashboard/SleepSummary";
import SidebarCards from "@/components/dashboard/SidebarCards";
import SleepFeedCard from "@/components/dashboard/SleepFeedCard";
import { toast } from "@/hooks/use-toast";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import { fitbitService } from "@/lib/fitbit"; // Updated import path
import { userService } from "@/lib/user-service";

const Dashboard = () => {
  const { user, sleepData, isLoading, fetchData, refetchData, updateUser, dataSource } = useDashboardData();
  const location = useLocation();

  useEffect(() => {
    // Check if this is a redirect from Fitbit OAuth
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");
    const state = urlParams.get("state");

    if (code) {
      // Process Fitbit OAuth callback
      const processCallback = async () => {
        try {
          if (error) {
            throw new Error(`Authorization error: ${error}`);
          }

          // Validate state to prevent CSRF attacks
          if (state && !fitbitService.validateState(state)) {
            throw new Error("Invalid state parameter - possible CSRF attack");
          }

          console.log("Exchanging code for token...");
          
          // Exchange the code for access token
          const credentials = await fitbitService.exchangeCodeForToken(code);
          if (!credentials) {
            throw new Error("Failed to obtain access token");
          }

          console.log("Successfully obtained credentials");

          // Update user's profile to indicate Fitbit is connected
          const updatedUser = await userService.updateUserProfile({
            fitbitConnected: true
          });
          
          updateUser(updatedUser);
          
          toast({
            title: "Fitbit Connected",
            description: "Your Fitbit account has been successfully connected.",
          });

          // Refresh data to include Fitbit data
          await refetchData();
        } catch (error) {
          console.error("Error processing Fitbit callback:", error);
          const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
          
          toast({
            title: "Connection Failed",
            description: `Failed to connect your Fitbit account: ${errorMessage}`,
            variant: "destructive",
          });
        }
      };

      processCallback();
    }
  }, [location.search, refetchData, updateUser]);

  // Show skeleton while loading
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const isFitbitData = dataSource === 'fitbit';

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4 space-y-6">
          <SleepSummary 
            sleepData={sleepData} 
            userName={user?.name} 
            isFitbitData={isFitbitData}
          />
          <SleepFeedCard user={user} />
        </div>
        <Sidebar className="w-full lg:w-1/4">
          <SidebarCards 
            user={user} 
            onFitbitConnect={updateUser} 
            onDataRefresh={refetchData}
          />
        </Sidebar>
      </div>
    </div>
  );
};

export default Dashboard;
