import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { ResearcherUpload } from "@/components/ResearcherUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Eye } from "lucide-react";
import type { Infographic } from "@shared/schema";

export default function Researcher() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: infographics, isLoading } = useQuery<Infographic[]>({
    queryKey: ["/api/researcher/infographics"],
    retry: false,
  });

  // Redirect to home if not authenticated
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

  const stats = {
    total: infographics?.length || 0,
    approved: infographics?.filter(i => i.status === 'approved').length || 0,
    pending: infographics?.filter(i => i.status === 'pending').length || 0,
    rejected: infographics?.filter(i => i.status === 'rejected').length || 0,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'rejected': return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTimeAgo = (date: Date | null) => {
    if (!date) return '';
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Researcher Dashboard</h1>
        <p className="text-muted-foreground">
          Upload your research and transform it into accessible infographics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="stat-total">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="stat-approved">{stats.approved}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="stat-pending">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ResearcherUpload />

        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Track the status of your uploaded research</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : infographics && infographics.length > 0 ? (
              infographics.slice(0, 5).map((infographic) => (
                <div key={infographic.id} className="p-3 rounded-md border hover-elevate">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm" data-testid={`infographic-title-${infographic.id}`}>
                      {(infographic.sectionA as any)?.title || 'Untitled'}
                    </h4>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(infographic.status)}`}
                      data-testid={`infographic-status-${infographic.id}`}
                    >
                      {infographic.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Submitted {getTimeAgo(infographic.createdAt)}
                  </p>
                  {infographic.status === 'rejected' && infographic.rejectionReason && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      Reason: {infographic.rejectionReason}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No submissions yet. Upload your first research paper to get started!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
