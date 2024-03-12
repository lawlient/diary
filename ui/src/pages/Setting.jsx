import MobileHeader from "../components/MobileHeader";
import { useResponsiveWidth } from "../hooks/WindowSize";


export default function Setting() {
    const { md } = useResponsiveWidth();

    return (
        <section className="w-full flex flex-row justify-start items-start">
            <div className="w-full flex flex-col md:max-w-[calc(100%-14rem)] sm:px-2">
                {!md && (
                    <MobileHeader />
                )}
            </div>
        </section>
    )
}