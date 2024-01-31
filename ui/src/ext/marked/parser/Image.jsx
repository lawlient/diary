import { matcher } from "../matcher";

export const IMAGE_REG = /!\[.*?\]\((.+?)\)/;

const renderer = (raw) => {
    const res = matcher(raw, IMAGE_REG);
    if (!res) {
        return raw;
    }

    const imageUrl = res[1];
    return <img className="img" src={imageUrl} />;
};

export default {
    name: "image",
    regex: IMAGE_REG,
    renderer,
};