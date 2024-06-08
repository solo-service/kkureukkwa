import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "@/config/font/pretendard/pretendard-subset.css";
import { AddressProvider } from "@/provider/AddressProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider>
          <AddressProvider>
            <div className="h-screen w-full max-w-screen-md mx-auto overflow-hidden">
              <Component {...pageProps} />
            </div>
          </AddressProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );

}