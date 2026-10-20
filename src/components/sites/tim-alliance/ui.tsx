import { Fragment, type ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Renders "\n" as a line break at every width. */
export function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

export function Tag({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={light ? "ta-tag ta-tag--light" : "ta-tag"}>
      <span className="ta-tag__ring" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHead({
  tag,
  title,
  light,
  children,
  className,
}: {
  tag: string;
  title: ReactNode;
  light?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className ? `ta-head ${className}` : "ta-head"}>
      <Tag light={light}>{tag}</Tag>
      <h2 className="ta-head__title">{title}</h2>
      {children}
    </Reveal>
  );
}
