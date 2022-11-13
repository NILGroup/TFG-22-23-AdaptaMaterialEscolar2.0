import { NavBar } from "../components/NavBar/NavBar";
import { Documento } from "../components/Documento/Documento";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './Inicio.module.css';
const  modules  = {
  toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image"],
      ["clean"],
  ],
};
export function Inicio(){
    return (
        <div className={styles.inicio}>
            <NavBar/>

            <div className={styles.main}>
                <Documento />

                <div className={styles.quill_container}>
                    <ReactQuill className={styles.editor} modules={modules}theme="snow"/>
                </div>

            </div>
            
        </div>
    );
}