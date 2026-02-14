import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Pixel Actors Demo",
  description: "Code-based pixel animation actors"
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
