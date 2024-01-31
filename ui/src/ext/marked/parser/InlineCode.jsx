import { matcher } from "../matcher";

export const INLINE_CODE_REG = /`(.+?)`/;

const renderer = (raw) => {
    const res = matcher(raw, INLINE_CODE_REG);
    if (!res) {
        return raw;
    }

    return <code>{res[1]}</code>;
};

export default {
    name: "inline code",
    regex: INLINE_CODE_REG,
    renderer,
};