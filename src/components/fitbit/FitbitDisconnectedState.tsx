
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface FitbitDisconnectedStateProps {
  isConnecting: boolean;
  onConnect: () => void;
}

const FitbitDisconnectedState = ({
  isConnecting,
  onConnect
}: FitbitDisconnectedStateProps) => {
  return (
    <>
      <CardContent>
        <div className="bg-secondary/50 p-4 rounded-lg">
          <p className="text-sm mb-2">
            Connect your Fitbit account to automatically import your sleep data into SleepSync.
          </p>
          <p className="text-xs text-muted-foreground">
            We'll securely handle your Fitbit authentication.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-sleep-purple hover:bg-sleep-purple/90"
          onClick={onConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect Fitbit"
          )}
        </Button>
      </CardFooter>
    </>
  );
};

export default FitbitDisconnectedState;
