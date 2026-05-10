import { executeCode } from "./codeExecution.js";

/**
 * Runs user code against multiple testcases
 * and returns pass/fail + detailed results
 */

export const evaluateCode = async ({
  language,
  code,
  testCases = []
}) => {

  const results = [];

  let passed = 0;

  for (let tc of testCases) {

    const { input, expectedOutput } = tc;

    const execution = await executeCode({
      language,
      code,
      input
    });

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

    const normalize = (str = "") =>
      str
        .trim()
        .replace(/\r/g, "")
        .replace(/\s+/g, " ");

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