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
        <div>
        <input type="file" accept=".pdf" onChange={onChange} />

        <div style={{ height: '750px' }}>
            {url ? (
                <div
                    style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        height: '100%',
                    }}
                >
                    <iframe className={style.visualizador}id="iframepdf" src={url}></iframe>
                </div>
            ) : (
                <div
                    style={{
                        alignItems: 'center',
                        border: '2px dashed rgba(0, 0, 0, .3)',
                        display: 'flex',
                        fontSize: '2rem',
                        height: '100%',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    Preview area
                </div>
            )}
        </div>
    </div>
    )
}