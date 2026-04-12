"use client";
import { PropsWithChildren } from "react";
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        accentRed: { value: "#dc2626" },
        accentRedDeep: { value: "#7f1d1d" },
        accentFlame: { value: "#f97316" },
        bgBase: { value: "var(--bg-base)" },
      },
    },
    semanticTokens: {
      colors: {
        textPrimary: { value: "var(--text-primary)" },
        textMuted: { value: "var(--text-muted)" },
        textSubtle: { value: "var(--text-subtle)" },
        textFaint: { value: "var(--text-faint)" },
        bgCard: { value: "var(--bg-card)" },
        bgCardStrong: { value: "var(--bg-card-strong)" },
        bgNav: { value: "var(--bg-nav)" },
        bgFooter: { value: "var(--bg-footer)" },
        borderSoft: { value: "var(--border-soft)" },
        borderMedium: { value: "var(--border-medium)" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

export function Provider({ children }: PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
