export const HORIZONTAL_RULES_REG = /^_{3}|^-{3}|^\*{3}/;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const renderer = (raw) => {
    return <hr />;
};

export default {
    name: "horizontal rules",
    regex: HORIZONTAL_RULES_REG,
    renderer,
};