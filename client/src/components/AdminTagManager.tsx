import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagPill } from "./TagPill";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Tag {
  id: string;
  name: string;
  usageCount: number;
}

interface AdminTagManagerProps {
  tags: Tag[];
  onCreateTag: (name: string) => void;
  onDeleteTag: (id: string) => void;
}

export function AdminTagManager({ tags, onCreateTag, onDeleteTag }: AdminTagManagerProps) {
  const [newTagName, setNewTagName] = useState("");

  const handleCreate = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim());
      setNewTagName("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tag Management</CardTitle>
        <CardDescription>Create and manage research categorization tags</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="New tag name..."
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            data-testid="input-new-tag"
          />
          <Button onClick={handleCreate} data-testid="button-create-tag">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </div>

        <div className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-3 rounded-md border hover-elevate"
              data-testid={`tag-item-${tag.id}`}
            >
              <div className="flex items-center gap-3">
                <TagPill label={tag.name} />
                <Badge variant="secondary" className="text-xs">
                  {tag.usageCount} uses
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteTag(tag.id)}
                data-testid={`button-delete-tag-${tag.id}`}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
