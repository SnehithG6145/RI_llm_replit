import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Microscope, Users, Shield } from "lucide-react";
import heroImage from "@assets/stock_images/modern_research_labo_38189ff4.jpg";

export default function Home() {
  return (
    <div>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Research Laboratory"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Transform Research Into Action
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover bite-sized research insights transformed into visual infographics.
            Researchers share findings, laypeople gain actionable knowledge.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-primary border border-primary-border text-primary-foreground backdrop-blur-sm"
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bridging the gap between academic research and everyday life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center hover-elevate transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Microscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Researchers Upload</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Scientists and researchers upload their papers. AI extracts key findings
                  and generates structured infographics with actionable insights.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Admin Verification</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Administrators verify credibility, categorize with custom tags, and
                  ensure quality before content reaches the community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Users Discover</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Personalized feeds show relevant research. Swipe through infographics
                  to learn statistics, methods, and practical solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of curious minds transforming research into real-world action
          </p>
          <Button size="lg" data-testid="button-join-now">
            Join ResearchBite
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
