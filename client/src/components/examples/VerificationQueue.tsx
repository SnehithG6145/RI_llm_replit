import { useState } from "react";
import { VerificationQueue } from "../VerificationQueue";
import infographic1 from "@assets/stock_images/infographic_design_w_7b77ce39.jpg";
import infographic2 from "@assets/stock_images/infographic_design_w_81ae4f32.jpg";
import avatar1 from "@assets/stock_images/professional_researc_f4eae1c5.jpg";
import avatar2 from "@assets/stock_images/professional_researc_0c22873e.jpg";

type Status = "approved" | "pending" | "rejected";

export default function VerificationQueueExample() {
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
      title: "Microplastics in Ocean Ecosystems",
      researcher: { name: "Dr. Marcus Kim", avatar: avatar2 },
      tags: ["Environment", "Biology"],
      status: "approved",
      submittedDate: "3 hours ago",
      coverImage: infographic2,
    },
  ]);

  return (
    <div className="p-4 max-w-4xl">
      <VerificationQueue
        submissions={submissions}
        onApprove={(id) => {
          setSubmissions(
            submissions.map((s) =>
              s.id === id ? { ...s, status: "approved" as const } : s
            )
          );
        }}
        onReject={(id) => {
          setSubmissions(
            submissions.map((s) =>
              s.id === id ? { ...s, status: "rejected" as const } : s
            )
          );
        }}
        onView={(id) => console.log("View:", id)}
      />
    </div>
  );
}
