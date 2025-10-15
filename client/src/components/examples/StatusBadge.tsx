import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="p-4 flex gap-3">
      <StatusBadge status="approved" />
      <StatusBadge status="pending" />
      <StatusBadge status="rejected" />
    </div>
  );
}
