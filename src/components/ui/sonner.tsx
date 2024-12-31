import { useTheme } from "@/lib/providers/theme-provider";
import { Toaster as Sonner } from "sonner";

interface ToasterProps {
  position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
}

export function Toaster({ position = "bottom-right", ...props }: ToasterProps) {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark"}
      className="toaster group"
      position={position}
      {...props}
    />
  );
}