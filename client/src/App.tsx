import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Feed from "@/pages/Feed";
import Profile from "@/pages/Profile";
import Admin from "@/pages/Admin";
import Researcher from "@/pages/Researcher";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, LayoutGrid, User, Settings, Upload, Info } from "lucide-react";

interface RouterProps {
  isAuthenticated: boolean;
  isLoading: boolean;
}

function Router({ isAuthenticated, isLoading }: RouterProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Login} />
        <Route component={Login} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/feed" component={Feed} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin" component={Admin} />
      <Route path="/researcher" component={Researcher} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

interface AuthenticatedAppProps {
  user: any;
  isLoading: boolean;
}

function AuthenticatedApp({ user, isLoading }: AuthenticatedAppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation
        userRole={(user?.role || 'customer') as 'customer' | 'researcher' | 'admin'}
        userName={`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User'}
        userAvatar={user?.profileImageUrl || undefined}
        onSearch={(q) => console.log("Search:", q)}
      />
      
      <div className="flex-1 flex">
        <aside className="hidden md:flex w-20 border-r flex-col items-center py-6 gap-4 sticky top-16 h-[calc(100vh-4rem)]">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-home">
              <HomeIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/feed">
            <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-feed">
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </Link>
          {(user?.role === 'researcher' || user?.role === 'admin') && (
            <Link href="/researcher">
              <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-researcher">
                <Upload className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-profile">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          {user?.role === 'admin' && (
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-admin">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <div className="mt-auto">
            <Link href="/about">
              <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-about-sidebar">
                <Info className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </aside>
        
        <main className="flex-1">
          <Router isAuthenticated={true} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <AuthenticatedApp user={user} isLoading={isLoading} />;
  }

  return <Router isAuthenticated={false} isLoading={isLoading} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
