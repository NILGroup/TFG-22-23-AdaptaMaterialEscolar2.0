import { Editor, Transforms, Text} from 'slate'

function isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
    })

    return !!match
}

function isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
    })

    return !!match
}

export function toggleBoldMark(editor) {
    const isActive = isBoldMarkActive(editor)
    Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
    )
}

export function toggleCodeBlock(editor) {
    const isActive = isCodeBlockActive(editor)
    Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Editor.isBlock(editor, n) }
    )
}


  
