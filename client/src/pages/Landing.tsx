import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Shield, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Research Made Accessible
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform complex academic research into bite-sized, actionable insights.
            Discover, understand, and implement research findings in your daily life.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-login"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Researchers</h3>
              <p className="text-muted-foreground">
                Upload your research and let AI transform it into engaging,
                accessible infographics with actionable insights.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Content</h3>
              <p className="text-muted-foreground">
                Every infographic is reviewed by our team to ensure accuracy
                and credibility before publication.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Feed</h3>
              <p className="text-muted-foreground">
                Discover research tailored to your interests with
                Instagram-style browsing and smart recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to explore research differently?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of researchers and curious minds
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-cta-login"
          >
            Sign In to Continue
          </Button>
        </div>
      </section>
    </div>
  );
}
