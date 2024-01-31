import { matcher } from "../matcher";

export const PLAIN_TEXT_REG = /(.+)/;

const renderer = (raw) => {
    const res = matcher(raw, PLAIN_TEXT_REG);
    if (!res) {
        return raw;
    }

    return res[1];
};

export default {
    name: "plain text",
    regex: PLAIN_TEXT_REG,
    renderer,
};