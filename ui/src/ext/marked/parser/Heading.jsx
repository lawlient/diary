import { marked } from "..";
import { matcher } from "../matcher";
import InlineCode from "./InlineCode";
import Link from "./Link";
import PlainLink from "./PlainLink";
import PlainText from "./PlainText";

export const HEADING_REG = /^(#+) ([^\n]+)/;

const renderer = (raw) => {
    const res = matcher(raw, HEADING_REG);
    if (!res) {
        return raw;
    }

    const level = res[1].length;
    const parsedContent = marked(res[2], [], [InlineCode, Link, PlainLink, PlainText]);
    if (level === 1) {
        return <h1>{parsedContent}</h1>;
    } else if (level === 2) {
        return <h2>{parsedContent}</h2>;
    } else if (level === 3) {
        return <h3>{parsedContent}</h3>;
    } else if (level === 4) {
        return <h4>{parsedContent}</h4>;
    }
    return <h5>{parsedContent}</h5>;
};

export default {
    name: "heading",
    regex: HEADING_REG,
    renderer,
};