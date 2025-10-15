import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagPillProps {
  label: string;
  selected?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

export function TagPill({ label, selected, onRemove, onClick, className }: TagPillProps) {
  return (
    <Badge
      variant={selected ? "default" : "outline"}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide cursor-pointer",
        selected && "bg-primary text-primary-foreground",
        className
      )}
      onClick={onClick}
      data-testid={`tag-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {label}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:opacity-70"
          data-testid={`button-remove-tag-${label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
