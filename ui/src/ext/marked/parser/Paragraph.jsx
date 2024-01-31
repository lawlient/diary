import { InlineElementParserList } from ".";
import { marked } from "..";

export const PARAGRAPH_REG = /^([^\n]+)/;

const renderer = (raw) => {
    const parsedContent = marked(raw, [], InlineElementParserList);
    return <p>{parsedContent}</p>;
};

export default {
    name: "paragraph",
    regex: PARAGRAPH_REG,
    renderer,
};