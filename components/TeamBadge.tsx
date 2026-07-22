import Image from "next/image";
import { getTeamLogo } from "@/lib/team-logos";

type Props = {
  name: string;
  code?: string;
  size?: "sm" | "md";
  showCode?: boolean;
  className?: string;
};

export function TeamBadge({
  name,
  code,
  size = "sm",
  showCode = false,
  className = "",
}: Props) {
  const logo = getTeamLogo(name);
  const px = size === "md" ? 36 : 28;

  return (
    <span className={`inline-flex items-center gap-2 min-w-0 ${className}`}>
      <span
        className="relative shrink-0 overflow-hidden rounded-full border border-card-border bg-surface"
        style={{ width: px, height: px }}
      >
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={px}
            height={px}
            className="h-full w-full object-contain p-0.5"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-muted">
            {(name || "?").slice(0, 1)}
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium text-foreground">
          {name}
        </span>
        {showCode && code ? (
          <span className="text-xs text-muted">{code}</span>
        ) : null}
      </span>
    </span>
  );
}
