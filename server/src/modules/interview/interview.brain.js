export const interviewBrain = ({
  messages,
}) => {

  const lastUser = [...messages]
    .reverse()
    .find(m => m.sender === "user");

  if (!lastUser) {
    return "ASK_FIRST_CLARIFICATION";
  }

  const msg = lastUser.message.toLowerCase();

  const recentMessages = messages.slice(-4);

  const userTalkCount =
    recentMessages.filter(m => m.sender === "user").length;

  const aiTalkCount =
    recentMessages.filter(m => m.sender === "ai").length;

  if (
    msg.includes("stuck") ||
    msg.includes("don't know") ||
    msg.includes("not sure") ||
    msg.includes("confused")
  ) {
    return "GIVE_HINT";
  }

 
  if (userTalkCount === 1 && aiTalkCount >= 2) {
    return "PUSH_USER_THINKING";
  }


  if (
    msg.includes("approach") ||
    msg.includes("idea") ||
    msg.includes("thinking")
  ) {
    return "CHALLENGE_APPROACH";
  }

 
  if (
    msg.includes("function") ||
    msg.includes("for") ||
    msg.includes("{") ||
    msg.includes("return")
  ) {
    return "ASK_EDGE_CASES";
  }


  return "FOLLOW_UP_REASONING";
};