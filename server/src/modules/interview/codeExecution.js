import axios from "axios";

import { prepareCode } from "../../services/runners/index.js";

export const executeCode = async ({
  language,
  code,
  input,
  problem
}) => {

  try {

    const languageMap = {
      javascript: 63,
      python: 71,
      cpp: 54,
      java: 62
    };


    const preparedCode = prepareCode({
      language,
      code,
      problem
    });


    /*
     * Judge0 expects base64 when
     * base64_encoded=true.
     *
     * This prevents UTF-8 problems caused by
     * Unicode characters/comments in submitted code.
     */

    const encodedSource =
      Buffer.from(
        preparedCode,
        "utf8"
      ).toString("base64");


    const encodedInput =
      input == null
        ? ""
        : Buffer.from(
            String(input),
            "utf8"
          ).toString("base64");


    const response = await axios.post(

      "http://localhost:2358/submissions?base64_encoded=true&wait=false",

      {
        language_id:
          languageMap[language] || 63,

        source_code:
          encodedSource,

        stdin:
          encodedInput
      },

      {
        headers: {
          "Content-Type":
            "application/json"
        }
      }
    );


    const token =
      response.data.token;


    const result =
      await pollResult(token);


    return result;


  } catch (err) {

    console.error("Judge0 Error:");

    if (err.response) {

      console.error(
        "Status:",
        err.response.status
      );

      console.error(
        "Data:",
        err.response.data
      );

    } else {

      console.error(err);
    }

    throw new Error(
      "Code execution failed"
    );
  }
};


/* =========================================================
   POLL
========================================================= */

const pollResult = async (token) => {

  const url =
    `http://localhost:2358/submissions/${token}?base64_encoded=true`;


  for (let i = 0; i < 10; i++) {

    const res =
      await axios.get(url);


    if (res.data.status.id <= 2) {

      await new Promise(
        r => setTimeout(r, 1000)
      );

      continue;
    }


    console.log(
      "JUDGE0 RAW RESPONSE"
    );

    console.dir(
      res.data,
      { depth: null }
    );


    return {

      output:
        res.data.stdout
          ? Buffer.from(
              res.data.stdout,
              "base64"
            ).toString("utf8")
          : null,


      error:
        res.data.compile_output
          ? Buffer.from(
              res.data.compile_output,
              "base64"
            ).toString("utf8")
          : (
              res.data.stderr
                ? Buffer.from(
                    res.data.stderr,
                    "base64"
                  ).toString("utf8")
                : (
                    res.data.message ||
                    (
                      res.data.status.id !== 3
                        ? res.data.status.description
                        : null
                    )
                )
            ),


      status:
        res.data.status.description,


      raw:
        res.data
    };
  }


  throw new Error(
    "Execution timeout"
  );
};