import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "@/config/font/pretendard/pretendard-subset.css";
import { AddressProvider } from "@/provider/AddressProvider";
import PushHome from "@/components/common/PushHome/PushHome";

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
            <div className="h-screen w-full max-w-screen-md mx-auto overflow-hidden border border-t-0 border-b-0">
              <Component {...pageProps} />
              <PushHome/>
            </div>
          </AddressProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );

}