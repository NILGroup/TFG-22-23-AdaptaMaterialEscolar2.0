import style from './Documento.module.css'
import React, {useState} from 'react';
import { Viewer } from '@react-pdf-viewer/core';
export function Documento(){
    const [url, setUrl] = useState('');

    // Handle the `onChange` event of the `file` input
    const onChange = (e) => {
        const files = e.target.files;
        files.length > 0 && setUrl(URL.createObjectURL(files[0]));
    };

    return(
        <div className={style.documento_container}>
            <input type="file" accept=".pdf" onChange={onChange} />

            {url ? (
                <div className={style.visualizador_container}>
                    <iframe className={style.visualizador} id="iframepdf" src={url}></iframe>
                </div>
            ) : (
                <div className={style.preview_area}>
                    Preview area
                </div>
            )}

        </div>
    )
}