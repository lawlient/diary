import { InlineElementParserList } from ".";
import { marked } from "..";
import { matcher } from "../matcher";

export const TODO_LIST_REG = /^( *)- \[ \] ([^\n]+)/;

const renderer = (raw) => {
    const res = matcher(raw, TODO_LIST_REG);
    if (!res) {
        return raw;
    }
    const space = res[1]
    const parsedContent = marked(res[2], [], InlineElementParserList)
    return (
        <p className="li-container">
        <span className="whitespace-pre">{space}</span>
        <span className="todo-block todo" data-value="TODO"></span>
        <span>{parsedContent}</span>
        </p>
    )
}

export default {
    name: "todo list",
    regex: TODO_LIST_REG,
    renderer,
};