import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  userRole: "researcher" | "customer" | "admin";
  userName: string;
  userAvatar?: string;
  onSearch?: (query: string) => void;
}

export function Navigation({ userRole, userName, userAvatar, onSearch }: NavigationProps) {
  const roleColors = {
    researcher: "bg-info/10 text-info border-info/20",
    customer: "bg-primary/10 text-primary border-primary/20",
    admin: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-serif font-bold" data-testid="text-logo">
              ResearchBite
            </h1>
            <div className="hidden md:flex relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by tags..."
                className="pl-10"
                onChange={(e) => onSearch?.(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className={roleColors[userRole]} data-testid="badge-user-role">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" className="gap-2 px-2" data-testid="button-profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} />
                <AvatarFallback>{userName[0]}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">{userName}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
