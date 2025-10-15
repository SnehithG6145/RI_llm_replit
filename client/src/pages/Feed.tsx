import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FeedToggle } from "@/components/FeedToggle";
import { InfographicCard } from "@/components/InfographicCard";
import { InfographicViewer } from "@/components/InfographicViewer";
import type { Infographic } from "@shared/schema";

export default function Feed() {
  const [feedType, setFeedType] = useState<"for-you" | "explore">("for-you");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedInfographic, setSelectedInfographic] = useState<Infographic | null>(null);

  const { data: personalizedInfographics = [] } = useQuery<Infographic[]>({
    queryKey: ["/api/infographics/feed/personalized"],
    enabled: feedType === "for-you",
    retry: false,
  });

  const { data: allInfographics = [] } = useQuery<Infographic[]>({
    queryKey: ["/api/infographics"],
    enabled: feedType === "explore",
  });

  const infographics = feedType === "for-you" ? personalizedInfographics : allInfographics;

  const handleCardClick = (infographic: Infographic) => {
    setSelectedInfographic(infographic);
    setViewerOpen(true);
  };

  const handleClose = () => {
    setViewerOpen(false);
    setSelectedInfographic(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Discover Research</h1>
          <p className="text-muted-foreground">
            Explore bite-sized research insights tailored for you
          </p>
        </div>

        <FeedToggle
          feedType={feedType}
          onToggle={setFeedType}
        />
      </div>

      {infographics.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            {feedType === "for-you" 
              ? "No personalized content yet. Select some tags in your profile to get started!"
              : "No infographics available yet. Check back soon!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infographics.map((infographic) => (
            <InfographicCard
              key={infographic.id}
              title={(infographic.sectionA as any)?.title || 'Untitled'}
              coverImage=""
              tags={[]}
              researcher={{
                name: 'Researcher',
                avatar: '',
                verified: true,
              }}
              date={new Date(infographic.createdAt || '').toLocaleDateString()}
              onClick={() => handleCardClick(infographic)}
            />
          ))}
        </div>
      )}

      {selectedInfographic && (
        <InfographicViewer
          open={viewerOpen}
          onClose={handleClose}
          sections={[
            {
              id: "overview",
              type: "overview",
              title: "Overview",
              content: (
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif font-bold leading-tight">
                    {(selectedInfographic.sectionA as any)?.title || 'Untitled'}
                  </h2>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {(selectedInfographic.sectionA as any)?.summary}
                  </p>
                  <div className="grid grid-cols-3 gap-4 my-6">
                    {(selectedInfographic.sectionA as any)?.statistics?.map((stat: any, idx: number) => (
                      <div key={idx} className="text-center p-4 rounded-md bg-muted">
                        <p className="text-3xl font-mono font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Sources:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {(selectedInfographic.sectionA as any)?.sources?.map((source: string, idx: number) => (
                        <li key={idx}>• {source}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              id: "methods",
              type: "methods",
              title: "Research Methods",
              content: (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Methodology</h3>
                  <p className="text-muted-foreground">{(selectedInfographic.sectionB as any)?.methodology}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Participants:</h4>
                    <p className="text-sm text-muted-foreground">{(selectedInfographic.sectionB as any)?.participants}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Study Design:</h4>
                    <p className="text-sm text-muted-foreground">{(selectedInfographic.sectionB as any)?.studyDesign}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Technical Terms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedInfographic.sectionB as any)?.technicalTerms?.map((term: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-muted rounded-full text-sm">{term}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            ...((selectedInfographic.sectionC as any[]) || []).map((solution: any, idx: number) => ({
              id: `solution-${idx}`,
              type: "solution" as const,
              title: solution.title,
              badge: solution.badge,
              content: (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {solution.badge}
                    </div>
                    <h3 className="text-2xl font-semibold">{solution.title}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {solution.steps?.map((step: string, stepIdx: number) => (
                      <li key={stepIdx} className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <p className="text-muted-foreground">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            })),
          ]}
        />
      )}
    </div>
  );
}
