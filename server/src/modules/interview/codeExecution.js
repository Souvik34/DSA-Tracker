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

    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        language_id: languageMap[language] || 63,
        source_code: code,
        stdin: input
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE0_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      }
    );

    const token = response.data.token;

    // poll result
    const result = await pollResult(token);

    return result;

  } catch (err) {
    console.error("Code execution error:", err.message);
    throw new Error("Code execution failed");
  }
};


/**
 * Poll execution result
 */
const pollResult = async (token) => {

  const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}`;

  for (let i = 0; i < 10; i++) {

    const res = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": process.env.JUDGE0_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      }
    });

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