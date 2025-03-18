
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import SleepSummary from "@/components/dashboard/SleepSummary";
import SleepFeedCard from "@/components/dashboard/SleepFeedCard";
import SidebarCards from "@/components/dashboard/SidebarCards";
import { useDashboardData } from "@/hooks/use-dashboard-data";

const Dashboard = () => {
  const { user, sleepData, isLoading, fetchData, handleFitbitConnect, dataSource } = useDashboardData();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <SleepSummary 
              sleepData={sleepData} 
              isFitbitConnected={dataSource === "fitbit"} 
            />
            <SleepFeedCard />
          </div>
          
          <SidebarCards 
            user={user} 
            onFitbitConnect={handleFitbitConnect}
            onDataRefresh={fetchData}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
