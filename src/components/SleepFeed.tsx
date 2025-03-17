
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { mockFeedItems } from "@/lib/mock-data";
import { useState } from "react";

const SleepFeed = () => {
  return (
    <div className="space-y-6">
      {mockFeedItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={item.user.avatar} alt={item.user.name} />
              <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{item.user.name}</p>
                <p className="text-sm text-muted-foreground">{item.timeAgo}</p>
              </div>
              {item.note && (
                <p className="text-sm text-muted-foreground mt-1">{item.note}</p>
              )}
              
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="bg-secondary/40 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-lg font-semibold">{item.duration}</p>
                </div>
                <div className="bg-secondary/40 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Quality Score</p>
                  <p className="text-lg font-semibold">{item.qualityScore}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <LikeButton count={item.likes} />
            <button className="text-sm text-muted-foreground hover:text-sleep-purple transition-colors">
              Comment
            </button>
          </div>
          
          {index < mockFeedItems.length - 1 && (
            <Separator className="my-2" />
          )}
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pt-2"
      >
        <button className="text-sm text-sleep-purple hover:text-sleep-purple/80 transition-colors">
          Load more
        </button>
      </motion.div>
    </div>
  );
};

const LikeButton = ({ count }: { count: number }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(count);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <button 
      onClick={handleLike}
      className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-sleep-purple transition-colors"
    >
      <Heart className={`h-4 w-4 ${liked ? 'fill-sleep-purple text-sleep-purple' : ''}`} />
      <span>{likeCount}</span>
    </button>
  );
};

export default SleepFeed;
