import { InlineElementParserList } from ".";
import { marked } from "..";
import { matcher } from "../matcher";

export const DONE_LIST_REG = /^( *)- \[[xX]\] ([^\n]+)/;

const renderer = (raw) => {
    const res = matcher(raw, DONE_LIST_REG);
    if (!res) {
        return raw;
    }
    const space = res[1];
    const parsedContent = marked(res[2], [], InlineElementParserList);
    return (
        <p className="li-container">
        <span className="whitespace-pre">{space}</span>
        <span className="todo-block done" data-value="DONE">
            ✓
        </span>
        <span>{parsedContent}</span>
        </p>
    );
};

export default {
    name: "done list",
    regex: DONE_LIST_REG,
    renderer,
};