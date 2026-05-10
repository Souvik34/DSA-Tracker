export const getInterruptQuestion = ({
  phase,
  evaluation,
  message,
}) => {

  const msg =
    message.toLowerCase();

  // -------------------------
  // decide if AI should interrupt
  // -------------------------

  let shouldInterrupt = false;

  // interrupt on failed testcases
  if (
    evaluation &&
    evaluation.failed > 0
  ) {
    shouldInterrupt = true;
  }

  // interrupt on important reasoning
  if (
    msg.includes("complexity") ||
    msg.includes("hashmap") ||
    msg.includes("binary search") ||
    msg.includes("dp") ||
    msg.includes("graph") ||
    msg.includes("tree")
  ) {
    shouldInterrupt = true;
  }

  // interrupt on large code blocks
  if (message.length > 300) {
    shouldInterrupt = true;
  }

  // otherwise remain silent
  if (!shouldInterrupt) {
    return null;
  }

  // -------------------------
  // interviewer questions
  // -------------------------

  const phaseQuestions = {

    UNDERSTANDING_PHASE: [

      "Walk me through your thought process.",

      "What is your initial intuition here?",

      "What approach are you considering first?"
    ],

    APPROACH_PHASE: [

      "Why do you think this approach works?",

      "What would be the time complexity?",

      "Can you think of tradeoffs in this solution?"
    ],

    CODING_PHASE: [

      "Explain this part of your implementation.",

      "Why did you structure it this way?",

      "What edge case could affect this logic?"
    ],

    DEBUGGING_PHASE: [

      "Which testcase do you think is failing?",

      "Try tracing the code on a smaller input.",

      "Could there be a boundary issue here?"
    ],

    OPTIMIZATION_PHASE: [

      "Can this be optimized further?",

      "What is the bottleneck currently?",

      "How would this scale for large inputs?"
    ]
  };

  const questions =
    phaseQuestions[phase] || [];

  if (!questions.length) {
    return null;
  }

  const randomIndex =
    Math.floor(
      Math.random() * questions.length
    );

  return questions[randomIndex];
};