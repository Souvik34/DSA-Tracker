export const detectInterviewPhase = ({
  messages,
  evaluation,
}) => {

  const lastUserMessage =
    [...messages]
      .reverse()
      .find(
        (m) => m.sender === "user"
      );

  if (!lastUserMessage) {
    return "UNDERSTANDING_PHASE";
  }

  const msg =
    lastUserMessage.message.toLowerCase();

  // -------------------------
  // detect code presence
  // -------------------------
  const looksLikeCode =
    msg.includes("function") ||
    msg.includes("class") ||
    msg.includes("return") ||
    msg.includes("for") ||
    msg.includes("while") ||
    msg.includes("{") ||
    msg.includes("};") ||
    msg.includes("public static") ||
    msg.includes("def ");

  // -------------------------
  // UNDERSTANDING PHASE
  // user discussing approach
  // -------------------------
  if (!looksLikeCode) {

    if (
      msg.includes("array") ||
      msg.includes("hashmap") ||
      msg.includes("two pointer") ||
      msg.includes("binary search") ||
      msg.includes("stack") ||
      msg.includes("queue") ||
      msg.includes("graph") ||
      msg.includes("tree") ||
      msg.includes("dp") ||
      msg.includes("dynamic programming")
    ) {

      return "APPROACH_PHASE";
    }

    return "UNDERSTANDING_PHASE";
  }

  // -------------------------
  // DEBUGGING PHASE
  // -------------------------
  if (
    evaluation &&
    evaluation.failed > 0
  ) {

    return "DEBUGGING_PHASE";
  }

  // -------------------------
  // OPTIMIZATION PHASE
  // -------------------------
  if (
    evaluation &&
    evaluation.passed ===
      evaluation.total
  ) {

    return "OPTIMIZATION_PHASE";
  }

  // -------------------------
  // CODING PHASE
  // -------------------------
  return "CODING_PHASE";
};