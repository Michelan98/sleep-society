
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import SleepTrends from "@/components/SleepTrends";

const SleepTrendsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
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
  );
};

export default SleepTrendsCard;
