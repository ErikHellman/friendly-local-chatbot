import { Brain, Wifi, Shield } from "lucide-react";

export const ChatHeader = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="h-8 w-8 text-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-cyber font-bold cyber-text-gradient">
              Your friendly on-device AI ChatBot
            </h1>
            <div className="text-xs text-muted-foreground font-mono">
              v0.1.0
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
