import { Router, type IRouter } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalyzeMealBody, AnalyzeMealResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

router.post("/meal-analysis", async (req, res): Promise<void> => {
  const parsed = AnalyzeMealBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { mealDescription, healthGoal } = parsed.data;

  const goalLabels: Record<string, string> = {
    weight_loss: "Weight Loss",
    weight_gain: "Weight Gain",
    high_protein: "High Protein",
    diabetes_friendly: "Diabetes Friendly",
    heart_healthy: "Heart Healthy",
  };
  const goalLabel = goalLabels[healthGoal] ?? healthGoal;

  const prompt = `You are a professional nutritionist assistant. Analyze the following meal description for someone with the health goal of "${goalLabel}".

Meal description: "${mealDescription}"

Respond ONLY with a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "healthScore": <number 0-10, one decimal place>,
  "strengths": [<array of 2-4 short strings describing nutritional strengths>],
  "weaknesses": [<array of 2-4 short strings describing nutritional weaknesses>],
  "missingNutrients": [<array of 2-4 missing or insufficient nutrients>],
  "estimatedCalories": "<string like '1200-1400 kcal'>",
  "protein": "<brief protein overview, e.g. 'Moderate protein (~45g) from eggs and lentils'>",
  "carbohydrates": "<brief carbs overview>",
  "fat": "<brief fat overview>",
  "alternatives": [<array of 3-5 affordable healthier alternatives suitable for Pakistani diets>],
  "tip": "<one personalized, encouraging, evidence-based nutrition tip based on the health goal>"
}

Important rules:
- Never diagnose diseases or prescribe medication
- Keep responses encouraging and easy to understand
- Alternatives must be affordable and culturally appropriate for Pakistani diets
- Be specific and practical`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  let analysisData: unknown;
  try {
    // Strip markdown code fences if present
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    analysisData = JSON.parse(cleaned);
  } catch {
    req.log.error({ text }, "Failed to parse Gemini response as JSON");
    res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    return;
  }

  const validated = AnalyzeMealResponse.safeParse(analysisData);
  if (!validated.success) {
    req.log.error({ errors: validated.error.message }, "Gemini response did not match expected schema");
    res.status(500).json({ error: "AI response format was unexpected. Please try again." });
    return;
  }

  res.json(validated.data);
});

export default router;
