export const buildDashboardPrompt = (data) => {
  return `
You are an expert DSA mentor AI.

Analyze this user's DSA performance data.

User Analytics:
${JSON.stringify(data, null, 2)}

Generate:
1. Weakness analysis
2. Strong areas
3. Personalized daily revision plan
4. Recommended focus areas
5. Short motivational feedback

Rules:
- Keep response concise
- Use bullet points
- Be practical
- Do not hallucinate fake stats
- Focus on DSA preparation
`;
};