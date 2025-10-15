// OpenAI integration - based on blueprint:javascript_openai
import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface InfographicSection {
  sectionA: {
    title: string;
    summary: string;
    statistics: Array<{ value: string; label: string }>;
    sources: string[];
    conclusions: string[];
  };
  sectionB: {
    methodology: string;
    participants: string;
    technicalTerms: string[];
    studyDesign: string;
  };
  sectionC: Array<{
    badge: number;
    title: string;
    steps: string[];
  }>;
}

export async function generateInfographicFromText(
  researchText: string,
  researcherNotes?: string
): Promise<InfographicSection> {
  try {
    const systemPrompt = `You are an expert research communicator who transforms academic papers into engaging, accessible infographics. 
Your task is to analyze research papers and create structured content following the Venngage research infographic format.

Generate content for THREE distinct sections:

**Section A - Overview (for general audience):**
- A thought-provoking, engaging title (not just the paper title)
- A clear 2-3 sentence summary explaining what the research is about
- 3-5 key statistics with specific numbers and labels
- List of academic sources/citations
- 2-3 main conclusions in simple language

**Section B - Methods (for researchers):**
- Study methodology explained clearly
- Number and description of participants
- List of 3-5 key technical terms used in the research
- Overall study design approach

**Section C - Solutions (3-5 separate action pages for laypeople):**
Create 3-5 distinct "HERE'S WHAT YOU CAN DO" solution pages, each with:
- A numbered badge (1, 2, 3, etc.)
- An action-oriented title (e.g., "Take Movement Breaks Every Hour")
- 3-5 specific, practical steps anyone can implement

Each solution page should address different aspects of applying the research to daily life.
Think: "Sitting is the new smoking" → Multiple solution pages like "Desk Exercises", "Walking Meetings", "Posture Tips", etc.

Respond ONLY with valid JSON matching this structure - no markdown, no explanations.`;

    const userPrompt = `Analyze this research paper and generate infographic content:

${researchText}

${researcherNotes ? `Additional context from researcher: ${researcherNotes}` : ''}

Generate structured infographic content in JSON format with sectionA, sectionB, and sectionC as described.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 8192,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content generated from OpenAI");
    }

    const result = JSON.parse(content);
    
    // Validate the structure
    if (!result.sectionA || !result.sectionB || !result.sectionC) {
      throw new Error("Invalid infographic structure generated");
    }

    // Ensure we have at least 3 solution pages
    if (!Array.isArray(result.sectionC) || result.sectionC.length < 3) {
      throw new Error("Need at least 3 solution pages in section C");
    }

    return result as InfographicSection;
  } catch (error: any) {
    throw new Error("Failed to generate infographic: " + error.message);
  }
}

export async function extractTextFromPDF(pdfBase64: string): Promise<string> {
  // For now, we'll handle text extraction on the client side or expect text input
  // In a production app, you'd use a PDF parsing library like pdf-parse
  throw new Error("PDF extraction not implemented - please paste text directly");
}
