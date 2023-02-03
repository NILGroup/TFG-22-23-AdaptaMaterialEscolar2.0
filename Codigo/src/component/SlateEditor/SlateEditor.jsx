// Importamos dependencias react
import React, { useCallback, useState } from 'react'

// Importamos la factoria de slate
import { createEditor } from 'slate'

// Importamos los componentes de slate y los plugigs de react
import { Slate, Editable, withReact } from 'slate-react'
import Pictogram from './Elements/Pictogram/Pictogram';
import Desarrollo from './Elements/Desarrollo/Desarrollo';
import Toolbar from './Toolbar/Toolbar';

import style from "./SlateEditor.module.css";

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

export default function SlateEditor() {
  // Creamos el objeto editor de slate 
  const [editor] = useState(() => withReact(createEditor()))

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'image':
        return <Pictogram {...props} />
      case 'desarrollo':
        return <Desarrollo {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <>
      <Slate editor={editor} value={initialValue}>
        <div className={style.editor}>
          <div className={style.header}>
            <Toolbar editor={editor} />
          </div>
          <div className={style.content}>
            <Editable
              editor={editor}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              className={style.editable}
            />
          </div>
        </div>
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

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}