export const generateJavaParser = (parameters) => {
    let code = `Scanner sc = new Scanner(System.in);\n`;

    for (const param of parameters) {
        const { name, type } = param;

        switch (type) {

            case "int":
                code += `
int ${name} = Integer.parseInt(sc.nextLine().trim());
`;
                break;

            case "long":
                code += `
long ${name} = Long.parseLong(sc.nextLine().trim());
`;
                break;

            case "double":
                code += `
double ${name} = Double.parseDouble(sc.nextLine().trim());
`;
                break;

            case "boolean":
                code += `
boolean ${name} = Boolean.parseBoolean(sc.nextLine().trim());
`;
                break;

            case "char":
                code += `
char ${name} = sc.nextLine().charAt(0);
`;
                break;

            case "String":
                code += `
String ${name} = sc.nextLine();
`;
                break;

            case "int[]":
                code += `
int[] ${name} = parseIntArray(sc.nextLine());
`;
                break;

            case "long[]":
                code += `
long[] ${name} = parseLongArray(sc.nextLine());
`;
                break;

            case "double[]":
                code += `
double[] ${name} = parseDoubleArray(sc.nextLine());
`;
                break;

            case "boolean[]":
                code += `
boolean[] ${name} = parseBooleanArray(sc.nextLine());
`;
                break;

            case "String[]":
                code += `
String[] ${name} = parseStringArray(sc.nextLine());
`;
                break;

            case "int[][]":
                code += `
int[][] ${name} = parseIntMatrix(sc.nextLine());
`;
                break;

      case "List<Integer>":
    code += `
List<Integer> ${name} =
parseIntegerList(sc.nextLine());
`;
                break;

       case "List<String>":
    code += `
List<String> ${name} =
parseStringList(sc.nextLine());
`;
                break;

       case "List<List<Integer>>":
    code += `
List<List<Integer>> ${name} =
parseIntegerMatrixList(sc.nextLine());
`;
                break;

            case "ListNode":
                code += `
ListNode ${name} =
    parseListNode(sc.nextLine());
`;
                break;

            case "TreeNode":
                code += `
TreeNode ${name} =
    parseTreeNode(sc.nextLine());
`;
                break;

            default:
                throw new Error(
                    `Unsupported Java parameter type: ${type}`
                );
        }
    }

    return code;
};

const generateJavaParsers = () => `
static int[] parseIntArray(String input) {

    input = input
        .replace("[", "")
        .replace("]", "")
        .trim();

    if (input.isEmpty()) {
        return new int[0];
    }

    String[] parts = input.split(",");

    int[] result = new int[parts.length];

    for (int i = 0; i < parts.length; i++) {
        result[i] = Integer.parseInt(parts[i].trim());
    }

    return result;
}


static long[] parseLongArray(String input) {

    input = input
        .replace("[", "")
        .replace("]", "")
        .trim();

    if (input.isEmpty()) {
        return new long[0];
    }

    String[] parts = input.split(",");

    long[] result = new long[parts.length];

    for (int i = 0; i < parts.length; i++) {
        result[i] = Long.parseLong(parts[i].trim());
    }

    return result;
}


static double[] parseDoubleArray(String input) {

    input = input
        .replace("[", "")
        .replace("]", "")
        .trim();

    if (input.isEmpty()) {
        return new double[0];
    }

    String[] parts = input.split(",");

    double[] result = new double[parts.length];

    for (int i = 0; i < parts.length; i++) {
        result[i] = Double.parseDouble(parts[i].trim());
    }

    return result;
}


static boolean[] parseBooleanArray(String input) {

    input = input
        .replace("[", "")
        .replace("]", "")
        .trim();

    if (input.isEmpty()) {
        return new boolean[0];
    }

    String[] parts = input.split(",");

    boolean[] result = new boolean[parts.length];

    for (int i = 0; i < parts.length; i++) {
        result[i] = Boolean.parseBoolean(parts[i].trim());
    }

    return result;
}


static String[] parseStringArray(String input) {

    input = input.trim();

    if (input.isEmpty() || input.equals("[]")) {
        return new String[0];
    }

    input = input
        .replace("[", "")
        .replace("]", "")
        .replace("\"", "")
        .trim();

    String[] parts = input.split(",");

    for (int i = 0; i < parts.length; i++) {
        parts[i] = parts[i].trim();
    }

    return parts;
}


static int[][] parseIntMatrix(String input) {

    input = input
        .replace(" ", "")
        .trim();

    if (input.equals("[]")) {
        return new int[0][0];
    }

    input = input
        .replace("[[", "")
        .replace("]]", "");

    if (input.isEmpty()) {
        return new int[0][0];
    }

    String[] rows = input.split("\\\\],\\\\[");

    int[][] result = new int[rows.length][];

    for (int i = 0; i < rows.length; i++) {

        String row = rows[i]
            .replace("[", "")
            .replace("]", "");

        if (row.isEmpty()) {
            result[i] = new int[0];
            continue;
        }

        String[] values = row.split(",");

        result[i] = new int[values.length];

        for (int j = 0; j < values.length; j++) {
            result[i][j] =
                Integer.parseInt(values[j].trim());
        }
    }

    return result;
}


static List<Integer> parseIntegerList(String input) {

    input = input
        .replace("[", "")
        .replace("]", "")
        .trim();

    List<Integer> result = new ArrayList<>();

    if (input.isEmpty()) {
        return result;
    }

    String[] parts = input.split(",");

    for (String part : parts) {
        result.add(
            Integer.parseInt(part.trim())
        );
    }

    return result;
}


static List<String> parseStringList(String input) {

    input = input.trim();

    List<String> result = new ArrayList<>();

    if (input.equals("[]") || input.isEmpty()) {
        return result;
    }

    input = input
        .replace("[", "")
        .replace("]", "")
        .replace("\"", "");

    String[] parts = input.split(",");

    for (String part : parts) {
        result.add(part.trim());
    }

    return result;
}


static List<List<Integer>> parseIntegerMatrixList(String input) {

    List<List<Integer>> result =
        new ArrayList<>();

    input = input
        .replace(" ", "")
        .trim();

    if (input.equals("[]")) {
        return result;
    }

    input = input
        .replace("[[", "")
        .replace("]]", "");

    String[] rows =
        input.split("\\\\],\\\\[");

    for (String row : rows) {

        List<Integer> current =
            new ArrayList<>();

        row = row
            .replace("[", "")
            .replace("]", "");

        if (!row.isEmpty()) {

            String[] values =
                row.split(",");

            for (String value : values) {

                current.add(
                    Integer.parseInt(
                        value.trim()
                    )
                );
            }
        }

        result.add(current);
    }

    return result;
}


static ListNode parseListNode(String input) {

    input = input
        .replace("[", "")
        .replace("]", "")
        .trim();

    if (input.isEmpty()) {
        return null;
    }

    String[] values = input.split(",");

    ListNode dummy = new ListNode(0);
    ListNode current = dummy;

    for (String value : values) {

        current.next =
            new ListNode(
                Integer.parseInt(value.trim())
            );

        current = current.next;
    }

    return dummy.next;
}


static TreeNode parseTreeNode(String input) {

    input = input
        .replace("[", "")
        .replace("]", "")
        .trim();

    if (input.isEmpty()) {
        return null;
    }

    String[] values = input.split(",");

    if (values.length == 0 ||
        values[0].trim().equals("null")) {
        return null;
    }

    TreeNode root =
        new TreeNode(
            Integer.parseInt(values[0].trim())
        );

    Queue<TreeNode> queue =
        new LinkedList<>();

    queue.offer(root);

    int index = 1;

    while (!queue.isEmpty() &&
           index < values.length) {

        TreeNode current =
            queue.poll();

        String left =
            values[index++].trim();

        if (!left.equals("null")) {

            current.left =
                new TreeNode(
                    Integer.parseInt(left)
                );

            queue.offer(current.left);
        }

        if (index >= values.length) {
            break;
        }

        String right =
            values[index++].trim();

        if (!right.equals("null")) {

            current.right =
                new TreeNode(
                    Integer.parseInt(right)
                );

            queue.offer(current.right);
        }
    }

    return root;
}
`;