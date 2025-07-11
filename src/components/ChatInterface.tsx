import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { createPromptSession } from "@/lib/promptapi";

type LanguageModel = unknown;

interface Message {
  id: string;
  text: string | ReadableStream<string>;
  isUser: boolean;
  timestamp: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [promptSession, setPromptSession] = useState<LanguageModel | null>(
    null,
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setIsLoading(true);
    const welcomeMessage: Message = {
      id: "welcome",
      text: "Loading AI models. Please wait...",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([welcomeMessage]);

    createPromptSession(
      "You are a friendly, helpful assistant with a good sense of humor.",
    ).then((session) => {
      console.log("Prompt API ready!");
      const welcomeMessage: Message = {
        id: "welcome",
        text: "Welcome to your local AI Chatbot. I run entirely on your device and even work offline. Feel free to ask me anything as I will never remember our coversations.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([welcomeMessage]);

      setPromptSession(session);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const stream: ReadableStream<string> = promptSession.promptStreaming(text);

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: stream,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, aiResponse]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};
