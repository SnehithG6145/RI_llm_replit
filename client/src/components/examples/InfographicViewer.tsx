import { useState } from "react";
import { InfographicViewer } from "../InfographicViewer";
import { Button } from "@/components/ui/button";

export default function InfographicViewerExample() {
  const [open, setOpen] = useState(false);

  const sections = [
    {
      id: "overview",
      type: "overview" as const,
      title: "Overview",
      content: (
        <div className="space-y-4">
          <h2 className="text-4xl font-serif font-bold leading-tight">
            Sitting Is The New Smoking: Breaking The Sedentary Cycle
          </h2>
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-4xl font-mono font-bold text-primary">47%</p>
              <p className="text-sm text-muted-foreground mt-1">Increased mortality risk</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-4xl font-mono font-bold text-primary">8+</p>
              <p className="text-sm text-muted-foreground mt-1">Hours sitting daily</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-4xl font-mono font-bold text-primary">30min</p>
              <p className="text-sm text-muted-foreground mt-1">Movement needed</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Source: Journal of Preventive Medicine, 2024 • 12,000 participants
          </p>
        </div>
      ),
    },
    {
      id: "methods",
      type: "methods" as const,
      title: "Methods",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Research Methodology</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Study Design</h4>
              <p className="text-sm text-muted-foreground">
                Longitudinal cohort study over 10 years tracking sedentary behavior
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Participants</h4>
              <p className="text-sm text-muted-foreground">
                12,000 office workers aged 25-65 across 8 countries
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "solution-1",
      type: "solution" as const,
      title: "Solution 1",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Stand Up Every 30 Minutes</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Set a timer on your phone or computer for every 30 minutes</li>
            <li>Stand up and stretch for at least 1-2 minutes</li>
            <li>Walk to get water or use stairs if available</li>
            <li>Do simple desk exercises like shoulder rolls or leg raises</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Viewer</Button>
      <InfographicViewer
        open={open}
        onClose={() => setOpen(false)}
        sections={sections}
      />
    </div>
  );
}
