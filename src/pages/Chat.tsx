
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { ChatList, ChatProps } from "@/components/ChatList";
import { ChatWindow, Message } from "@/components/ChatWindow";
import { NewChatDialog } from "@/components/NewChatDialog";

// Sample data for development
const sampleChats: ChatProps[] = [
  {
    id: "1",
    name: "David Cohen",
    phoneNumber: "+972 50-123-4567",
    lastMessage: "When will the project be ready?",
    timestamp: "10:42 AM",
    unreadCount: 2,
    isGroup: false,
  },
  {
    id: "2",
    name: "Marketing Team",
    phoneNumber: "Group · 8 participants",
    lastMessage: "Sarah: I've shared the campaign assets",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: true,
  },
  {
    id: "3",
    name: "Daniel Levy",
    phoneNumber: "+972 54-987-6543",
    lastMessage: "Thanks for the information",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: "4",
    name: "Tech Support",
    phoneNumber: "Group · 5 participants",
    lastMessage: "Yossi: Can someone check the server?",
    timestamp: "Tuesday",
    unreadCount: 0,
    isGroup: true,
  },
  {
    id: "5",
    name: "Michal Avraham",
    phoneNumber: "+972 52-345-6789",
    lastMessage: "Looking forward to our meeting tomorrow",
    timestamp: "Monday",
    unreadCount: 0,
    isGroup: false,
  },
];

// Sample message data
const sampleMessages: Message[] = [
  {
    id: "m1",
    content: "Hi, how's the project coming along?",
    timestamp: "10:30 AM",
    isOutgoing: false,
    status: "read",
  },
  {
    id: "m2",
    content: "We're making good progress. I'll send you an update by the end of the day.",
    timestamp: "10:32 AM",
    isOutgoing: true,
    status: "read",
  },
  {
    id: "m3",
    content: "Great, thank you. Any blockers I should know about?",
    timestamp: "10:35 AM",
    isOutgoing: false,
    status: "read",
  },
  {
    id: "m4",
    content: "Nothing major. We had some minor issues with the API integration, but we've resolved them.",
    timestamp: "10:38 AM",
    isOutgoing: true,
    status: "read",
  },
  {
    id: "m5",
    content: "When will the project be ready?",
    timestamp: "10:42 AM",
    isOutgoing: false,
    status: "read",
  },
];

const Chat = () => {
  const [searchParams] = useSearchParams();
  const instanceId = searchParams.get("instance") || "";
  
  const [activeChat, setActiveChat] = useState<string | undefined>(sampleChats[0]?.id);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [chats, setChats] = useState<ChatProps[]>(sampleChats);
  const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);
  
  const selectedChat = chats.find(chat => chat.id === activeChat);
  
  const handleSendMessage = (content: string) => {
    if (!activeChat) return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOutgoing: true,
      status: "sent",
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate message delivery after 1 second
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "delivered" } 
            : msg
        )
      );
      
      // Simulate message read after 2 more seconds
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: "read" } 
              : msg
          )
        );
      }, 2000);
    }, 1000);
  };
  
  const handleNewChat = () => {
    setNewChatDialogOpen(true);
  };
  
  const handleCreateChat = (phoneNumber: string, isGroup: boolean) => {
    const newChat: ChatProps = {
      id: `new-${Date.now()}`,
      name: phoneNumber,
      phoneNumber: phoneNumber,
      lastMessage: "No messages yet",
      timestamp: "Just now",
      unreadCount: 0,
      isGroup: isGroup,
    };
    
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setActiveChat(newChat.id);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 min-w-80 border-r">
          <ChatList 
            chats={chats} 
            activeChat={activeChat} 
            onSelectChat={setActiveChat} 
            onNewChat={handleNewChat}
          />
        </div>
        <div className="flex-1">
          <ChatWindow 
            chat={selectedChat} 
            messages={messages} 
            onSendMessage={handleSendMessage} 
          />
        </div>
      </div>
      <NewChatDialog 
        open={newChatDialogOpen}
        onOpenChange={setNewChatDialogOpen}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};

export default Chat;
