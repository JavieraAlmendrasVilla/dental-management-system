import React from 'react';
import { Bluetooth as Tooth } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2">
          <div className="h-4 w-4 bg-primary rounded-full animate-pulse"></div>
          <div className="h-4 w-4 bg-primary rounded-full animate-pulse animation-delay-200"></div>
          <div className="h-4 w-4 bg-primary rounded-full animate-pulse animation-delay-400"></div>
        </div>
        <div className="mt-4 text-primary">
          <Tooth className="h-10 w-10 animate-pulse-slow" />
        </div>
        <h2 className="mt-2 text-lg font-medium text-foreground">Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;