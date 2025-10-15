import { useState } from "react";
import { FeedToggle } from "../FeedToggle";

export default function FeedToggleExample() {
  const [value, setValue] = useState<"for-you" | "explore">("for-you");

  return (
    <div className="p-4">
      <FeedToggle value={value} onChange={setValue} />
      <p className="mt-4 text-sm text-muted-foreground">
        Current tab: {value === "for-you" ? "For You" : "Explore"}
      </p>
    </div>
  );
}
