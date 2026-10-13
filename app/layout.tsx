import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: labels.index.title,
    template: "%s",
  },
  description: labels.index.text,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="lt" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
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
