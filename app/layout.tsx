import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Manrope, Nunito_Sans, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { MotionRoot } from "@/components/motion/motion-root";
import { labels } from "@/lib/labels";
import "./globals.css";

const outfit = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

const fraunces = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
});

/* Modern theme fonts. `[data-theme="modern"]` maps them onto --font-fraunces / --font-outfit. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm",
});

/* Warm theme fonts, mapped by warmStyle() in lib/format.ts. */
const warmHead = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-warm-head",
});

const warmBody = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-warm-body",
});

export const metadata: Metadata = {
  title: {
    default: labels.index.title,
    template: "%s",
  },
  description: labels.index.text,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="lt" className={`${outfit.variable} ${fraunces.variable} ${jakarta.variable} ${dmSans.variable} ${warmHead.variable} ${warmBody.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <MotionRoot>
          <a
            href="#turinys"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2"
          >
            {labels.a11y.skip}
          </a>
          {children}
        </MotionRoot>
      </body>
    </html>
  );
}
