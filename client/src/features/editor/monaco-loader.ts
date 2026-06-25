/**
 * Lazy Monaco Editor loader — prepares the seam without bundling Monaco yet.
 * When a problem-solving page is built, install @monaco-editor/react and
 * implement the dynamic import here so the editor is code-split.
 *
 *   const { default: Editor } = await import("@monaco-editor/react");
 *   return Editor;
 */
export async function loadMonacoEditor() {
  throw new Error("Monaco editor not yet installed. Add @monaco-editor/react when needed.");
}

export const SUPPORTED_LANGUAGES = ["cpp", "java", "python", "javascript", "typescript"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
