export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="cyber-card max-w-[80%] sm:max-w-[70%] rounded-lg px-4 py-3">
        <div className="text-xs text-accent font-cyber mb-1">
          NEURAL_AI_SYSTEM
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="text-sm text-muted-foreground font-mono">
            Processing neural patterns
          </div>
          <div className="flex space-x-1 ml-2">
            <div className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
        
        <div className="absolute h-0.5 w-8 rounded-full bg-primary bottom-1 left-4" />
      </div>
    </div>
  );
};