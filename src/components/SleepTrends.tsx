
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const SleepTrends = () => {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <p className="text-sm mb-2">
          Your sleep score is better than 75% of users this week!
        </p>
        <Progress value={75} className="h-2 bg-secondary" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="pt-2 space-y-4"
      >
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Average Sleep Duration</p>
            <p className="font-medium">7h 45m</p>
          </div>
          <Progress value={80} className="h-1.5 bg-secondary" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Sleep Consistency</p>
            <p className="font-medium">89%</p>
          </div>
          <Progress value={89} className="h-1.5 bg-secondary" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Deep Sleep</p>
            <p className="font-medium">62%</p>
          </div>
          <Progress value={62} className="h-1.5 bg-secondary" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Sleep Improvement</p>
            <p className="font-medium">+12%</p>
          </div>
          <Progress value={70} className="h-1.5 bg-secondary" />
        </div>
      </motion.div>
      
      <div className="text-center pt-2">
        <button className="text-sm text-sleep-purple hover:text-sleep-purple/80 transition-colors">
          View detailed analytics
        </button>
      </div>
    </div>
  );
};

export default SleepTrends;
