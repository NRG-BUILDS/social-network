import { LucideLoader2 } from "lucide-react";
import logo from "@/assets/logos/logo_g_dark.png";

type Props = {
  error: Error | null;
  loading: boolean;
  variant?: "full" | "normal";
};

export const LoadingScreen = ({
  loading,
  error,
  variant = "normal",
}: Props) => {
  // Determine container height based on variant: full screen or normal height
  const containerClass = `flex justify-center items-center ${
    variant === "full" ? "h-screen" : "h-full py-8"
  }`;

  if (loading) {
    return (
      <div className={containerClass}>
        {/* Pulsing logo */}
        {variant === "normal" ? (
          <div className="size-12 bg-white shadow flex items-center justify-center rounded-full">
            <LucideLoader2
              size={30}
              className="text-brand-primary animate-spin"
            />
          </div>
        ) : (
          <div>
            <img src={logo} alt="" className="w-20 animate-pulse" />
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerClass}>
        <p className="text-red-600 text-center">
          {error.message || "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  return null;
};
