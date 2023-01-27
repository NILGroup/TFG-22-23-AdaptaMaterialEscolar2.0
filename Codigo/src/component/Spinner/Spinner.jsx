import { ImSpinner2 } from "react-icons/im";

import style from "./Spinner.module.css";

export default function Spinner() {
    return (
        <div className={style.spinnerContainer}>
            <ImSpinner2 className={style.spinner} />
        </div>
    );
}
