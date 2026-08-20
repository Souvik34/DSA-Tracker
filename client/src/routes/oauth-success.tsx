/* eslint-disable prettier/prettier */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { ScreenLoader } from "@/components/ui/ScreenLoader";



export const Route = createFileRoute("/oauth-success")({
  component: OAuthSuccessPage,
});

function OAuthSuccessPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const login = () => {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");
      const userParam = params.get("user");

      if (!token || !userParam) {
        navigate({ to: "/login" });
        return;
      }

      try {
        const user = JSON.parse(userParam);

        localStorage.setItem("auth_token", token);

        setAuth(user, token);

        navigate({ to: "/dashboard" });
      } catch (error) {
        console.error("OAuth login failed:", error);

        localStorage.removeItem("auth_token");
        navigate({ to: "/login" });
      }
    };

    login();
  }, [navigate, setAuth]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#050608] text-white">
//       Signing you in...
//     </div>
//   );

return <ScreenLoader text="Signing you in" />;
}