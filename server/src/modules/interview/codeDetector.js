/**
 * ---------------------------------------------------------
 * AI Interview Code Detector
 *
 * Detects interview progress instead of simply
 * detecting whether user pasted code.
 *
 * This module NEVER knows the problem.
 * It only analyses code evolution.
 * ---------------------------------------------------------
 */

export const SubmissionType = {

    TEXT: "TEXT",

    CODE: "CODE"

};

const CODE_KEYWORDS = [

    "class ",
    "public ",
    "private ",
    "protected ",
    "return",
    "function",
    "def ",
    "while",
    "for",
    "if",
    "switch",
    "case",
    "new ",
    "{",
    "};",
    "=>",
    "System.out",
    "console.log"

];



export const detectSubmissionType = (
    message = ""
) => {

    const score =
        CODE_KEYWORDS.reduce(

            (count, keyword) =>

                message.includes(keyword)
                    ? count + 1
                    : count,

            0
        );

    return score >= 3
        ? SubmissionType.CODE
        : SubmissionType.TEXT;

};



export const analyzeCodeProgress = ({

    previousCode = "",

    currentCode = "",

    interviewGuide = {}

}) => {

    const previousLines =
        previousCode
            .split("\n")
            .map(x => x.trim())
            .filter(Boolean);

    const currentLines =
        currentCode
            .split("\n")
            .map(x => x.trim())
            .filter(Boolean);

    const addedLines =
        currentLines.filter(

            line =>

                !previousLines.includes(line)

        );



    const completion = Math.min(

        100,

        Math.round(

            (currentLines.length / 40) * 100

        )

    );



    let matchedTrigger = null;

    let criticalLogicAdded = false;



    const triggers =
        interviewGuide.codingTriggers || [];



    for (const trigger of triggers) {

        const lower = trigger.concept.toLowerCase();

        const matched = addedLines.find(

            line =>
                line.toLowerCase().includes(lower)

        );

        if (matched) {
matchedTrigger = trigger.concept;

            criticalLogicAdded = true;

            break;

        }

    }



    const edgeCaseAdded =

        addedLines.some(

            line =>

                line.includes("null") ||

                line.includes("length==0") ||

                line.includes("isEmpty") ||

                line.includes("size()==0")

        );



    const returnAdded =

        addedLines.some(

            line =>
                line.includes("return")

        );



    return {

        changed:

            addedLines.length > 0,



        addedLines:

            addedLines.length,



        completion,



        triggerMatched:

            matchedTrigger,



        criticalLogicAdded,



        edgeCaseAdded,



        returnAdded,



        snapshot: currentCode

    };

};