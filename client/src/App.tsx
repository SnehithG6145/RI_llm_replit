import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import Feed from "@/pages/Feed";
import Profile from "@/pages/Profile";
import Admin from "@/pages/Admin";
import Researcher from "@/pages/Researcher";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";
import avatar from "@assets/stock_images/professional_researc_f4eae1c5.jpg";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, LayoutGrid, User, Settings, Upload, Info } from "lucide-react";

function Router() {
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

function App() {
  const userRole = "customer";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation
              userRole={userRole}
              userName="Sarah Chen"
              userAvatar={avatar}
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
                <Link href="/researcher">
                  <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-researcher">
                    <Upload className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-profile">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-admin">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="mt-auto">
                  <Link href="/about">
                    <Button variant="ghost" size="icon" className="h-12 w-12" data-testid="nav-about-sidebar">
                      <Info className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </aside>
              
              <main className="flex-1">
                <Router />
              </main>
            </div>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
