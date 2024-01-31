import { matcher } from "../matcher";

export const TAG_REG = /#([^\s#,]+)/;

const renderer = (raw) => {
    const res = matcher(raw, TAG_REG);
    if (!res) {
        return raw;
    }

    return <span className="tag-span">#{res[1]}</span>;
};

export default {
    name: "tag",
    regex: TAG_REG,
    renderer,
};