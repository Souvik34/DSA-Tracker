import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateStructuredQuestion =
  async ({
    difficulty,
    language,
  }) => {
const prompt = `
You are a senior FAANG DSA interviewer.

Generate ONE realistic DSA interview coding problem.

Difficulty:
${difficulty}

Programming Language:
${language}

IMPORTANT RULES:
- Return STRICT JSON ONLY
- Do NOT use markdown
- Do NOT add explanation outside JSON
- Problem should resemble LeetCode/FAANG interview style
- Keep examples simple and valid
- Testcases must match problem statement
- starterCode must be valid ${language} code
- Use meaningful variable names
- Input/output format must stay consistent

JSON FORMAT:

{
  "title": "",
  "problem": "",
  "constraints": [
    ""
  ],
  "examples": [
    {
      "input": "",
      "output": "",
      "explanation": ""
    }
  ],
  "starterCode": "",
  "testCases": [
    {
      "input": "",
      "expectedOutput": ""
    }
  ]
}

REQUIREMENTS:

1. Generate:
- 2 examples
- 5 testCases

2. Constraints should be realistic.

3. starterCode should:
- include function signature
- include empty implementation
- match ${language}

4. Avoid impossible or ambiguous problems.

5. Problem categories may include:
- arrays
- strings
- hashmap
- sliding window
- stack
- queue
- binary search
- recursion
- trees
- graphs
- dynamic programming

6. Keep problem interview-oriented and solvable within 30-40 minutes.
`;
    const result =
      await model.generateContent(prompt);

    return result.response.text();
  };