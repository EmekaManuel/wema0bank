import { Card, CardContent } from "./ui/card";

const LoadingState = () => (
  <div className="animate-pulse space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="bg-white">
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="h-64 bg-gray-200 rounded"></div>
  </div>
);

export default LoadingState;
