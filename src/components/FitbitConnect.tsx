
import { Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "@/types/user";
import { useFitbitConnection } from "@/hooks/use-fitbit-connection";
import FitbitConnectedState from "./fitbit/FitbitConnectedState";
import FitbitDisconnectedState from "./fitbit/FitbitDisconnectedState";

interface FitbitConnectProps {
  user: User | null;
  onConnect: (updatedUser: User) => void;
  onDataRefresh?: () => void;
}

const FitbitConnect = ({ user, onConnect, onDataRefresh }: FitbitConnectProps) => {
  const {
    isConnecting,
    isDisconnecting,
    isSyncing,
    lastSyncTime,
    handleConnect,
    handleSyncData,
    handleDisconnect
  } = useFitbitConnection({ user, onConnect, onDataRefresh });

  if (!user) {
    return null;
  }

  return (
    <Card className="border border-border/50 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Activity className="h-5 w-5 mr-2 text-sleep-purple" />
          Fitbit Integration
        </CardTitle>
        <CardDescription>
          Connect your Fitbit account to automatically sync your sleep data
        </CardDescription>
      </CardHeader>
      
      {user.fitbitConnected ? (
        <FitbitConnectedState
          lastSyncTime={lastSyncTime}
          isSyncing={isSyncing}
          isDisconnecting={isDisconnecting}
          onSync={handleSyncData}
          onDisconnect={handleDisconnect}
        />
      ) : (
        <FitbitDisconnectedState
          isConnecting={isConnecting}
          onConnect={handleConnect}
        />
      )}
    </Card>
  );
};

export default FitbitConnect;
