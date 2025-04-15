
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CheckCircle,
  Cog,
  FileText,
  MessageSquare,
  Phone,
  Server,
  Users
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-secondary",
        active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="h-screen w-64 border-r bg-sidebar p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-primary rounded-md p-1">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-lg font-bold">WhatsApp Hub</h1>
      </div>

      <nav className="space-y-1">
        <SidebarItem 
          icon={Server} 
          label="Instances" 
          href="/" 
          active={pathname === '/'} 
        />
        <SidebarItem 
          icon={MessageSquare} 
          label="Chats" 
          href="/chats" 
          active={pathname.startsWith('/chats')} 
        />
        <SidebarItem 
          icon={FileText} 
          label="Documentation" 
          href="/docs" 
          active={pathname.startsWith('/docs')} 
        />
        <SidebarItem 
          icon={CheckCircle} 
          label="Status" 
          href="/status" 
          active={pathname.startsWith('/status')} 
        />
        <SidebarItem 
          icon={BarChart3} 
          label="Analytics" 
          href="/analytics" 
          active={pathname.startsWith('/analytics')} 
        />
        <SidebarItem 
          icon={Users} 
          label="Contacts" 
          href="/contacts" 
          active={pathname.startsWith('/contacts')} 
        />
        <SidebarItem 
          icon={Cog} 
          label="Settings" 
          href="/settings" 
          active={pathname.startsWith('/settings')} 
        />
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-lg border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Connected</p>
              <p className="text-sm font-medium">ID: 7700110279</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
