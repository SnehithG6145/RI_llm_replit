import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { TagPill } from "./TagPill";
import { CheckCircle2, XCircle, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SubmissionItem {
  id: string;
  title: string;
  researcher: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  status: "approved" | "pending" | "rejected";
  submittedDate: string;
  coverImage: string;
}

interface VerificationQueueProps {
  submissions: SubmissionItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onView: (id: string) => void;
}

export function VerificationQueue({
  submissions,
  onApprove,
  onReject,
  onView,
}: VerificationQueueProps) {
  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id} className="overflow-hidden" data-testid={`submission-${submission.id}`}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-48 aspect-[3/4] md:aspect-auto overflow-hidden">
              <img
                src={submission.coverImage}
                alt={submission.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold mb-2">
                      {submission.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={submission.researcher.avatar} />
                        <AvatarFallback>{submission.researcher.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {submission.researcher.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        • {submission.submittedDate}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {submission.tags.map((tag) => (
                        <TagPill key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                  <StatusBadge status={submission.status} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(submission.id)}
                    data-testid={`button-view-${submission.id}`}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {submission.status === "pending" && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onApprove(submission.id)}
                        className="bg-success hover:bg-success/90"
                        data-testid={`button-approve-${submission.id}`}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReject(submission.id)}
                        className="text-destructive border-destructive/20 hover:bg-destructive/10"
                        data-testid={`button-reject-${submission.id}`}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
