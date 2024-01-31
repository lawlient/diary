export const BR_REG = /^(\n+)/;

const renderer = (raw) => {
    const length = raw.split("\n").length - 1;
    const brList = [];
    for (let i = 0; i < length; i++) {
        brList.push(<br key={i} />);
    }
    return <>{...brList}</>;
};

export default {
    name: "br",
    regex: BR_REG,
    renderer,
};