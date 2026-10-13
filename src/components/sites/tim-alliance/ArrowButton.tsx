import { cn } from "@/lib/utils";
import { ASSET } from "./data";

/** Framer "pill + arrow circle" button. `filled` = orange gradient, otherwise orange outline. */
export function ArrowButton({
  href,
  label,
  variant = "filled",
  arrow = "light",
  className,
  as = "a",
}: {
  href?: string;
  label: string;
  variant?: "filled" | "outline";
  arrow?: "light" | "dark";
  className?: string;
  as?: "a" | "button";
}) {
  const inner = (
    <>
      <span className="ta-btn__label">{label}</span>
      <span className="ta-btn__icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/icons/arrow-${arrow}.svg`} alt="" width={24} height={24} />
      </span>
    </>
  );
  const cls = cn("ta-btn", `ta-btn--${variant}`, className);
  if (as === "button") {
    return (
      <button type="submit" className={cls}>
        {inner}
      </button>
    );
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}
