import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateStructuredQuestion =
  async ({
    difficulty,
    language,
  }) => {
const prompt = `
You are acting as a Senior Google L5 interviewer.

Your job is NOT only to generate a coding problem.

Generate the COMPLETE interview package.

The interviewer will conduct the interview using this package.

Generate:

1. Problem statement.

2. Constraints.

3. Examples.

4. Visible testcases.

5. Hidden testcases.

6. Starter code.

7. Expected concepts.

8. Expected optimal complexity.

9. Interview guide.

The interview guide should help the AI know:

- how to start
- when to challenge the candidate
- what concepts should appear
- what optimization should eventually be discussed

Do NOT include any solution.
Do NOT reveal hints.
Return STRICT JSON only.

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
"starterCode": {
    "java": "",
    "cpp": "",
    "python": "",
    "javascript": ""
}

  "visibleTestCases": [
    {
      "input": "",
      "expectedOutput": ""
    }
  ],

  "hiddenTestCases": [
    {
      "input": "",
      "expectedOutput": ""
    }
  ],

  "expectedConcepts": [
    ""
  ],

  "expectedComplexity": {
    "time": "",
    "space": ""
  },

  "interviewGuide": {

    "openingQuestion": "",

    "approachChecks": [
      ""
    ],

    "codingTriggers": [
      {
        "concept": "HashMap",
        "question": "Why did you choose a HashMap here instead of sorting?"
      },
      {
        "concept": "Sliding Window",
        "question": "How do you know when the window should shrink?"
      },
      {
        "concept": "DFS",
        "question": "Why is DFS a better fit than BFS here?"
      }
    ],

    "optimizationQuestion": "",
    "expectedMilestones":[
        "Candidate identifies the correct data structure",
        "Candidate initializes required variables",
        "Candidate implements the main algorithm",
        "Candidate handles edge cases",
        "Candidate returns the final answer"
    ]
  }
}
REQUIREMENTS:

1. Generate:

- 2 examples
- 3 visibleTestCases
- 5 hiddenTestCases

expectedConcepts:
- list the important algorithms or data structures the interviewer expects

expectedComplexity:
- include the optimal time and space complexity

interviewGuide:
- openingQuestion should encourage the candidate to explain the problem in their own words
- approachChecks should contain 2–3 probing questions
- codingTriggers should list important concepts that, if detected in the candidate's code, should trigger interviewer questions
- optimizationQuestion should be asked only after a correct solution

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

IMPORTANT:

Return ONLY this JSON structure.

Do NOT include:
- optimal_solution
- solution
- code explanation
- answer
- problem_id
- category
- difficulty
- description

If any of these are returned, the response is INVALID.

Return ONLY the JSON described above.
The field names MUST exactly match:

title
problem
constraints
examples
starterCode
visibleTestCases
hiddenTestCases
expectedConcepts
expectedComplexity
interviewGuide

interviewGuide MUST contain:

openingQuestion
approachChecks
codingTriggers
optimizationQuestion
expectedMilestones

codingTriggers MUST be an array of objects like:

{
  "concept": "",
  "question": ""
}

Return ONLY valid JSON.
`;
const result = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: prompt,
  // contents: "Generate an easy array interview problem in JSON."   
});

return result.text;
  };