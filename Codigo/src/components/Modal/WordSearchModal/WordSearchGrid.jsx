import style from "./WordSearchGrid.module.css";

export default function WordSearchGrid({ wordSearchGrid }) {
    if (wordSearchGrid === null)
        return <p>ERROR: La sopa de letras no esta definida</p>;

    return (
        <div className={style.wordSearchGrid}>
            {wordSearchGrid.map((row, index) => {
                return (
                    <div key={`row-${index}`} className={style.wordSearchGridRow}>
                        {row.map((col, index) => {
                            return (
                                <div key={`col-${index}`} className={style.wordSearchGridCol}>
                                    {col}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
