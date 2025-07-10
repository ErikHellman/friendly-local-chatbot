import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { getRandomResponse, getTypingDelay } from "@/utils/fakeResponses";
import { createPromptSession } from "@/lib/promptapi";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [promptApiReady, setPromptApiRead] = useState(false);
  const [promptSession, setPromptSession] = useState<LanguageModel | null>(
    null,
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    createPromptSession("You are a friendly, helpful assistant.").then(
      (session) => {
        setPromptSession(session);
      },
    );
  }, [promptSession, promptApiReady]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      text: "Neural interface initialized. Welcome to the digital consciousness matrix. How may I assist your journey through the data streams?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setShowTyping(true);

    const response = await promptSession.prompt(text);

    // Simulate AI thinking time
    const delay = getTypingDelay();

    setShowTyping(false);

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
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

          {showTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};
