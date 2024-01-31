import { matcher } from "../matcher";

export const STRIKETHROUGH_REG = /~~(.+?)~~/;

const renderer = (raw) => {
    const res = matcher(raw, STRIKETHROUGH_REG);
    if (!res) {
        return raw;
    }

    return <del>{res[1]}</del>;
};

export default {
    name: "Strikethrough",
    regex: STRIKETHROUGH_REG,
    renderer,
};