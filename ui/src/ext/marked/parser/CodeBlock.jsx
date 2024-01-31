import copy from "copy-to-clipboard";
import hljs from "highlight.js";
import { toast } from "react-hot-toast";
import { matcher } from "../matcher";

export const CODE_BLOCK_REG = /^```(\S*?)\s([\s\S]*?)```/;

const renderer = (raw) => {
    const res = matcher(raw, CODE_BLOCK_REG);
    if (!res) {
        return <>{raw}</>;
    }

    const language = res[1] || "plaintext";
    let highlightedCode = hljs.highlightAuto(res[2]).value;

    try {
        const temp = hljs.highlight(res[2], {
            language,
        }).value;
        highlightedCode = temp;
    } catch (error) {
        // do nth
    }


    const handleCopyButtonClick = () => {
        copy(res[2]);
        toast.success("Copied to clipboard!");
    };

    return (
        <pre className="group">
        <button
            className="text-xs font-mono italic absolute top-0 right-0 px-2 leading-6 border btn-text rounded opacity-0 group-hover:opacity-60"
            onClick={handleCopyButtonClick}
        >
            copy
        </button>
        <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
        </pre>
    );
};

export default {
    name: "code block",
    regex: CODE_BLOCK_REG,
    renderer,
};