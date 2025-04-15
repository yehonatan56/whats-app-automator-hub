
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { InstanceCard, InstanceProps } from "@/components/InstanceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateInstanceModal } from "@/components/CreateInstanceModal";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";

// Sample data for development
const sampleInstances: InstanceProps[] = [
  {
    id: "7700110279",
    name: "Instance 1",
    phoneNumber: "+972 50-123-4567",
    isAuthorized: true,
    tariff: "Premium",
    createdAt: "2023-12-01",
    expiresAt: "2024-12-01",
    daysLeft: 230,
  },
  {
    id: "7700110280",
    name: "Instance 2",
    phoneNumber: "+972 54-987-6543",
    isAuthorized: false,
    tariff: "Standard",
    createdAt: "2024-01-15",
    expiresAt: "2024-07-15",
    daysLeft: 82,
  },
  {
    id: "7700110281",
    name: "Instance 3",
    phoneNumber: "+972 52-345-6789",
    isAuthorized: true,
    tariff: "Premium",
    createdAt: "2024-02-10",
    expiresAt: "2025-02-10",
    daysLeft: 301,
  },
  {
    id: "7700110282",
    name: "Instance 4",
    phoneNumber: "+972 53-456-7890",
    isAuthorized: true,
    tariff: "Standard",
    createdAt: "2024-03-05",
    expiresAt: "2024-09-05",
    daysLeft: 134,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  
  // Filter and sort instances
  const filteredAndSortedInstances = sampleInstances
    .filter(instance => {
      // Apply filters
      if (filterBy === "authorized" && !instance.isAuthorized) return false;
      if (filterBy === "unauthorized" && instance.isAuthorized) return false;
      
      // Apply search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          instance.name.toLowerCase().includes(query) ||
          instance.id.includes(query) ||
          instance.phoneNumber.includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "created":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "expires":
          return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
        case "daysLeft":
          return a.daysLeft - b.daysLeft;
        default:
          return 0;
      }
    });
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">WhatsApp Instances</h1>
            <CreateInstanceModal />
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search instances by name, ID, or phone number..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Instances</SelectItem>
                  <SelectItem value="authorized">Authorized</SelectItem>
                  <SelectItem value="unauthorized">Unauthorized</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="created">Created Date</SelectItem>
                  <SelectItem value="expires">Expiry Date</SelectItem>
                  <SelectItem value="daysLeft">Days Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedInstances.length > 0 ? (
            filteredAndSortedInstances.map((instance) => (
              <InstanceCard key={instance.id} {...instance} />
            ))
          ) : (
            <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-lg font-medium">No instances found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
