// Importamos dependencias react
import React, { useCallback, useState } from 'react'
import {ModalType, ModalFactory} from "../Modal/ModalFactory";
// Importamos la factoria de slate
import { createEditor } from 'slate'
// Importamos los componentes de slate y los plugigs de react
import { Slate, Editable, withReact} from 'slate-react'
import Image from '../Image/Image';
import Toolbar from '../Toolbar/Toolbar';
import {toggleCodeBlock, toggleBoldMark} from "../../utils/SlateFunction"

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
]


export default function SlateEditor(){
    // Creamos el objeto editor de slate 
    const [editor] = useState(() => withReact(createEditor()))
  
    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback(props => {
        switch (props.element.type) {
        case 'code':
            return <CodeElement {...props} />
        case 'image':
            return <Image {...props} />
        default:
            return <DefaultElement {...props} />
        }
    }, [])
    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return(
        <>
            <Slate editor={editor} value={initialValue}>
            <Toolbar editor={editor} />
            
            <Editable
                editor={editor}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                if (!event.ctrlKey) {
                    return
                }

                switch (event.key) {
                    case '`': {
                        event.preventDefault()
                        toggleCodeBlock(editor)
                        break
                    }

                    case 'b': {
                        event.preventDefault()
                        toggleBoldMark(editor)
                        break
                    }
                    default:{}
                }
                }}
            />
            </Slate>
        </>
    );
}

// Define a React component to render leaves with bold text.
const Leaf = props => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
        {props.children}
      </span>
    )
  }

const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  }