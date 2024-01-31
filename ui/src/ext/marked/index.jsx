import { matcher } from "./matcher"
import { BlockElementParserList, InlineElementParserList } from "./parser"

const findParser = (raw, parsers) => {
    let parser = undefined
    let index = -1

    for (const p of parsers) {
        const res = matcher(raw, p.regex)

        if (!res) {
            continue
        }

        if (p.name === "plain text" && parser !== undefined) {
            continue
        }

        const start = res.index
        if (parser === undefined || index > start) {
            parser = p
            index = start
        }
    }

    return parser
}


export const marked = (
    raw,
    blockParsers = BlockElementParserList,
    inlineParsers = InlineElementParserList,
) => {
    const bparser = findParser(raw, blockParsers) 
    if (bparser) {
        const res = matcher(raw, bparser.regex)

        if (res) {
            const match = res[0]
            const suffix = raw.slice(match.length)

            if (bparser.name === "br") {
                return (
                    <>
                    {bparser.renderer(match)}
                    {marked(suffix, blockParsers, inlineParsers)}
                    </>
                )
            } else {
                if (suffix === "") {
                    return bparser.renderer(match)
                } else if (suffix.startsWith("\n")) {
                    return (
                        <>
                        {bparser.renderer(match)}
                        {marked(suffix.slice(1), blockParsers, inlineParsers)}
                        </>
                    )
                }
            }
        }
    }

    const lparser = findParser(raw, inlineParsers) 
    if (lparser) {
        const res = matcher(raw, lparser.regex) 
        if (res) {
            const matched = res[0]
            const index = matched.index || 0
            const prefix = raw.slice(0, index)
            const suffix = raw.slice(index + matched.length)
            return (
                <>
                {marked(prefix, [], inlineParsers)}
                {lparser.renderer(matched)}
                {marked(suffix, [], inlineParsers)}
                </>
            )
        }
    }

    return <>{raw}</>
}
