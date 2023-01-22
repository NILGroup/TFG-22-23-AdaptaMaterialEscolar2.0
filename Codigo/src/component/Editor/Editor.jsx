import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ToolbarHandlers from "./Toolbar/ToolbarHandlers";
import "./Editor.css";
import CustomToolbar from "./Toolbar/Toolbar";

  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);
  
  // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
  ];
  Quill.register(Font, true);

  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertPictograms: ToolbarHandlers.insertPictograms
      }
    }
  };
  
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color"
  ];


export default function Editor() {
    //Estado actual del contenido pasamos vacio
    const [state, setState] = useState({ editorHtml: "" });
    //En caso de cambio se registra en el contenido del editor
    let handleChange = html => {
      setState({ editorHtml: html });
    };
  
  return (
    <>
        <div className="text-editor">  
            <CustomToolbar />   
            <ReactQuill value={state.editorHtml}
                onChange={handleChange}
                modules={modules}
                formats={formats}/>
        </div>
    </> 
  );
}
