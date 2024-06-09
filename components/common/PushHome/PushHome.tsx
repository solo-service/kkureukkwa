import { BeforeInstallPromptEvent } from "@/types/global";
import { Button } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

export default function PushHome() {

    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | undefined>(undefined);
    const [pwa,setPwa] = useState(false);

    const checkUnsupportedBrowser = useCallback(() => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return (
          (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') <= -1 && userAgent.indexOf('chromium') <= -1 ) ||
          (userAgent.indexOf('firefox') > -1 && userAgent.indexOf('seamonkey') <= -1)
        );
    },[]);

    const promptAppInstall = async () => {
        const isUnsupportedBrowser = checkUnsupportedBrowser();
        if (isUnsupportedBrowser) {
            alert("공유 버튼을 눌러서 홈 화면에 \n추가를 클릭해 앱으로 저장해서 사용 가능해요!");
        }
        if (!isUnsupportedBrowser) {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                setDeferredPrompt(undefined);
            } else {
                alert("이미 설치가 되어있어요!");
            }
        }
        localStorage.setItem("pwa","true");
    }

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
        }
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        if("serviceWorker" in navigator) {
            navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => {/* console.log("sw worker registered", reg) */})
            .catch(() => {/* console.log("failed") */})
        }

        if(localStorage.getItem("pwa") === "true"){
            setPwa(true);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        }
    }, []);

    return (
        <>
            {
                !pwa &&
                <Button 
                    onClick={promptAppInstall} 
                    fullWidth 
                    color="secondary" 
                    className="w-[95%] fixed bottom-2 left-1/2 -translate-x-1/2 z-10"
                >홈 화면에 추가</Button>
            }
        </>
    )
}
