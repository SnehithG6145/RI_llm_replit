import { useState } from "react";
import { AdminTagManager } from "../AdminTagManager";

export default function AdminTagManagerExample() {
  const [tags, setTags] = useState([
    { id: "1", name: "Health", usageCount: 145 },
    { id: "2", name: "Psychology", usageCount: 89 },
    { id: "3", name: "Technology", usageCount: 203 },
  ]);

  const handleCreate = (name: string) => {
    const newTag = {
      id: Date.now().toString(),
      name,
      usageCount: 0,
    };
    setTags([...tags, newTag]);
    console.log("Created tag:", name);
  };

  const handleDelete = (id: string) => {
    setTags(tags.filter((t) => t.id !== id));
    console.log("Deleted tag:", id);
  };

  return (
    <div className="p-4 max-w-2xl">
      <AdminTagManager
        tags={tags}
        onCreateTag={handleCreate}
        onDeleteTag={handleDelete}
      />
    </div>
  );
}
