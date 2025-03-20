import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  const handleRefresh = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <div className="flex justify-start items-start min-h-screen pt-5 w-full">
      <Alert
        variant="destructive"
        className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg bg-red-100 border-red-400 w-full max-w-md text-center"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <AlertTitle className="text-lg font-semibold text-red-800">
            Error
          </AlertTitle>
        </div>
        <AlertDescription className="text-red-700">{message}</AlertDescription>
        <Button
          onClick={handleRefresh}
          className="mt-2 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Page
        </Button>
      </Alert>
    </div>
  );
};

export default ErrorAlert;
