import { useState } from "react";
import { AdminTagManager } from "@/components/AdminTagManager";
import { VerificationQueue } from "@/components/VerificationQueue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import infographic1 from "@assets/stock_images/infographic_design_w_7b77ce39.jpg";
import infographic2 from "@assets/stock_images/infographic_design_w_81ae4f32.jpg";
import infographic3 from "@assets/stock_images/infographic_design_w_6a24cf61.jpg";
import avatar1 from "@assets/stock_images/professional_researc_f4eae1c5.jpg";
import avatar2 from "@assets/stock_images/professional_researc_0c22873e.jpg";
import avatar3 from "@assets/stock_images/professional_researc_598313a1.jpg";

type Status = "approved" | "pending" | "rejected";

export default function Admin() {
  const [tags, setTags] = useState([
    { id: "1", name: "Health", usageCount: 145 },
    { id: "2", name: "Psychology", usageCount: 89 },
    { id: "3", name: "Technology", usageCount: 203 },
    { id: "4", name: "Environment", usageCount: 67 },
  ]);

  const [submissions, setSubmissions] = useState<Array<{
    id: string;
    title: string;
    researcher: { name: string; avatar: string };
    tags: string[];
    status: Status;
    submittedDate: string;
    coverImage: string;
  }>>([
    {
      id: "1",
      title: "The Impact of Blue Light on Sleep Quality",
      researcher: { name: "Dr. Sarah Chen", avatar: avatar1 },
      tags: ["Health", "Technology"],
      status: "pending",
      submittedDate: "1 hour ago",
      coverImage: infographic1,
    },
    {
      id: "2",
      title: "Microplastics in Ocean Ecosystems: A Growing Concern",
      researcher: { name: "Dr. Marcus Kim", avatar: avatar2 },
      tags: ["Environment"],
      status: "pending",
      submittedDate: "3 hours ago",
      coverImage: infographic2,
    },
    {
      id: "3",
      title: "Cognitive Benefits of Bilingualism in Children",
      researcher: { name: "Dr. Elena Rodriguez", avatar: avatar3 },
      tags: ["Psychology"],
      status: "approved",
      submittedDate: "1 day ago",
      coverImage: infographic3,
    },
  ]);

  const handleCreateTag = (name: string) => {
    const newTag = {
      id: Date.now().toString(),
      name,
      usageCount: 0,
    };
    setTags([...tags, newTag]);
    console.log("Created tag:", name);
  };

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((t) => t.id !== id));
    console.log("Deleted tag:", id);
  };

  const handleApprove = (id: string) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === id ? { ...s, status: "approved" as Status } : s
      )
    );
    console.log("Approved:", id);
  };

  const handleReject = (id: string) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === id ? { ...s, status: "rejected" as Status } : s
      )
    );
    console.log("Rejected:", id);
  };

  const handleView = (id: string) => {
    console.log("View details:", id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="verification" className="space-y-6">
        <TabsList>
          <TabsTrigger value="verification" data-testid="tab-verification">
            Verification Queue
          </TabsTrigger>
          <TabsTrigger value="tags" data-testid="tab-tags">
            Tag Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Pending Submissions</h2>
            <p className="text-sm text-muted-foreground">
              Review and verify research infographics before publication
            </p>
          </div>
          <VerificationQueue
            submissions={submissions}
            onApprove={handleApprove}
            onReject={handleReject}
            onView={handleView}
          />
        </TabsContent>

        <TabsContent value="tags">
          <AdminTagManager
            tags={tags}
            onCreateTag={handleCreateTag}
            onDeleteTag={handleDeleteTag}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
