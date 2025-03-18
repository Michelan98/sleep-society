
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Moon, User, Zap } from "lucide-react";
import { SleepData } from "@/types/sleep";

interface SleepSummaryProps {
  sleepData: SleepData | null;
  isFitbitConnected?: boolean;
}

const SleepSummary = ({ sleepData, isFitbitConnected }: SleepSummaryProps) => {
  return (
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
            {isFitbitConnected && (
              <span className="ml-2 text-xs bg-sleep-purple/10 text-sleep-purple px-2 py-1 rounded-full">
                Fitbit
              </span>
            )}
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
                <Zap className="h-6 w-6" />
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
  );
};

export default SleepSummary;
