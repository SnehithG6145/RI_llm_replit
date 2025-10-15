import { ResearcherUpload } from "@/components/ResearcherUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Eye } from "lucide-react";

export default function Researcher() {
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
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-info/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">2.4k</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
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
            <div className="p-3 rounded-md border hover-elevate">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Sleep and Productivity</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">
                  Approved
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Submitted 3 days ago • 487 views</p>
            </div>

            <div className="p-3 rounded-md border hover-elevate">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Exercise and Mental Health</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-warning/10 text-warning">
                  Pending
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Submitted 1 hour ago</p>
            </div>

            <div className="p-3 rounded-md border hover-elevate">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Nutrition Guidelines 2024</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">
                  Approved
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Submitted 1 week ago • 1.2k views</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
