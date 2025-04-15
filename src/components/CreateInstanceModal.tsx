
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export function CreateInstanceModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [tariff, setTariff] = useState("standard");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle instance creation logic here
    console.log("Creating instance with name:", name, "and tariff:", tariff);
    setOpen(false);
    // Reset form
    setName("");
    setTariff("standard");
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Instance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New WhatsApp Instance</DialogTitle>
            <DialogDescription>
              Set up a new WhatsApp instance to automate your messaging.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="col-span-4">
                Instance Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My WhatsApp Instance"
                className="col-span-4"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tariff" className="col-span-4">
                Subscription Plan
              </Label>
              <Select
                value={tariff}
                onValueChange={setTariff}
              >
                <SelectTrigger className="col-span-4">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Instance</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
