import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps : { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider>
          <div className="h-screen w-full max-w-screen-md mx-auto overflow-hidden">
            <Component {...pageProps} />
          </div>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
