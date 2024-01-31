import { InlineElementParserList } from ".";
import { marked } from "..";
import { matcher } from "../matcher";

export const ORDERED_LIST_REG = /^( *)(\d+)\. (.+)/;

const renderer = (raw) => {
    const res = matcher(raw, ORDERED_LIST_REG);
    if (!res) {
        return raw;
    }
    const space = res[1];
    const parsedContent = marked(res[3], [], InlineElementParserList);
    return (
        <p className="li-container">
        <span className="whitespace-pre">{space}</span>
        <span className="ol-block">{res[2]}.</span>
        <span>{parsedContent}</span>
        </p>
    );
};

export default {
    name: "ordered list",
    regex: ORDERED_LIST_REG,
    renderer,
};