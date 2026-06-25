// Re-export the JS authService so existing TS imports keep working.
// All real API calls live in src/services/authService.js.
export { authService } from "@/services/authService";
export { default } from "@/services/authService";
