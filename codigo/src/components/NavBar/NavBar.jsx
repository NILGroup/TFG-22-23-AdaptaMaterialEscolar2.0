import styles from './NavBar.module.css'
export function NavBar(){

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>AdaptaMaterialEscolar</h1>
            <ul className={styles.list}>
                <li className={styles.buttons}>
                    <a className={styles.references} href="/">Inicio</a>
                </li>
                <li className={styles.buttons}>
                    <a className={styles.references} href="/ayuda">Ayuda</a>
                </li>
                <li className={styles.buttons}>
                    <a className={styles.references} href="/contacto">Contacto</a>
                </li>
            </ul>
        </div>
    );
}