import { InlineElementParserList } from ".";
import { marked } from "..";
import { matcher } from "../matcher";

export const BLOCKQUOTE_REG = /^> ([^\n]+)/;

const renderer = (raw) => {
    const res = matcher(raw, BLOCKQUOTE_REG);
    if (!res) {
        return <>{raw}</>;
    }

    const parsedContent = marked(res[1], [], InlineElementParserList);
    return <blockquote>{parsedContent}</blockquote>;
};

export default {
    name: "blockquote",
    regex: BLOCKQUOTE_REG,
    renderer,
};