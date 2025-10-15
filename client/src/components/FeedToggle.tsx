import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FeedToggleProps {
  value: "for-you" | "explore";
  onChange: (value: "for-you" | "explore") => void;
}

export function FeedToggle({ value, onChange }: FeedToggleProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as "for-you" | "explore")}>
      <TabsList className="w-full md:w-auto" data-testid="tabs-feed">
        <TabsTrigger value="for-you" className="flex-1 md:flex-none" data-testid="tab-for-you">
          For You
        </TabsTrigger>
        <TabsTrigger value="explore" className="flex-1 md:flex-none" data-testid="tab-explore">
          Explore
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
