/* eslint-disable prettier/prettier */
import { cn } from "@/lib/utils";

interface ScreenLoaderProps {
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function ScreenLoader({
  text = "Loading",
  fullScreen = true,
  className,
}: ScreenLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#050608]",
        fullScreen && "fixed inset-0 z-[999999]",
        className
      )}
    >
      <div className="loader-wrapper">
        {text.split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="loader-letter"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}

        <div className="loader" />
      </div>
    </div>
  );
}