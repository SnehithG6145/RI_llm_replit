import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { ProfileTagManager } from "@/components/ProfileTagManager";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import type { Tag } from "@shared/schema";

export default function Profile() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userTags = [] } = useQuery<Tag[]>({
    queryKey: ["/api/user/tags"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: allTags = [] } = useQuery<Tag[]>({
    queryKey: ["/api/tags"],
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  const addTagMutation = useMutation({
    mutationFn: async (tagId: string) => {
      return await apiRequest(`/api/user/tags/${tagId}`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/tags"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        window.location.href = "/api/login";
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add tag",
        variant: "destructive",
      });
    },
  });

  const removeTagMutation = useMutation({
    mutationFn: async (tagId: string) => {
      return await apiRequest(`/api/user/tags/${tagId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/tags"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to remove tag",
        variant: "destructive",
      });
    },
  });

  const handleTagToggle = (tag: string) => {
    const tagObj = allTags.find(t => t.name === tag);
    if (!tagObj) return;

    const isSelected = userTags.some(t => t.id === tagObj.id);
    if (isSelected) {
      removeTagMutation.mutate(tagObj.id);
    } else {
      addTagMutation.mutate(tagObj.id);
    }
  };

  const selectedTags = userTags.map(t => t.name);
  const selectedTagIds = userTags.map(t => t.id);
  const recommendedTags = allTags
    .filter(t => !selectedTagIds.includes(t.id))
    .slice(0, 5)
    .map(t => t.name);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.profileImageUrl || ''} />
                <AvatarFallback>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-serif font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-muted-foreground capitalize">{user?.role || 'Customer'}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/api/logout"}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-2xl font-bold" data-testid="stat-tags">{selectedTags.length}</p>
              <p className="text-sm text-muted-foreground">Topics Following</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-2xl font-bold">{user?.email || 'N/A'}</p>
              <p className="text-sm text-muted-foreground">Email</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-2xl font-bold">{user?.id?.slice(0, 8) || 'N/A'}</p>
              <p className="text-sm text-muted-foreground">User ID</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileTagManager
        selectedTags={selectedTags}
        recommendedTags={recommendedTags}
        allTags={allTags.map(t => t.name)}
        onTagToggle={handleTagToggle}
      />
    </div>
  );
}
