import { executeCode } from "./codeExecution.js";

/**
 * Runs user code against multiple testcases
 * and returns pass/fail + detailed results
 */

export const evaluateCode = async ({
  language,
  code,
  testCases = [],
  problem
}) => {

  const results = [];

  let passed = 0;

  for (let tc of testCases) {

    const { input, expectedOutput } = tc;

 const execution = await executeCode({
  language,
  code,
  input,
  problem
    });
console.log("PROBLEM METADATA");
console.log(problem);
    // runtime / compile error
    if (execution.error) {

      results.push({
        input,
        expectedOutput,
        userOutput: null,
        isCorrect: false,
        error: execution.error
      });

      continue;
    }

   const normalize = (str) =>
  String(str ?? "")
    .trim()
    .replace(/\r/g, "")
    .replace(/\s+/g, " ");
console.log("Execution Result:");
console.dir(execution, { depth: null });
    const userOutput =
      normalize(execution.output);

    const expected =
      normalize(expectedOutput);

    const isCorrect =
      userOutput === expected;

    if (isCorrect) passed++;

    results.push({
      input,
      expectedOutput,
      userOutput,
      isCorrect,
      error: null
    });
  }

  return {
    total: testCases.length,
    passed,
    failed: testCases.length - passed,

    successRate:
      testCases.length
        ? (passed / testCases.length) * 100
        : 0,

    results
  };
};