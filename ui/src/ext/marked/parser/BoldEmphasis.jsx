import { marked } from "..";
import { matcher } from "../matcher";
import Link from "./Link";
import PlainText from "./PlainText";

export const BOLD_EMPHASIS_REG = /\*\*\*(.+?)\*\*\*/;

const renderer = (raw) => {
    const res = matcher(raw, BOLD_EMPHASIS_REG);
    if (!res) {
        return raw;
    }

    const parsedContent = marked(res[1], [], [Link, PlainText]);
    return (
        <strong>
        <em>{parsedContent}</em>
        </strong>
    );
};

export default {
    name: "bold emphasis",
    regex: BOLD_EMPHASIS_REG,
    renderer,
};