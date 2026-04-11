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
        bgBase: { value: "#070708" },
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
