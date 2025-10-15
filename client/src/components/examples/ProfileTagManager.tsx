import { useState } from "react";
import { ProfileTagManager } from "../ProfileTagManager";

export default function ProfileTagManagerExample() {
  const [selectedTags, setSelectedTags] = useState(["Health", "Psychology"]);

  const recommendedTags = ["Technology", "Environment", "Neuroscience"];
  const allTags = [
    "Health",
    "Psychology",
    "Technology",
    "Environment",
    "Neuroscience",
    "Biology",
    "Climate",
    "Education",
    "Nutrition",
    "Exercise",
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="p-4 max-w-4xl">
      <ProfileTagManager
        selectedTags={selectedTags}
        recommendedTags={recommendedTags}
        allTags={allTags}
        onTagToggle={handleTagToggle}
      />
    </div>
  );
}
