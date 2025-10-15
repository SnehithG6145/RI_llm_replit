import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";
import type { Tag } from "@shared/schema";

export function ResearcherUpload() {
  const [researchText, setResearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [step, setStep] = useState<"upload" | "questionnaire">("upload");
  const [formData, setFormData] = useState({
    targetAudience: "",
    applicationAreas: "",
    practicalConstraints: "",
    additionalInsights: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tags = [] } = useQuery<Tag[]>({
    queryKey: ["/api/tags"],
  });

  const uploadMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/infographics", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your research has been submitted for review.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/researcher/infographics"] });
      
      // Reset form
      setResearchText("");
      setSelectedTags([]);
      setFormData({
        targetAudience: "",
        applicationAreas: "",
        practicalConstraints: "",
        additionalInsights: "",
      });
      setStep("upload");
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to upload research. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleContinue = () => {
    if (!researchText.trim()) {
      toast({
        title: "Missing text",
        description: "Please paste your research text to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep("questionnaire");
  };

  const handleSubmit = () => {
    const researcherNotes = `
Target Audience: ${formData.targetAudience}
Application Areas: ${formData.applicationAreas}
Practical Constraints: ${formData.practicalConstraints}
Additional Insights: ${formData.additionalInsights}
    `.trim();

    uploadMutation.mutate({
      researchText,
      researcherNotes: researcherNotes || undefined,
      tagIds: selectedTags,
    });
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  if (step === "questionnaire") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Help Us Generate Better Solutions</CardTitle>
          <CardDescription>
            Answer a few questions to help us create actionable insights for your audience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target-audience">Target Audience</Label>
            <Input
              id="target-audience"
              placeholder="e.g., Office workers, Students, Athletes"
              value={formData.targetAudience}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
              data-testid="input-target-audience"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="application-areas">Application Areas</Label>
            <Textarea
              id="application-areas"
              placeholder="Where can people apply this research in their daily lives?"
              value={formData.applicationAreas}
              onChange={(e) => setFormData(prev => ({ ...prev, applicationAreas: e.target.value }))}
              data-testid="textarea-application-areas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="practical-constraints">Practical Constraints</Label>
            <Textarea
              id="practical-constraints"
              placeholder="Any limitations or considerations people should know?"
              value={formData.practicalConstraints}
              onChange={(e) => setFormData(prev => ({ ...prev, practicalConstraints: e.target.value }))}
              data-testid="textarea-constraints"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-insights">Additional Insights (Optional)</Label>
            <Textarea
              id="additional-insights"
              placeholder="Any other context that would help generate better solutions?"
              value={formData.additionalInsights}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalInsights: e.target.value }))}
              data-testid="textarea-insights"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Tags (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag.id)}
                  data-testid={`tag-${tag.id}`}
                >
                  {selectedTags.includes(tag.id) && <CheckCircle2 className="h-3 w-3 mr-1" />}
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => setStep("upload")} 
              variant="outline" 
              disabled={uploadMutation.isPending}
              data-testid="button-back"
            >
              Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1" 
              disabled={uploadMutation.isPending}
              data-testid="button-generate"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Infographics"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Research</CardTitle>
        <CardDescription>
          Paste your research paper text to generate infographics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="research-text">Research Paper Text</Label>
          <Textarea
            id="research-text"
            placeholder="Paste the full text of your research paper here..."
            value={researchText}
            onChange={(e) => setResearchText(e.target.value)}
            rows={12}
            className="font-mono text-sm"
            data-testid="textarea-research"
          />
          <p className="text-xs text-muted-foreground">
            Paste the complete research paper including abstract, methodology, results, and conclusions
          </p>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!researchText.trim()}
          className="w-full"
          data-testid="button-continue"
        >
          Continue to Questionnaire
        </Button>
      </CardContent>
    </Card>
  );
}
