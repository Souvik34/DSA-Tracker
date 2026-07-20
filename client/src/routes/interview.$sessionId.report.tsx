/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import InterviewReport from "@/components/ui/interviewReport";


export const Route = createFileRoute(
  "/interview/$sessionId/report"
)({
  component: InterviewReport,
});