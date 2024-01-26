import { marked } from "marked";


export default function Marked({text}) {
    const parse = (c) => {
        var html = marked(c)
        return {__html: html}
    }
    return (
        <div dangerouslySetInnerHTML={parse(text)} >
        </div>
    )
}