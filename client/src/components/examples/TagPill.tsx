import { TagPill } from "../TagPill";

export default function TagPillExample() {
  return (
    <div className="p-4 flex flex-wrap gap-2">
      <TagPill label="Health" />
      <TagPill label="Psychology" selected />
      <TagPill label="Technology" onRemove={() => console.log("Remove")} />
      <TagPill label="Environment" selected onRemove={() => console.log("Remove")} />
    </div>
  );
}
