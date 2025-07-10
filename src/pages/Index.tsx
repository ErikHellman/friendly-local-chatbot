import { useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ChatHeader />
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
