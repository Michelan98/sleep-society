
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Moon, ZapFast, Clock, User, BarChart2, Trophy } from "lucide-react";
import SleepLeaderboard from "@/components/SleepLeaderboard";
import SleepFeed from "@/components/SleepFeed";
import SleepTrends from "@/components/SleepTrends";
import Navbar from "@/components/Navbar";
import { userService } from "@/lib/user-service";
import { sleepService } from "@/lib/sleep-service";
import { User as UserType } from "@/types/user";
import { SleepData } from "@/types/sleep";

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        const userData = await userService.getCurrentUser();
        const sleepData = await sleepService.getLatestSleepData();
        
        setUser(userData);
        setSleepData(sleepData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Moon className="h-12 w-12 text-sleep-purple animate-pulse-gentle mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your sleep data...</p>
        </div>
      </div>
    );
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border border-border/50 shadow-md overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl flex items-center">
                    <User className="h-5 w-5 mr-2 text-sleep-purple" />
                    Your Sleep Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div 
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center"
                    >
                      <div className="text-sleep-purple mb-2 p-2 bg-sleep-purple/10 rounded-full">
                        <Clock className="h-6 w-6" />
                      </div>
                      <span className="text-sm text-muted-foreground">Sleep Duration</span>
                      <span className="text-3xl font-bold mt-1">
                        {sleepData?.duration || "7h 32m"}
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center"
                    >
                      <div className="text-sleep-purple mb-2 p-2 bg-sleep-purple/10 rounded-full">
                        <Moon className="h-6 w-6" />
                      </div>
                      <span className="text-sm text-muted-foreground">Sleep Quality</span>
                      <span className="text-3xl font-bold mt-1">
                        {sleepData?.quality || "86%"}
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center"
                    >
                      <div className="text-sleep-blue mb-2 p-2 bg-sleep-blue/10 rounded-full">
                        <ZapFast className="h-6 w-6" />
                      </div>
                      <span className="text-sm text-muted-foreground">Energy Score</span>
                      <span className="text-3xl font-bold mt-1">
                        {sleepData?.energyScore || "92"}
                      </span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border border-border/50 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-sleep-purple" /> 
                    Sleep Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SleepFeed />
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border border-border/50 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-sleep-gold" />
                    Weekly Leaders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SleepLeaderboard />
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border border-border/50 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-sleep-blue" />
                    Sleep Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SleepTrends />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
