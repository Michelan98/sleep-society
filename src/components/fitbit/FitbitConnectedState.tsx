
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";

interface FitbitConnectedStateProps {
  lastSyncTime: Date | null;
  isSyncing: boolean;
  isDisconnecting: boolean;
  onSync: () => void;
  onDisconnect: () => void;
}

const FitbitConnectedState = ({
  lastSyncTime,
  isSyncing,
  isDisconnecting,
  onSync,
  onDisconnect
}: FitbitConnectedStateProps) => {
  return (
    <>
      <CardContent>
        <div className="bg-sleep-purple/10 p-4 rounded-lg">
          <p className="text-sm mb-2">
            Your Fitbit account is connected. Your sleep data will be automatically synced.
          </p>
          <p className="text-xs text-muted-foreground">
            Last synced: {lastSyncTime ? format(lastSyncTime, 'PPp') : 'Not yet synced'}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          variant="default" 
          className="w-full bg-sleep-blue hover:bg-sleep-blue/90"
          onClick={onSync}
          disabled={isSyncing}
        >
          {isSyncing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing Data...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onDisconnect}
          disabled={isDisconnecting}
        >
          {isDisconnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Disconnecting...
            </>
          ) : (
            "Disconnect Fitbit"
          )}
        </Button>
      </CardFooter>
    </>
  );
};

export default FitbitConnectedState;
