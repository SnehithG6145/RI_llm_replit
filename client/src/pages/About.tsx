import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileCode, Database, Cpu, GitBranch, Layers, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-4">About ResearchBite</h1>
        <p className="text-lg text-muted-foreground">
          Technical documentation for the research infographic platform
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Tech Stack
            </CardTitle>
            <CardDescription>Modern full-stack architecture for research content delivery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-sm">Frontend</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li><strong>React + TypeScript</strong> - Type-safe UI components</li>
                  <li><strong>Wouter</strong> - Lightweight client-side routing</li>
                  <li><strong>TanStack Query</strong> - Server state management & caching</li>
                  <li><strong>Tailwind CSS + Shadcn/ui</strong> - Design system & styling</li>
                  <li><strong>Vite</strong> - Fast build tooling & hot reload</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm">Backend</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li><strong>Node.js + Express</strong> - API server & routing</li>
                  <li><strong>PostgreSQL (Neon)</strong> - Relational database</li>
                  <li><strong>Drizzle ORM</strong> - Type-safe database queries</li>
                  <li><strong>OpenAI API</strong> - AI-powered infographic generation</li>
                  <li><strong>Zod</strong> - Runtime validation & type safety</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              File Structure
            </CardTitle>
            <CardDescription>Key files and their responsibilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Core Application Files</h4>
                <div className="grid gap-2 text-sm">
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/App.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">Main app layout with routing and navigation</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">shared/schema.ts</code>
                    <p className="text-xs text-muted-foreground mt-1">Database schema & TypeScript types (users, infographics, tags)</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">server/routes.ts</code>
                    <p className="text-xs text-muted-foreground mt-1">API endpoints for CRUD operations</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">server/storage.ts</code>
                    <p className="text-xs text-muted-foreground mt-1">Database interface & operations</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Page Components</h4>
                <div className="grid gap-2 text-sm">
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/pages/Feed.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">Instagram-style feed with infographic cards</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/pages/Researcher.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">Research paper upload & AI conversion interface</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/pages/Admin.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">Verification queue & tag management dashboard</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/pages/Profile.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">User preferences & personalized tag selection</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Components</h4>
                <div className="grid gap-2 text-sm">
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/components/InfographicViewer.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">Swipeable viewer with 3 section types (overview, methods, solutions)</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/components/InfographicCard.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">Feed card with cover image & metadata</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/components/ResearcherUpload.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">File upload form with tag selection</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted">
                    <code className="font-mono text-xs">client/src/components/VerificationQueue.tsx</code>
                    <p className="text-xs text-muted-foreground mt-1">Admin approval/rejection interface</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Content Pipeline
            </CardTitle>
            <CardDescription>How research flows from upload to user consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Researcher Upload</h4>
                  <p className="text-sm text-muted-foreground">
                    Researcher uploads PDF/text research paper → Selects relevant tags → Submits for processing
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                    POST /api/infographics (status: "pending")
                  </code>
                </div>
              </div>

              <div className="ml-6 border-l-2 border-dashed border-muted-foreground/20 pl-10 py-2">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Admin Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Admin reviews submission in verification queue → Checks credibility & sources → Approves or rejects
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                    PATCH /api/infographics/:id (status: "approved" | "rejected")
                  </code>
                </div>
              </div>

              <div className="ml-6 border-l-2 border-dashed border-muted-foreground/20 pl-10 py-2">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">User Discovery</h4>
                  <p className="text-sm text-muted-foreground">
                    Approved infographics appear in personalized feeds → Users click to expand → Swipe through sections
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                    GET /api/infographics?status=approved&tags=Health,Psychology
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              AI Infographic Generation Pipeline
            </CardTitle>
            <CardDescription>Step-by-step process for transforming research papers into infographics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-primary">01</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Document Parsing</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Extract text content from uploaded PDF/document using text extraction libraries
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    Input: research_paper.pdf → Output: raw_text_content
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-primary">02</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">AI Analysis (OpenAI)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Send research text to OpenAI GPT-4 with structured prompt requesting extraction of:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                    <li>• Title & key statistics (3-5 impactful numbers)</li>
                    <li>• Research methodology & technical details</li>
                    <li>• Practical solutions (3-5 actionable steps for laypeople)</li>
                    <li>• Sources & citations</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-primary">03</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Section A: Overview Generation</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Create visually engaging overview section with:
                  </p>
                  <div className="text-xs bg-muted p-3 rounded space-y-1">
                    <p>• Large serif title (attention-grabbing headline)</p>
                    <p>• 3-4 key statistics in highlighted cards</p>
                    <p>• Brief summary paragraph for context</p>
                    <p>• Source attribution & research conclusion</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-primary">04</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Section B: Methods & Technical Details</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Format methodology for researchers and technical readers:
                  </p>
                  <div className="text-xs bg-muted p-3 rounded space-y-1">
                    <p>• Study design & participant information</p>
                    <p>• Key metrics measured & data collection methods</p>
                    <p>• Technical terminology with definitions</p>
                    <p>• Statistical approaches & confidence intervals</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-primary">05</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Section C: Solution Pages (3-5 Pages)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Transform findings into actionable steps for laypeople - inspired by Venngage research infographics:
                  </p>
                  <div className="text-xs bg-muted p-3 rounded space-y-2">
                    <p className="font-semibold">Each solution page contains:</p>
                    <p>• Numbered badge (1, 2, 3, etc.) for visual hierarchy</p>
                    <p>• Clear action-oriented title (e.g., "Stand Up Every 30 Minutes")</p>
                    <p>• Brief explanation of why this solution works</p>
                    <p>• Step-by-step implementation guide (numbered list)</p>
                    <p>• Practical, concrete actions anyone can take today</p>
                  </div>
                  <div className="mt-3 p-3 bg-primary/5 rounded border border-primary/20">
                    <p className="text-xs font-semibold mb-1">Example: "As We Age, Feeling Connected" style</p>
                    <p className="text-xs text-muted-foreground">
                      Solution 1: "Join a Group" → Join a group (step 1), Get a pet (step 2), 
                      Teach someone something (step 3), etc. Each with visual icon and brief description.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-primary">06</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Data Storage & Cover Image</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Store structured infographic data in PostgreSQL:
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    sections: JSON[] (overview, methods, solution1, solution2, solution3...)
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Generate or select cover image for feed display
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-primary">07</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Frontend Rendering</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    InfographicViewer component displays sections as swipeable cards:
                  </p>
                  <div className="text-xs bg-muted p-3 rounded">
                    <p>• Instagram-style viewer with left/right navigation</p>
                    <p>• Dots indicator shows progress through sections</p>
                    <p>• Each section type has custom layout & styling</p>
                    <p>• Mobile-optimized with swipe gestures</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Infographic Section Types
            </CardTitle>
            <CardDescription>Three core section types based on Venngage research infographic best practices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-muted">
                <h4 className="font-semibold mb-2 text-sm">Type A: Overview Section</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  High-impact introduction with title, statistics, and context
                </p>
                <div className="text-xs space-y-1">
                  <p>✓ Large title with compelling headline</p>
                  <p>✓ 3-4 key statistics in visual cards</p>
                  <p>✓ Summary paragraph for layperson understanding</p>
                  <p>✓ Source attribution footer</p>
                </div>
              </div>

              <div className="p-4 rounded-md bg-muted">
                <h4 className="font-semibold mb-2 text-sm">Type B: Methods Section</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Technical details for researchers and interested readers
                </p>
                <div className="text-xs space-y-1">
                  <p>✓ Study design & methodology grid</p>
                  <p>✓ Participant demographics</p>
                  <p>✓ Key metrics & measurements</p>
                  <p>✓ Technical terminology glossary</p>
                </div>
              </div>

              <div className="p-4 rounded-md bg-muted">
                <h4 className="font-semibold mb-2 text-sm">Type C: Solution Pages (Multiple)</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  "Here's what you can do" actionable steps - 3-5 separate solution pages
                </p>
                <div className="text-xs space-y-1">
                  <p>✓ Each solution gets its own page/card</p>
                  <p>✓ Numbered visual badge for each solution</p>
                  <p>✓ Action-oriented title (verb-based)</p>
                  <p>✓ Step-by-step implementation guide</p>
                  <p>✓ Practical, immediately applicable actions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
