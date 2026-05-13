const CLAUDE_MODEL = "claude-sonnet-4-20250514";

export async function askGstAssistant(question: string) {
  if (!process.env.EXPO_PUBLIC_CLAUDE_API_KEY) {
    return "బ్రాండెడ్ లేదా ప్యాకేజ్డ్ రైస్ కి 5% GST వర్తిస్తుంది. లూస్ / అన్‌బ్రాండెడ్ రైస్ కి GST లేదు. HSN: 1006.";
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.EXPO_PUBLIC_CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      system: "You are a GST expert for rice millers in Telangana, India. HSN Code 1006. Answer in Telugu first, English if asked.",
      messages: [{ role: "user", content: question }]
    })
  });

  const data = await response.json();
  return data?.content?.[0]?.text ?? "క్షమించండి, ఇప్పుడే జవాబు ఇవ్వలేకపోతున్నాను.";
}
