import BlockQuote from './BlockQuote'
import Br from './Br'
import CodeBlock from './CodeBlock'
import Heading from './Heading'
import TodoList from './TodoList'
import DoneList from './DoneList'
import OrderedList from './OrderedList'
import UnorderedList from './UnorderedList'
import HorizontalRules from './HorizontalRules'
import Paragraph from './Paragraph'
import Image from './Image'
import BoldEmphasis from './BoldEmphasis'
import Bold from './Bold'
import Emphasis from './Emphasis'
import Link from './Link'
import InlineCode from './InlineCode'
import PlainLink from './PlainLink'
import Tag from './Tag'
import PlainText from './PlainText'
import Strikethrough from './Strikethrough'

export const BlockElementParserList = [
    Br,
    CodeBlock,
    BlockQuote,
    Heading,
    TodoList,
    DoneList,
    OrderedList,
    UnorderedList,
    HorizontalRules,
    Paragraph,
]

export const InlineElementParserList = [
    Image,
    BoldEmphasis,
    Bold,
    Emphasis,
    Link,
    InlineCode,
    PlainLink,
    Strikethrough,
    Tag,
    PlainText,
]