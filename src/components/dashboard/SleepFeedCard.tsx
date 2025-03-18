
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import SleepFeed from "@/components/SleepFeed";

const SleepFeedCard = () => {
  return (
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
  );
};

export default SleepFeedCard;
