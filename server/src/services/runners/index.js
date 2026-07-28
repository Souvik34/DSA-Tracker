import { prepareJavaCode } from "./javaRunner.js";
import { prepareCppCode } from "./cppRunner.js";
import { preparePythonCode } from "./pythonRunner.js";


export const prepareCode = ({
    language,
    code,
    problem
})=>{

    switch(language){

        case "java":
            return prepareJavaCode({
                code,
                problem
            });

        case "cpp":
            return prepareCppCode({
                code,
                problem
            });

        case "python":
            return preparePythonCode({
                code,
                problem
            });

        default:
            return code;
    }

};