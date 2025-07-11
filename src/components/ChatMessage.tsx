import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string | ReadableStream<string>;
  isUser: boolean;
  timestamp: string;
}

export const ChatMessage = ({
  message,
  isUser,
  timestamp,
}: ChatMessageProps) => {
  const [displayMessage, setDisplayMessage] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  useEffect(() => {
    if (typeof message === "string") {
      setDisplayMessage(message);
      setIsStreaming(false);
    } else {
      setIsStreaming(true);
      setDisplayMessage("");

      const reader = message.getReader();

      const readStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              setIsStreaming(false);
              break;
            }
            setDisplayMessage((prev) => prev + value);
          }
        } catch (error) {
          console.error("Error reading stream:", error);
          setIsStreaming(false);
        }
      };

      readStream();
    }
  }, [message]);
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[100%] sm:max-w-[100%] rounded-lg px-4 py-3 relative",
          isUser
            ? "bg-gradient-primary text-primary-foreground shadow-glow"
            : "cyber-card",
          isStreaming && "typing-indicator",
        )}
      >
        {!isUser && (
          <div className="text-xs text-accent font-cyber mb-1">
            Friendly ChatBot
          </div>
        )}

        <div
          className={cn(
            "text-sm sm:text-base leading-relaxed prose prose-sm max-w-none",
            isUser ? "font-medium prose-invert" : "font-mono prose-invert",
          )}
        >
          <ReactMarkdown>{displayMessage}</ReactMarkdown>
        </div>

        <div
          className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-right" : "text-left",
          )}
        >
          {timestamp}
        </div>

        {/* Cyberpunk accent line */}
        <div
          className={cn(
            "absolute h-0.5 w-8 rounded-full",
            isUser
              ? "bg-primary-foreground bottom-1 right-4"
              : "bg-primary bottom-1 left-4",
          )}
        />
      </div>
    </div>
  );
};
