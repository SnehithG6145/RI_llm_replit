import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

type Status = "approved" | "pending" | "rejected";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const configs = {
    approved: {
      label: "Approved",
      icon: CheckCircle2,
      className: "bg-success/10 text-success border-success/20",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-warning/10 text-warning border-warning/20",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-error/10 text-error border-error/20",
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className} data-testid={`badge-status-${status}`}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}
