import { marked } from "..";
import { matcher } from "../matcher";
import Link from "./Link";
import PlainLink from "./PlainLink";
import PlainText from "./PlainText";

export const EMPHASIS_REG = /\*(.+?)\*/;

const renderer = (raw) => {
    const res = matcher(raw, EMPHASIS_REG);
    if (!res) {
        return raw;
    }

    const parsedContent = marked(res[1], [], [Link, PlainLink, PlainText]);
    return <em>{parsedContent}</em>;
};

export default {
    name: "emphasis",
    regex: EMPHASIS_REG,
    renderer,
};