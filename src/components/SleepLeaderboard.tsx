
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { mockLeaders } from "@/lib/mock-data";

const SleepLeaderboard = () => {
  return (
    <div className="space-y-4">
      {mockLeaders.map((leader, index) => (
        <motion.div
          key={leader.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 backdrop-blur-sm transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              {index === 0 && (
                <div className="absolute -top-1 -left-1">
                  <Trophy className="h-4 w-4 text-sleep-gold" />
                </div>
              )}
              {index === 1 && (
                <div className="absolute -top-1 -left-1">
                  <Trophy className="h-4 w-4 text-sleep-silver" />
                </div>
              )}
              {index === 2 && (
                <div className="absolute -top-1 -left-1">
                  <Trophy className="h-4 w-4 text-sleep-bronze" />
                </div>
              )}
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={leader.avatar} alt={leader.name} />
                <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-medium text-sm">{leader.name}</p>
              <p className="text-xs text-muted-foreground">
                {leader.sleepDuration} · {leader.sleepQuality}% quality
              </p>
            </div>
          </div>
          <div className="text-lg font-bold text-sleep-purple">
            {leader.score}
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-4"
      >
        <button className="text-sm text-sleep-purple hover:text-sleep-purple/80 transition-colors">
          View full leaderboard
        </button>
      </motion.div>
    </div>
  );
};

export default SleepLeaderboard;
