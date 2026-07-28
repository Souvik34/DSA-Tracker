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
      cpp:  54,
      java: 62
    };
    // console.log("Judge0 Key:", process.env.JUDGE0_KEY);

    const preparedCode = prepareCode({
  language,
  code,
  // input,
  problem
  });
  const response = await axios.post(
  "http://localhost:2358/submissions?base64_encoded=false&wait=false",
      {
        language_id: languageMap[language] || 63,
        source_code: preparedCode,
        stdin: input
      },
      {
        headers: {
  "Content-Type": "application/json"
}
      }
    );

    const token = response.data.token;

    // poll result
    const result = await pollResult(token);

    return result;

} catch (err) {
  console.error("Judge0 Error:");

  if (err.response) {
    console.error("Status:", err.response.status);
    console.error("Data:", err.response.data);
  } else {
    console.error(err);
  }

  throw new Error("Code execution failed");
}
};


/**
 * Poll execution result
 */
const pollResult = async (token) => {

  const url = `http://localhost:2358/submissions/${token}?base64_encoded=false`;

  for (let i = 0; i < 10; i++) {

  const res = await axios.get(url);
    if (res.data.status.id <= 2) {
      // still processing
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }
console.log("JUDGE0 RAW RESPONSE");
console.dir(res.data, {depth:null});
 return {

  output:
    res.data.stdout || null,

 error:
    res.data.compile_output ||
    res.data.stderr ||
    res.data.message ||
    (
      res.data.status.id !== 3
        ? res.data.status.description
        : null
    ),

  status:
    res.data.status.description,

  raw:
    res.data

};
  }

  throw new Error("Execution timeout");
};