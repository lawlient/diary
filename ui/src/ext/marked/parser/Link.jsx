import { marked } from "..";
import { matcher } from "../matcher";
import Bold from "./Bold";
import BoldEmphasis from "./BoldEmphasis";
import Emphasis from "./Emphasis";
import InlineCode from "./InlineCode";
import PlainText from "./PlainText";

export const LINK_REG = /\[([^\]]+)\]\(([^)]+)\)/;

const renderer = (raw) => {
    const res = matcher(raw, LINK_REG);
    if (!res) {
        return raw;
    }
    const parsedContent = marked(res[1], [], [InlineCode, BoldEmphasis, Emphasis, Bold, PlainText]);
    return (
        <a className="link" target="_blank" href={res[2]}>
        {parsedContent}
        </a>
    );
};

export default {
    name: "link",
    regex: LINK_REG,
    renderer,
};