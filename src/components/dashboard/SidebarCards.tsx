
import { motion } from "framer-motion";
import { User } from "@/types/user";
import FitbitConnect from "@/components/FitbitConnect";
import SleepLeaderboardCard from "./SleepLeaderboardCard";
import SleepTrendsCard from "./SleepTrendsCard";

interface SidebarCardsProps {
  user: User | null;
  onFitbitConnect: (updatedUser: User) => void;
  onDataRefresh: () => void;
}

const SidebarCards = ({ user, onFitbitConnect, onDataRefresh }: SidebarCardsProps) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FitbitConnect 
          user={user} 
          onConnect={onFitbitConnect}
          onDataRefresh={onDataRefresh}
        />
      </motion.div>

      <SleepLeaderboardCard />
      <SleepTrendsCard />
    </div>
  );
};

export default SidebarCards;
