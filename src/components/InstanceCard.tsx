
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export interface InstanceProps {
  id: string;
  name: string;
  phoneNumber: string;
  isAuthorized: boolean;
  tariff: string;
  createdAt: string;
  expiresAt: string;
  daysLeft: number;
  avatarUrl?: string;
}

export function InstanceCard({
  id,
  name,
  phoneNumber,
  isAuthorized,
  tariff,
  createdAt,
  expiresAt,
  daysLeft,
  avatarUrl = ""
}: InstanceProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-start p-6">
          <div className="mr-4 h-14 w-14 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-primary">{name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{name}</h3>
              <Badge 
                variant={isAuthorized ? "default" : "destructive"}
                className="ml-2"
              >
                {isAuthorized ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Authorized
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <XCircle className="h-3 w-3" /> Not Authorized
                  </span>
                )}
              </Badge>
            </div>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">ID:</p>
                <p className="font-medium">{id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone:</p>
                <p className="font-medium">{phoneNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tariff:</p>
                <p className="font-medium">{tariff}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Days left:</p>
                <p className="font-medium">{daysLeft} days</p>
              </div>
              <div>
                <p className="text-muted-foreground">Created:</p>
                <p className="font-medium">{createdAt}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expires:</p>
                <p className="font-medium">{expiresAt}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 p-3">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/instances/${id}`}>Manage</Link>
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link to={`/chats?instance=${id}`}>Open Chats</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
