/* eslint-disable prettier/prettier */

import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Play } from "lucide-react";
import { toast } from "sonner";

import interviewService from "../services/interviewService";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/interviews")({
    component: InterviewsPage,
});

function InterviewsPage() {
    const navigate = useNavigate();

    const [difficulty, setDifficulty] = useState("Medium");
    const [language, setLanguage] = useState("java");
    const [company, setCompany] = useState("");
const [role, setRole] = useState("SDE-1");
const [questionStrategy, setQuestionStrategy] =
    useState("RELEVANT");

    const [loading, setLoading] = useState(false);

    const startInterview = async () => {
        setLoading(true);

        try {
           const res = await interviewService.startAISession({
    type: "DSA",
    difficulty,
    language,
    company: company.trim() || null,
    role,
    questionStrategy,
});

            const sessionId =
                res.data.session.id;

            toast.success("Interview Started!");

            navigate({
                to: `/workspace/${sessionId}`,
            });
        } catch (err: any) {
            console.error(err);

            toast.error(
                err?.message ??
                    "Unable to start interview."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center p-8">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        AI Mock Interview
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                        Practice a real coding interview with an AI interviewer.
                        You'll receive a randomly generated DSA question,
                        explain your approach, write code, and answer
                        follow-up questions just like a real interview.
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Difficulty
                        </label>

                        <Select
                            value={difficulty}
                            onValueChange={setDifficulty}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Easy">
                                    Easy
                                </SelectItem>

                                <SelectItem value="Medium">
                                    Medium
                                </SelectItem>

                                <SelectItem value="Hard">
                                    Hard
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Programming Language
                        </label>

                        <Select
                            value={language}
                            onValueChange={setLanguage}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="java">
                                    Java
                                </SelectItem>

                                <SelectItem value="cpp">
                                    C++
                                </SelectItem>

                                <SelectItem value="python">
                                    Python
                                </SelectItem>

                                <SelectItem value="javascript">
                                    JavaScript
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                                    <div>
                    <label className="mb-2 block text-sm font-medium">
                        Company
                    </label>

                    <input
                        value={company}
                        onChange={(e) =>
                            setCompany(e.target.value)
                        }
                        placeholder="e.g. Microsoft, Google, Amazon (optional)"
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-violet-500"
                    />

                    <p className="mt-1 text-xs text-muted-foreground">
                        Leave blank for a general software engineering interview.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Role
                    </label>

                    <Select
                        value={role}
                        onValueChange={setRole}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="SDE-1">
                                SDE-1
                            </SelectItem>

                            <SelectItem value="SDE-2">
                                SDE-2
                            </SelectItem>

                            <SelectItem value="Senior Software Engineer">
                                Senior Software Engineer
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Question Type
                    </label>

                    <Select
                        value={questionStrategy}
                        onValueChange={setQuestionStrategy}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="RELEVANT">
                                Interview Relevant
                            </SelectItem>

                            <SelectItem value="PYQ">
                                Reported Interview Question
                            </SelectItem>

                            <SelectItem value="UNSEEN">
                                Unseen Question
                            </SelectItem>

                            <SelectItem value="MIXED">
                                Mixed
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                    <Button
                        className="w-full"
                        size="lg"
                        onClick={startInterview}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating Interview...
                            </>
                        ) : (
                            <>
                                <Play className="mr-2 h-4 w-4" />
                                Start Interview
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}