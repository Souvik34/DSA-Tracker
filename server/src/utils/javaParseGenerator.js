export const generateJavaParser = (parameters)=>{

let code = `
Scanner sc = new Scanner(System.in);
`;

for(const param of parameters){

    if(param.type === "int[]"){

        code += `
String[] ${param.name}Input =
    sc.nextLine()
    .replace("[","")
    .replace("]","")
    .split(",");

int[] ${param.name} = new int[${param.name}Input.length];

for(int i=0;i<${param.name}Input.length;i++){
    ${param.name}[i] =
    Integer.parseInt(${param.name}Input[i].trim());
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