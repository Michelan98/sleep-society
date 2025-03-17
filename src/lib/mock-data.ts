
import { SleepFeedItem, LeaderboardUser } from "@/types/sleep";
import { User } from "@/types/user";

export const mockUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://i.pravatar.cc/150?img=11",
  bio: "Sleep enthusiast and wellness advocate. Working on improving my sleep habits.",
  joinedAt: "2023-01-15T08:00:00.000Z",
  followers: 142,
  following: 87
};

export const mockSleepData = {
  id: "sleep-1",
  userId: "user-1",
  date: "2023-04-15T08:00:00.000Z",
  duration: "7h 32m",
  quality: "86%",
  energyScore: "92",
  deepSleepPercentage: 24,
  remSleepPercentage: 18,
  lightSleepPercentage: 50,
  awakeTime: 8,
  heartRateAvg: 62,
  note: "Slept well after evening yoga."
};

export const mockFeedItems: SleepFeedItem[] = [
  {
    id: "feed-1",
    user: {
      id: "user-2",
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    duration: "8h 15m",
    qualityScore: "92%",
    date: "2023-04-15T08:00:00.000Z",
    timeAgo: "2h ago",
    likes: 24,
    note: "Best sleep after my new mattress arrived!"
  },
  {
    id: "feed-2",
    user: {
      id: "user-3",
      name: "Marcus Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    duration: "7h 45m",
    qualityScore: "88%",
    date: "2023-04-15T06:30:00.000Z",
    timeAgo: "4h ago",
    likes: 18,
    note: "Trying the new sleep meditation app really helped!"
  },
  {
    id: "feed-3",
    user: {
      id: "user-4",
      name: "Jamie Kim",
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    duration: "8h 05m",
    qualityScore: "91%",
    date: "2023-04-14T23:00:00.000Z",
    timeAgo: "12h ago",
    likes: 32
  }
];

export const mockLeaders: LeaderboardUser[] = [
  {
    id: "user-5",
    name: "Emma Thompson",
    avatar: "https://i.pravatar.cc/150?img=1",
    score: 95,
    sleepDuration: "8h 15m",
    sleepQuality: "97",
    rank: 1
  },
  {
    id: "user-1",
    name: "James Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    score: 92,
    sleepDuration: "7h 50m",
    sleepQuality: "94",
    rank: 2
  },
  {
    id: "user-6",
    name: "Alex Kim",
    avatar: "https://i.pravatar.cc/150?img=9",
    score: 89,
    sleepDuration: "8h 05m",
    sleepQuality: "91",
    rank: 3
  },
  {
    id: "user-7",
    name: "Priya Singh",
    avatar: "https://i.pravatar.cc/150?img=22",
    score: 87,
    sleepDuration: "7h 40m",
    sleepQuality: "89",
    rank: 4
  },
  {
    id: "user-8",
    name: "Thomas Lee",
    avatar: "https://i.pravatar.cc/150?img=15",
    score: 85,
    sleepDuration: "7h 25m",
    sleepQuality: "87",
    rank: 5
  }
];
