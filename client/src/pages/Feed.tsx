import { useState } from "react";
import { FeedToggle } from "@/components/FeedToggle";
import { InfographicCard } from "@/components/InfographicCard";
import { InfographicViewer } from "@/components/InfographicViewer";
import infographic1 from "@assets/stock_images/infographic_design_w_7b77ce39.jpg";
import infographic2 from "@assets/stock_images/infographic_design_w_81ae4f32.jpg";
import infographic3 from "@assets/stock_images/infographic_design_w_6a24cf61.jpg";
import avatar1 from "@assets/stock_images/professional_researc_f4eae1c5.jpg";
import avatar2 from "@assets/stock_images/professional_researc_0c22873e.jpg";
import avatar3 from "@assets/stock_images/professional_researc_598313a1.jpg";

export default function Feed() {
  const [feedType, setFeedType] = useState<"for-you" | "explore">("for-you");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedInfographic, setSelectedInfographic] = useState<string | null>(null);

  const infographics = [
    {
      id: "1",
      title: "Sitting Is The New Smoking: Breaking The Sedentary Cycle",
      coverImage: infographic1,
      tags: ["Health", "Workplace"],
      researcher: {
        name: "Dr. Emily Johnson",
        avatar: avatar1,
        verified: true,
      },
      date: "2 days ago",
    },
    {
      id: "2",
      title: "The Microbiome Revolution: How Gut Health Shapes Your Mind",
      coverImage: infographic2,
      tags: ["Psychology", "Biology"],
      researcher: {
        name: "Dr. Marcus Chen",
        avatar: avatar2,
        verified: true,
      },
      date: "4 days ago",
    },
    {
      id: "3",
      title: "Sleep Optimization: The Science Behind Better Rest",
      coverImage: infographic3,
      tags: ["Health", "Neuroscience"],
      researcher: {
        name: "Dr. Sarah Williams",
        avatar: avatar3,
        verified: false,
      },
      date: "1 week ago",
    },
  ];

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
          <p className="text-base leading-relaxed text-muted-foreground">
            Extended periods of sitting have been linked to numerous health risks,
            comparable to smoking in their impact on mortality and chronic disease.
          </p>
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-5xl font-mono font-bold text-primary">47%</p>
              <p className="text-sm text-muted-foreground mt-2">Increased mortality risk</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-5xl font-mono font-bold text-primary">8+</p>
              <p className="text-sm text-muted-foreground mt-2">Hours sitting daily</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-5xl font-mono font-bold text-primary">30</p>
              <p className="text-sm text-muted-foreground mt-2">Min movement needed</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground border-t pt-4">
            <p><strong>Source:</strong> Journal of Preventive Medicine, 2024</p>
            <p><strong>Conclusion:</strong> Regular movement breaks significantly reduce health risks</p>
          </div>
        </div>
      ),
    },
    {
      id: "methods",
      type: "methods" as const,
      title: "Methods",
      content: (
        <div className="space-y-4">
          <h3 className="text-3xl font-serif font-semibold">Research Methodology</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Study Design</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Longitudinal cohort study over 10 years tracking sedentary behavior
                and health outcomes using wearable technology and biometric monitoring.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Participants</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                12,000 office workers aged 25-65 across 8 countries, balanced for
                gender and occupational diversity.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Key Metrics</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Daily sitting time (accelerometer data)</li>
                <li>• Cardiovascular biomarkers</li>
                <li>• Metabolic syndrome indicators</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Technical Terms</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Sedentary bout duration</li>
                <li>• Metabolic equivalent (MET)</li>
                <li>• Dose-response relationship</li>
              </ul>
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
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-3xl font-serif font-semibold">Stand Up Every 30 Minutes</h3>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            Breaking up prolonged sitting with short movement breaks can dramatically
            reduce health risks.
          </p>
          <div className="space-y-3">
            <h4 className="font-semibold">How to implement:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed">
              <li>Set a timer on your phone or computer for every 30 minutes</li>
              <li>Stand up and stretch for at least 1-2 minutes</li>
              <li>Walk to get water or use stairs if available</li>
              <li>Do simple desk exercises like shoulder rolls or leg raises</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: "solution-2",
      type: "solution" as const,
      title: "Solution 2",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-3xl font-serif font-semibold">Walking Meetings</h3>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            Transform sedentary meetings into active collaboration opportunities.
          </p>
          <div className="space-y-3">
            <h4 className="font-semibold">How to implement:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed">
              <li>Propose walking meetings for one-on-one discussions</li>
              <li>Use a route around your office building or nearby park</li>
              <li>Take notes on your phone while walking</li>
              <li>Start with 15-minute walking meetings and increase gradually</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: "solution-3",
      type: "solution" as const,
      title: "Solution 3",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-3xl font-serif font-semibold">Active Workstation Setup</h3>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            Redesign your workspace to encourage natural movement throughout the day.
          </p>
          <div className="space-y-3">
            <h4 className="font-semibold">How to implement:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed">
              <li>Consider a standing desk or desk converter (adjust height throughout day)</li>
              <li>Place frequently used items slightly out of reach to encourage standing</li>
              <li>Use a stability ball for short periods as an alternative to chair</li>
              <li>Position printer or water cooler away from desk to create movement</li>
            </ol>
          </div>
        </div>
      ),
    },
  ];

  const handleCardClick = (id: string) => {
    setSelectedInfographic(id);
    setViewerOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold mb-4">Your Research Feed</h2>
        <FeedToggle value={feedType} onChange={setFeedType} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infographics.map((infographic) => (
          <InfographicCard
            key={infographic.id}
            {...infographic}
            onClick={() => handleCardClick(infographic.id)}
          />
        ))}
      </div>

      <InfographicViewer
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        sections={sections}
      />
    </div>
  );
}
