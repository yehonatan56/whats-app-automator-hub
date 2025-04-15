
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ChatProps {
  id: string;
  name: string;
  phoneNumber: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatarUrl?: string;
  isGroup: boolean;
}

interface ChatListProps {
  chats: ChatProps[];
  activeChat?: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export function ChatList({ chats, activeChat, onSelectChat, onNewChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredChats = searchQuery
    ? chats.filter(
        chat => 
          chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          chat.phoneNumber.includes(searchQuery)
      )
    : chats;

  return (
    <div className="flex h-full flex-col border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted ${
                activeChat === chat.id ? "bg-muted" : ""
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="relative h-10 w-10 shrink-0 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                {chat.avatarUrl ? (
                  <img src={chat.avatarUrl} alt={chat.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-medium text-primary">{chat.name.charAt(0)}</span>
                )}
                {chat.unreadCount > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{chat.name}</p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{chat.timestamp}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <Button className="w-full" onClick={onNewChat}>
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
    </div>
  );
}
