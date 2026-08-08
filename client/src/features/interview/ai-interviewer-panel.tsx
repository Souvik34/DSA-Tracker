/* eslint-disable prettier/prettier */

import { useEffect, useRef, useState } from "react";
import interviewService from "@/services/interviewService";
import { useNavigate } from "@tanstack/react-router";
import { useInterviewSocket } from "../../socket/interviewSocketProvider";
import { socket } from "@/socket/socket";
import { Bot, UserRound } from "lucide-react";
import type { SupportedLanguageId } from "@/features/editor/code-editor";

interface Message {
  role: "INTERVIEWER" | "CANDIDATE";
  content: string;
}

interface Problem {
  title: string;
  description: string;

  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];

  constraints: string[];

  starterCode?: string;
}

interface Props {
  sessionId: string;
  language: SupportedLanguageId;
  code: string;
}

type InterviewPhase =
  | "INTRODUCTION"
  | "UNDERSTANDING"
  | "CODING"
  | "OPTIMIZATION"
  | "FEEDBACK"
  | "FINISHED";

export default function AIInterviewerPanel({
  sessionId,
  language,
  code,
}: Props) {
  const [phase, setPhase] =
    useState<InterviewPhase>("INTRODUCTION");

  const [time, setTime] = useState(45 * 60);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [typingMessage, setTypingMessage] =
    useState("");

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const interviewSocket = useInterviewSocket();
  const navigate = useNavigate();

  /*
   * Join interview room
   */
  useEffect(() => {
    if (!interviewSocket || !sessionId) return;

    interviewSocket.joinInterview(sessionId);

    return () => {
      interviewSocket.leaveInterview();
    };
  }, [sessionId]);

  /*
   * Load interview state
   */
  useEffect(() => {
    if (!sessionId) return;

    const loadInterview = async () => {
      try {
        const res =
          await interviewService.getInterviewState(
            sessionId
          );

        const data = res.data;

        if (data.session?.phase) {
          setPhase(data.session.phase);
        }

        if (data.firstQuestion) {
          // Keeping this available for future interview logic.
          // We don't render it separately in the chat.
          console.log(
            "FIRST QUESTION:",
            data.firstQuestion
          );
        }
      } catch (err) {
        console.error(
          "Failed to load interview:",
          err
        );
      }
    };

    loadInterview();
  }, [sessionId]);

  /*
   * Interview timer
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /*
   * Auto scroll to newest message
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typingMessage]);

  /*
   * Handle interview-ended event
   */
  useEffect(() => {
    const handleInterviewEnded = () => {
      setTimeout(() => {
        navigate({
          to: "/interview/$sessionId/report",
          params: {
            sessionId,
          },
        });
      }, 2000);
    };

    socket.on(
      "interview-ended",
      handleInterviewEnded
    );

    return () => {
      socket.off(
        "interview-ended",
        handleInterviewEnded
      );
    };
  }, [sessionId, navigate]);

  /*
   * Send code changes to backend
   */
  useEffect(() => {
    if (!sessionId) return;
    if (!code.trim()) return;

    const timer = setTimeout(() => {
      socket.emit("code-update", {
        sessionId,
        code,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [code, sessionId]);

  /*
   * Type AI message
   *
   * IMPORTANT:
   * The temporary typing message is rendered INSIDE
   * the conversation instead of above the conversation.
   */
  const typeAIMessage = async (text: string) => {
    if (!text) return;

    setTypingMessage("");

    let output = "";

    for (const char of text) {
      output += char;

      setTypingMessage(output);

      await new Promise((resolve) =>
        setTimeout(resolve, 18)
      );
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "INTERVIEWER",
        content: text,
      },
    ]);

    setTypingMessage("");
  };

  /*
   * Receive AI response
   */
  useEffect(() => {
    const handleAIResponse = async (data: any) => {
      if (data.phase) {
        setPhase(data.phase);
      }

      await typeAIMessage(
        data.aiReply ??
          data.message ??
          ""
      );

      if (data.phase === "FINISHED") {
        try {
          await interviewService.endInterview(
            sessionId
          );

          await navigate({
            to: "/interview/$sessionId/report",
            params: {
              sessionId,
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
    };

    socket.on(
      "interviewer-message",
      handleAIResponse
    );

    return () => {
      socket.off(
        "interviewer-message",
        handleAIResponse
      );
    };
  }, [sessionId, navigate]);

  /*
   * Send candidate message
   */
  const sendMessage = async () => {
    const userMessage = input.trim();

    if (!userMessage || loading) {
      return;
    }

    /*
     * Immediately put candidate message
     * into the conversation.
     */
    setMessages((prev) => [
      ...prev,
      {
        role: "CANDIDATE",
        content: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      await interviewService.submitAIResponse(
        sessionId,
        {
          message: userMessage,
          code,
        }
      );
    } catch (err) {
      console.error(
        "Failed to send interview response:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Enter = send
   * Shift + Enter = new line
   */
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const phaseLabel = phase
    .replace("_", " ")
    .toLowerCase()
    .replace(/^\w/, (c) =>
      c.toUpperCase()
    );

  return (
    <aside className="flex h-full min-h-0 min-w-0 flex-col border-l border-border/60 bg-card/20">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            AI Interviewer
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-violet-400">
              {phaseLabel}
            </span>
          </div>
        </div>

        <div className="ml-2 shrink-0 rounded-md border border-border/60 bg-background/70 px-2.5 py-1.5 text-xs font-medium tabular-nums">
          ⏱ {formatTime(time)}
        </div>
      </div>

      {/* ================================================= */}
      {/* CHAT */}
      {/* ================================================= */}

      <div
        className="interview-chat-scroll min-h-0 flex-1 overflow-y-auto px-3 py-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor:
            "rgba(139,92,246,0.45) transparent",
        }}
      >
        <div className="space-y-4">
        {messages.map((msg, index) => {
  const isAI = msg.role === "INTERVIEWER";

  return (
    <div
      key={`${index}-${msg.role}`}
      className={`flex items-start gap-2.5 ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      {/* AI avatar */}
      {isAI && (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
          <Bot className="h-3.5 w-3.5 text-violet-400" />
        </div>
      )}

      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isAI
            ? "rounded-tl-md border border-border/60 bg-card text-foreground"
            : "rounded-tr-md bg-violet-600 text-white"
        }`}
      >
        {msg.content}
      </div>

      {/* Candidate avatar */}
      {!isAI && (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-600/15">
          <UserRound className="h-3.5 w-3.5 text-violet-300" />
        </div>
      )}
    </div>
  );
})}

          {/* AI currently typing */}
       {typingMessage && (
  <div className="flex items-start gap-2.5 justify-start">
    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
      <Bot className="h-3.5 w-3.5 text-violet-400" />
    </div>

    <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-border/60 bg-card px-3.5 py-2.5 text-sm leading-relaxed">
      {typingMessage}
      <span className="ml-0.5 inline-block animate-pulse">
        ▋
      </span>
    </div>
  </div>
)}

          {/* Loading indicator */}
          {loading && !typingMessage && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-md border border-border/60 bg-card px-3.5 py-2.5">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{
                      animationDelay: "120ms",
                    }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{
                      animationDelay: "240ms",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ================================================= */}
      {/* INPUT */}
      {/* ================================================= */}

      <div className="shrink-0 border-t border-border/60 bg-background/60 p-3">
        <div className="flex items-end gap-2 rounded-xl border border-border/70 bg-card/60 p-2 focus-within:border-violet-500/60">
          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleInputKeyDown}
            placeholder="Type your response..."
            rows={1}
            disabled={loading}
            className="max-h-32 min-h-[36px] flex-1 resize-none overflow-y-auto bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-muted-foreground disabled:opacity-50"
          />

          <button
            onClick={sendMessage}
            disabled={
              loading || !input.trim()
            }
            className="shrink-0 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>

        <p className="mt-1.5 px-1 text-[10px] text-muted-foreground">
          Enter to send · Shift + Enter for new line
        </p>
      </div>

      {/* WebKit scrollbar */}
      <style>
        {`
          .interview-chat-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .interview-chat-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .interview-chat-scroll::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.35);
            border-radius: 999px;
          }

          .interview-chat-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 92, 246, 0.6);
          }
        `}
      </style>
    </aside>
  );
}