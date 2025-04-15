
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface NewChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateChat: (phoneNumber: string, isGroup: boolean) => void;
}

export function NewChatDialog({ open, onOpenChange, onCreateChat }: NewChatDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      onCreateChat(phoneNumber, isGroup);
      // Reset form
      setPhoneNumber("");
      setIsGroup(false);
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Start New Chat</DialogTitle>
            <DialogDescription>
              Enter a phone number to start a new conversation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="col-span-4">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+972 501234567"
                className="col-span-4"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isGroup" 
                checked={isGroup}
                onCheckedChange={(checked) => setIsGroup(checked === true)}
              />
              <Label htmlFor="isGroup">Create as group chat</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Start Chat</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
