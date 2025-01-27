"use client";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { NavigationItemProps } from "@/components/sidebar/types";
import { Profile } from "@/components/profile/Profile";
import * as React from "react";
import MessageCard from "./components/MessageCard";
import ChatMessage from "./components/ChatMessage";
import { inboxMessages, chatMessages } from "./data";
import { ChatHeader } from "./components/ChatHeader";
import { ChatInput } from "./components/ChatInput";
import { ChatMessageProps } from "./types";
import { SearchBar } from "../projects/SearchBar";

interface ConversationMessages {
  [key: string]: ChatMessageProps[];
}

export default function InboxPage() {
  const [activeConversation, setActiveConversation] = React.useState<string | null>(null);
  const [conversationMessages, setConversationMessages] = React.useState<ConversationMessages>({
    "Alice Smith": [
      {
        sender: "Alice Smith",
        message: "Hi! How are you?",
        time: "10:00",
        isUser: false
      },
      {
        sender: "You",
        message: "I'm good, thanks! How about you?",
        time: "10:01",
        isUser: true
      }
    ],
    "William Smith": [
      {
        sender: "William Smith",
        message: "About tomorrow's meeting...",
        time: "09:30",
        isUser: false
      }
    ],
    "Bob Johnson": [
      {
        sender: "Bob Johnson",
        message: "Are you up for hiking this weekend?",
        time: "Yesterday",
        isUser: false
      }
    ],
    "Emily Davis": [
      {
        sender: "Emily Davis",
        message: "I reviewed the budget report",
        time: "2 days ago",
        isUser: false
      }
    ]
  });
  const [newMessage, setNewMessage] = React.useState("");

  const handleSendMessage = (message: string) => {
    if (!message.trim() || !activeConversation) return;
    
    const newChatMessage: ChatMessageProps = {
      sender: "You",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
      status: 'sent'
    };

    setConversationMessages(prev => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), newChatMessage]
    }));
    setNewMessage("");
  };

  const handleSelectConversation = (sender: string) => {
    setActiveConversation(sender);
  };

  const navigationItems: NavigationItemProps[] = [
    { label: "Dashboard", icon: "dashboard" },
    { label: "Projects", icon: "projects" },
    { label: "Inbox", icon: "inbox", isActive: true },
    { label: "Settings", icon: "settings" },
  ];

  return (
    <main className="h-screen">
      <div className="flex h-full">
        <Sidebar className="w-[180px]" navigationItems={navigationItems} />
        
        <div className="flex flex-1 max-w-[1200px]">
          <div className="w-[380px] border-r border-zinc-200">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-zinc-200">
                <h1 className="text-2xl font-bold mb-4">Inbox</h1>
                <SearchBar onSearch={function (query: string): void {
                  throw new Error("Function not implemented.");
                } } />
              </div>
              <div className="flex-1 overflow-y-auto">
                {inboxMessages.map((message, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleSelectConversation(message.sender)}
                    className={`cursor-pointer ${activeConversation === message.sender ? 'bg-zinc-100' : ''}`}
                  >
                    <MessageCard {...message} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {activeConversation ? (
              <>
                <ChatHeader 
                  name={activeConversation}
                  status="online"
                  avatar="/avatars/default.jpg"
                  lastSeen="2 hours ago"
                />
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {conversationMessages[activeConversation]?.map((message, index) => (
                    <ChatMessage key={index} {...message} />
                  ))}
                </div>
                <ChatInput 
                  value={newMessage}
                  onChange={setNewMessage}
                  onSend={handleSendMessage}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}