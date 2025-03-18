
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import SleepLeaderboard from "@/components/SleepLeaderboard";

const SleepLeaderboardCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
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
  );
};

export default SleepLeaderboardCard;
