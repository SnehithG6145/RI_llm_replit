import { Card } from "@/components/ui/card";
import { TagPill } from "./TagPill";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfographicCardProps {
  id: string;
  title: string;
  coverImage: string;
  tags: string[];
  researcher: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  date: string;
  onClick: () => void;
}

export function InfographicCard({
  id,
  title,
  coverImage,
  tags,
  researcher,
  date,
  onClick,
}: InfographicCardProps) {
  return (
    <Card
      className="group overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all"
      onClick={onClick}
      data-testid={`card-infographic-${id}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2 flex-wrap justify-end">
          {tags.slice(0, 2).map((tag) => (
            <div
              key={tag}
              className="backdrop-blur-md bg-white/20 px-2 py-1 rounded-full"
            >
              <span className="text-xs font-medium text-white uppercase tracking-wide">
                {tag}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-serif font-semibold text-white leading-tight mb-2">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={researcher.avatar} />
              <AvatarFallback>{researcher.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{researcher.name}</span>
              {researcher.verified && (
                <CheckCircle2 className="h-4 w-4 text-success" />
              )}
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Bookmark clicked");
              }}
              data-testid={`button-bookmark-${id}`}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Share clicked");
              }}
              data-testid={`button-share-${id}`}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
