import axios from "axios";



export const executeCode = async ({
  language,
  code,
  input
}) => {

  try {

   
    const languageMap = {
      javascript: 63,
      python: 71,
      java: 62
    };
    // console.log("Judge0 Key:", process.env.JUDGE0_KEY);

  const response = await axios.post(
  "http://localhost:2358/submissions?base64_encoded=false&wait=false",
      {
        language_id: languageMap[language] || 63,
        source_code: code,
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

 return {
  output: res.data.stdout,
  error:
    res.data.stderr ||
    res.data.compile_output ||
    res.data.message ||
    null,

  status: res.data.status.description
};
  }

  throw new Error("Execution timeout");
};