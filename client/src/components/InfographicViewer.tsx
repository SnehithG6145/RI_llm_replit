import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfographicSection {
  id: string;
  type: "overview" | "methods" | "solution";
  title: string;
  content: React.ReactNode;
}

interface InfographicViewerProps {
  open: boolean;
  onClose: () => void;
  sections: InfographicSection[];
}

export function InfographicViewer({ open, onClose, sections }: InfographicViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 gap-0 bg-black/90">
        <div className="relative w-full h-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={onClose}
            data-testid="button-close-viewer"
          >
            <X className="h-6 w-6" />
          </Button>

          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 z-40 text-white hover:bg-white/20"
              onClick={goToPrevious}
              data-testid="button-previous-section"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {currentIndex < sections.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 z-40 text-white hover:bg-white/20"
              onClick={goToNext}
              data-testid="button-next-section"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          <div className="w-full h-full overflow-auto p-8 flex items-center justify-center">
            <div className="bg-card rounded-md shadow-2xl max-w-3xl w-full p-8">
              {sections[currentIndex]?.content}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                )}
                data-testid={`button-section-${index}`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
