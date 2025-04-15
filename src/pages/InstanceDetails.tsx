
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Copy, 
  EyeOff, 
  Eye,
  RefreshCw, 
  LogOut, 
  Trash2, 
  MessageSquare,
  File,
  CheckCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InstanceDetails = () => {
  const { id } = useParams();
  const [showToken, setShowToken] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample instance data for development
  const instance = {
    id: id || "7700110279",
    name: "Instance 1",
    phoneNumber: "+972 50-123-4567",
    isAuthorized: true,
    apiUrl: "https://api.green-api.com/waInstance7700110279",
    mediaUrl: "https://media.green-api.com/waInstance7700110279",
    token: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    avatarUrl: "",
    tariff: "Premium",
    createdAt: "2023-12-01",
    expiresAt: "2024-12-01",
    daysLeft: 230,
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast here
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link to="/">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Instance {id}</h1>
              <p className="text-sm text-muted-foreground">
                {instance.isAuthorized ? (
                  <span className="text-green-600 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> Authorized: {instance.phoneNumber}
                  </span>
                ) : (
                  <span className="text-red-500">Not Authorized</span>
                )}
              </p>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Instance Information</CardTitle>
                    <CardDescription>Access details for your WhatsApp instance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-url">API URL</Label>
                      <div className="flex">
                        <Input id="api-url" value={instance.apiUrl} readOnly className="flex-1" />
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard(instance.apiUrl)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="media-url">Media URL</Label>
                      <div className="flex">
                        <Input id="media-url" value={instance.mediaUrl} readOnly className="flex-1" />
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard(instance.mediaUrl)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instance-id">Instance ID</Label>
                      <div className="flex">
                        <Input id="instance-id" value={instance.id} readOnly className="flex-1" />
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard(instance.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="token">API Token</Label>
                      <div className="flex">
                        <Input 
                          id="token" 
                          type={showToken ? "text" : "password"} 
                          value={showToken ? instance.token : "••••••••••••••••••••••••••"}
                          readOnly 
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="ml-2"
                          onClick={() => setShowToken(!showToken)}
                        >
                          {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard(instance.token)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                    <CardDescription>Manage your WhatsApp instance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="w-full" variant="default">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Text
                      </Button>
                      <Button className="w-full" variant="default">
                        <File className="h-4 w-4 mr-2" />
                        Send File
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 gap-4">
                      <Button variant="outline" className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reboot Instance
                      </Button>
                      <Button variant="outline" className="w-full">
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                      </Button>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Instance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Instance Status</AlertTitle>
                <AlertDescription>
                  This instance is authorized and ready to use. Your WhatsApp account is connected.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instance Settings</CardTitle>
                  <CardDescription>Customize your instance behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Settings will be implemented in the next phase.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="webhooks" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Webhook Configuration</CardTitle>
                  <CardDescription>Set up webhook endpoints for notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Webhook configuration will be implemented in the next phase.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default InstanceDetails;
