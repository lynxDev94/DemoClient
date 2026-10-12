import Link from "next/link";
import { Container } from "@/components/site/container";
import { labels } from "@/lib/labels";

export default function NotFound() {
  return (
    <main id="turinys" className="flex flex-1 items-center py-24">
      <Container>
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">404</p>
        <h1 className="mt-4 font-serif text-5xl tracking-tight text-brand">{labels.notFound.title}</h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">{labels.notFound.text}</p>
        <Link
          href="/"
          className="mt-8 inline-flex text-sm font-medium text-accent transition-colors duration-200 hover:text-brand"
        >
          {labels.notFound.back}
        </Link>
      </Container>
    </main>
  );
}
