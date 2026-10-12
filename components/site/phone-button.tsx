import { buttonVariants } from "@/components/ui/button";
import { telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";

export function PhoneButton({
  phone,
  className,
}: {
  phone: string;
  className?: string;
}) {
  return (
    <a
      href={telHref(phone)}
      className={cn(
        buttonVariants({ size: "lg" }),
        "h-12 rounded-full border-transparent bg-accent px-6 text-accent-foreground shadow-none transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--accent)_86%,black)] hover:text-accent-foreground active:translate-y-0",
        className,
      )}
    >
      {labels.call}
    </a>
  );
}
