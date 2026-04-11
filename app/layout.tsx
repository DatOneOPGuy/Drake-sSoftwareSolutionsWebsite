import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Provider } from "../components/ui/provider";
import Navbar from "../components/ui/Navbar";
import ScrollRail from "../components/ui/ScrollRail";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_TITLE = "Drake's Software Solutions — Precision-built software. Delivered.";
const SITE_DESCRIPTION =
  "Freelance software development studio specializing in custom software, mobile apps, AI integration, cybersecurity, and web development. Based in South Carolina.";

export const metadata: Metadata = {
  metadataBase: new URL('https://drakessoftwaresolutions.com'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    images: [{ url: "/logo-dark.png", alt: "Drake's Software Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo-dark.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <ScrollRail />
          {children}
        </Provider>
      </body>
    </html>
  );
}
