import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Loader2 } from "lucide-react";

export function ResearcherUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState<"upload" | "questionnaire">("upload");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setStep("questionnaire");
      console.log("File uploaded, moving to questionnaire");
    }, 1500);
  };

  const handleSubmitQuestionnaire = () => {
    console.log("Questionnaire submitted, generating infographics...");
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
              data-testid="input-target-audience"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="application-areas">Application Areas</Label>
            <Textarea
              id="application-areas"
              placeholder="Where can people apply this research in their daily lives?"
              data-testid="textarea-application-areas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="practical-constraints">Practical Constraints</Label>
            <Textarea
              id="practical-constraints"
              placeholder="Any limitations or considerations people should know?"
              data-testid="textarea-constraints"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-insights">Additional Insights (Optional)</Label>
            <Textarea
              id="additional-insights"
              placeholder="Any other context that would help generate better solutions?"
              data-testid="textarea-insights"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={() => setStep("upload")} variant="outline" data-testid="button-back">
              Back
            </Button>
            <Button onClick={handleSubmitQuestionnaire} className="flex-1" data-testid="button-generate">
              Generate Infographics
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
          Upload your research paper as text or PDF to generate infographics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover-elevate cursor-pointer">
          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            data-testid="input-file"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, TXT, DOC up to 10MB
                </p>
              </div>
            </div>
          </label>
        </div>

        {file && (
          <div className="flex items-center gap-3 p-3 rounded-md bg-muted">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full"
          data-testid="button-upload"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
