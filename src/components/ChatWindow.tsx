
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send, MoreVertical, Phone, Video } from "lucide-react";
import { ChatProps } from "./ChatList";

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOutgoing: boolean;
  status: "sent" | "delivered" | "read";
}

interface ChatWindowProps {
  chat?: ChatProps;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export function ChatWindow({ chat, messages, onSendMessage }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");
  
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!chat) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="max-w-md text-center">
          <h3 className="text-lg font-medium">No chat selected</h3>
          <p className="text-muted-foreground">Select a chat from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
            {chat.avatarUrl ? (
              <img src={chat.avatarUrl} alt={chat.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-medium text-primary">{chat.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="font-medium">{chat.name}</h3>
            <p className="text-xs text-muted-foreground">{chat.phoneNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOutgoing ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isOutgoing
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="mt-1 flex items-center justify-end gap-1 text-[10px]">
                  <span className={message.isOutgoing ? "opacity-70" : "text-muted-foreground"}>
                    {message.timestamp}
                  </span>
                  {message.isOutgoing && (
                    <span className="text-xs">
                      {message.status === "read" ? "✓✓" : 
                       message.status === "delivered" ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button 
            variant="default" 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
