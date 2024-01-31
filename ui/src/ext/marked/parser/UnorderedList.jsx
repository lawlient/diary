import { InlineElementParserList } from ".";
import { marked } from "..";
import { matcher } from "../matcher";

export const UNORDERED_LIST_REG = /^( *)[*-] ([^\n]+)/;

const renderer = (raw) => {
    const res = matcher(raw, UNORDERED_LIST_REG);
    if (!res) {
        return raw;
    }
    const space = res[1];
    const parsedContent = marked(res[2], [], InlineElementParserList);
    return (
        <p className="li-container">
        <span className="whitespace-pre">{space}</span>
        <span className="ul-block">•</span>
        <span>{parsedContent}</span>
        </p>
    );
};

export default {
    name: "unordered list",
    regex: UNORDERED_LIST_REG,
    renderer,
};