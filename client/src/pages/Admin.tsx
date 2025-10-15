import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { AdminTagManager } from "@/components/AdminTagManager";
import { VerificationQueue } from "@/components/VerificationQueue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Tag, Infographic } from "@shared/schema";

export default function Admin() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tags = [] } = useQuery<Tag[]>({
    queryKey: ["/api/tags"],
  });

  const { data: pendingInfographics = [] } = useQuery<Infographic[]>({
    queryKey: ["/api/admin/infographics/pending"],
    retry: false,
  });

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      toast({
        title: "Unauthorized",
        description: "You need admin access to view this page.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  }, [isAuthenticated, authLoading, user, toast]);

  const createTagMutation = useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
      return await apiRequest("/api/tags", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tags"] });
      toast({ title: "Success", description: "Tag created successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        window.location.href = "/api/login";
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to create tag",
        variant: "destructive",
      });
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: async (tagId: string) => {
      return await apiRequest(`/api/tags/${tagId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tags"] });
      toast({ title: "Success", description: "Tag deleted successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete tag",
        variant: "destructive",
      });
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async ({ id, status, rejectionReason }: { id: string; status: string; rejectionReason?: string }) => {
      return await apiRequest(`/api/admin/infographics/${id}/review`, {
        method: "PATCH",
        body: JSON.stringify({ status, rejectionReason }),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/infographics/pending"] });
      toast({ title: "Success", description: "Infographic reviewed successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to review infographic",
        variant: "destructive",
      });
    },
  });

  const handleCreateTag = (name: string, description?: string) => {
    createTagMutation.mutate({ name, description });
  };

  const handleDeleteTag = (id: string) => {
    deleteTagMutation.mutate(id);
  };

  const handleApprove = (id: string) => {
    reviewMutation.mutate({ id, status: 'approved' });
  };

  const handleReject = (id: string, reason: string) => {
    reviewMutation.mutate({ id, status: 'rejected', rejectionReason: reason });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="verification" className="space-y-6">
        <TabsList>
          <TabsTrigger value="verification" data-testid="tab-verification">
            Verification Queue ({pendingInfographics.length})
          </TabsTrigger>
          <TabsTrigger value="tags" data-testid="tab-tags">
            Tag Management ({tags.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="space-y-4">
          <VerificationQueue
            submissions={pendingInfographics.map(inf => ({
              id: inf.id,
              title: (inf.sectionA as any)?.title || 'Untitled',
              researcher: {
                name: 'Researcher',
                avatar: ''
              },
              tags: [],
              status: inf.status,
              submittedDate: new Date(inf.createdAt || '').toLocaleDateString(),
              coverImage: '',
            }))}
            onApprove={handleApprove}
            onReject={handleReject}
            onView={(id) => console.log('View:', id)}
          />
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <AdminTagManager
            tags={tags.map(t => ({ id: t.id, name: t.name, usageCount: 0 }))}
            onCreate={handleCreateTag}
            onDelete={handleDeleteTag}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
