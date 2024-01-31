import { marked } from "..";
import { matcher } from "../matcher";
import Link from "./Link";
import PlainText from "./PlainText";

export const BOLD_REG = /\*\*(.+?)\*\*/;

const renderer = (raw) => {
    const res = matcher(raw, BOLD_REG);
    if (!res) {
        return <>{raw}</>;
    }

    const parsedContent = marked(res[1], [], [Link, PlainText]);
    return <strong>{parsedContent}</strong>;
};

export default {
    name: "bold",
    regex: BOLD_REG,
    renderer,
};