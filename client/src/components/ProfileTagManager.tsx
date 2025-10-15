import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TagPill } from "./TagPill";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

interface ProfileTagManagerProps {
  selectedTags: string[];
  recommendedTags: string[];
  allTags: string[];
  onTagToggle: (tag: string) => void;
}

export function ProfileTagManager({
  selectedTags,
  recommendedTags,
  allTags,
  onTagToggle,
}: ProfileTagManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTags.includes(tag)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Interest Tags</CardTitle>
          <CardDescription>
            Customize your feed by selecting topics you're interested in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <TagPill
                  key={tag}
                  label={tag}
                  selected
                  onRemove={() => onTagToggle(tag)}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No tags selected yet. Browse recommended or search below.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Tags</CardTitle>
          <CardDescription>Based on your reading behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {recommendedTags.map((tag) => (
              <TagPill
                key={tag}
                label={tag}
                onClick={() => onTagToggle(tag)}
                className="hover-elevate"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Browse All Tags</CardTitle>
          <CardDescription>Search and discover new topics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-tags"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filteredTags.slice(0, 20).map((tag) => (
              <TagPill
                key={tag}
                label={tag}
                onClick={() => onTagToggle(tag)}
                className="hover-elevate"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
