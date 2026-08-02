import { generateJavaParser } from "../../utils/javaParseGenerator.js";

export const prepareJavaCode = ({ code, problem }) => {
      console.log("FUNCTION SIGNATURE");
    console.dir(problem.functionSignature, { depth: null });
    const parserCode = generateJavaParser(
        problem.functionSignature.parameters
    );

    const args = problem.functionSignature.parameters
        .map(p => p.name)
        .join(", ");

    return `
import java.util.*;

${code}

public class Main {
    public static void main(String[] args) {

        ${parserCode}

        Solution sol = new Solution();

        System.out.println(
            sol.${problem.functionSignature.name}(${args})
        );
    }
}
`;
};