import { matcher } from "../matcher";

export const PLAIN_LINK_REG = /((?:https?|chrome|edge):\/\/[^ ]+)/;

const renderer = (raw) => {
    const res = matcher(raw, PLAIN_LINK_REG);
    if (!res) {
        return raw;
    }

    return (
        <a className="link" target="_blank" href={res[1]}>
        {res[1]}
        </a>
    );
};

export default {
    name: "plain link",
    regex: PLAIN_LINK_REG,
    renderer,
};