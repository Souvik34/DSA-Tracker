import { generateAI } from "../ai/aiProvider.js";

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

IMPORTANT:
starterCode only contains function/class skeleton.
Never generate Main class.
starterCode must not contain execution code.

executionMetadata must contain only:
- inputFormat
- outputFormat
- parameterMapping

Do NOT generate javaInvoker.
Do NOT generate cppInvoker.
Do NOT generate pythonInvoker.

The backend will generate Judge0 wrapper code automatically.
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
},

    "functionSignature": {
  "name": "",
  "returnType": "",
  "parameters": [
    {
      "name": "",
      "type": ""
    }
  ]
},
"executionMetadata": {
  "inputFormat": "",
  "outputFormat": "",
  "parameterMapping": []
},




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

3.starterCode should:
- contain only the class/function skeleton
- NOT contain main function
- NOT contain input reading logic
- NOT contain test execution logic
- include the exact function signature

functionSignature rules:
- Generate the exact function name
- Generate return type
- Generate parameter names and types
- This will be used by an automated execution wrapper

executionMetadata rules:
- inputFormat describes stdin format
- outputFormat describes expected stdout format
- parameterMapping contains function parameters in order
- invoker fields contain executable wrapper code only
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


IMPORTANT TESTCASE FORMAT:

All visibleTestCases and hiddenTestCases input values MUST be raw stdin only.

NEVER include parameter names, "=" signs, or descriptive text.

For example, if parameters are:
nums (int[])
k (int)

WRONG:
nums = [1,5,4,2,9,9,9]
k = 3

CORRECT:
[1,5,4,2,9,9,9]
3

The testcase input MUST be directly consumable by the generated language parser.
The order MUST exactly match functionSignature.parameters.

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

IMPORTANT FOR EXECUTION:

The candidate will only write the function implementation.

The platform will automatically generate:
- main method (Java/C++)
- input parsing
- function invocation
- output printing

Therefore never include:
- public static void main()
- Scanner
- BufferedReader
- input parsing
- print statements
Return ONLY valid JSON.
`;
// const result = await ai.models.generateContent({
//   model: "gemini-3.5-flash",
//   contents: prompt,
//   // contents: "Generate an easy array interview problem in JSON."   
// });

const result = await generateAI(prompt);

const problem = JSON.parse(result);

// const invokers = [
//     problem.executionMetadata?.javaInvoker,
//     problem.executionMetadata?.cppInvoker,
//     problem.executionMetadata?.pythonInvoker
// ];

// const forbidden = [
//     "...",
//     "TODO",
//     "YOUR_ARGUMENTS",
//     "PLACEHOLDER",
//     "System.out.println(sol.",
//     "sol."
// ];

// for (const invoker of invokers) {

//     if (!invoker) {
//         throw new Error("Missing execution invoker");
//     }

//     for (const word of forbidden) {
//         if (invoker.includes(word)) {
//             throw new Error(
//                 `Invalid AI generated invoker: ${word}`
//             );
//         }
//     }
// }
return problem;

// return result.text;
  };