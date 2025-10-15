import { useState } from "react";
import { ProfileTagManager } from "@/components/ProfileTagManager";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import avatar from "@assets/stock_images/professional_researc_f4eae1c5.jpg";

export default function Profile() {
  const [selectedTags, setSelectedTags] = useState(["Health", "Psychology", "Neuroscience"]);

  const recommendedTags = ["Technology", "Environment", "Biology", "Climate"];
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
    "Sleep",
    "Mental Health",
    "AI",
    "Physics",
    "Chemistry",
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatar} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-serif font-bold">Sarah Chen</h2>
                <p className="text-muted-foreground">Customer</p>
              </div>
            </div>
            <Button variant="outline" data-testid="button-settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-2xl font-bold">47</p>
              <p className="text-sm text-muted-foreground">Infographics Read</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Bookmarked</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Topics Following</p>
            </div>
            <div className="text-center p-4 rounded-md bg-muted">
              <p className="text-2xl font-bold">8d</p>
              <p className="text-sm text-muted-foreground">Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileTagManager
        selectedTags={selectedTags}
        recommendedTags={recommendedTags}
        allTags={allTags}
        onTagToggle={handleTagToggle}
      />
    </div>
  );
}
