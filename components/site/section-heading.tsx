import type { ReactNode } from "react";
import { SectionHead } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "default",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  as?: "h1" | "h2";
}) {
  const Title = as;
  return (
    <SectionHead
      origin={align === "center" ? "center center" : "left center"}
      className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
      ) : null}
      <Title
        className={cn(
          "font-serif tracking-tight",
          as === "h1" ? "text-4xl md:text-6xl" : "text-4xl md:text-5xl",
          tone === "inverse" ? "text-primary-foreground" : "text-brand",
          eyebrow ? "mt-4" : "",
        )}
      >
        {title}
      </Title>
      {text ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "inverse" ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      ) : null}
    </SectionHead>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{children}</p>
  );
}
