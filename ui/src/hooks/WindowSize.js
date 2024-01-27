import useWindowSize from "react-use/lib/useWindowSize";

export const useResponsiveWidth = () => {
    const { width } = useWindowSize();
    return {
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
    };
};