import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isUser, timestamp, isTyping }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] sm:max-w-[70%] rounded-lg px-4 py-3 relative",
        isUser 
          ? "bg-gradient-primary text-primary-foreground shadow-glow" 
          : "cyber-card",
        isTyping && "typing-indicator"
      )}>
        {!isUser && (
          <div className="text-xs text-accent font-cyber mb-1">
            NEURAL_AI_SYSTEM
          </div>
        )}
        
        <div className={cn(
          "text-sm sm:text-base leading-relaxed",
          isUser ? "font-medium" : "font-mono"
        )}>
          {message}
        </div>
        
        <div className={cn(
          "text-xs mt-2 opacity-70",
          isUser ? "text-right" : "text-left"
        )}>
          {timestamp}
        </div>
        
        {/* Cyberpunk accent line */}
        <div className={cn(
          "absolute h-0.5 w-8 rounded-full",
          isUser 
            ? "bg-primary-foreground bottom-1 right-4" 
            : "bg-primary bottom-1 left-4"
        )} />
      </div>
    </div>
  );
};