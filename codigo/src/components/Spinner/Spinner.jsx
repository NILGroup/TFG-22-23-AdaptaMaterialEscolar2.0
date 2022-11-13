import { ImSpinner2 } from "react-icons/im";

import styles from "./Spinner.module.css";

export function Spinner() {
    return (
        <div className={styles.spinner}>
            <ImSpinner2 className={styles.spinning} size={100} />
        </div>
    );
}