export const generateJavaParser = (parameters)=>{

let code = `
Scanner sc = new Scanner(System.in);
`;

for(const param of parameters){

  if (param.type === "int[]") {

    code += `
String line_${param.name} =
    sc.nextLine()
      .replace("[", "")
      .replace("]", "")
      .replace(",", " ")
      .trim();

String[] ${param.name}Input =
    line_${param.name}.isEmpty()
        ? new String[0]
        : line_${param.name}.split("\\\\s+");

int[] ${param.name} =
    new int[${param.name}Input.length];

for (int i = 0; i < ${param.name}Input.length; i++) {
    ${param.name}[i] =
        Integer.parseInt(${param.name}Input[i]);
}
`;

}   

    else if(param.type === "int"){

        code += `
int ${param.name} =
Integer.parseInt(sc.nextLine().trim());
`;

    }

    else if(param.type === "String"){

        code += `
String ${param.name}=sc.nextLine();
`;

    }

}

return code;

}