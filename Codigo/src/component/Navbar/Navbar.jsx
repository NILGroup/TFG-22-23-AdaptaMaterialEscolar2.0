import { Link } from "react-router-dom";

// React Icons
import { AiTwotoneSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";

import style from "./Navbar.module.css";

export default function Navbar() {
    return (
        <div className={style.navbar}>
            <div className={style.navbarLogo}>
                <Link to="/"><img src="/img/Logo.png" alt="Logo de AME2" /></Link>
            </div>
            <div className={style.navbarLinks}>
                <Link to="ayuda" className={style.navbarLink}>
                    <BiHelpCircle className={style.navbarLinkIcon} />
                    <p className={style.navbarLinkText}>Ayuda</p>
                </Link>
                <Link to="configuracion" className={style.navbarLink}>
                    <AiTwotoneSetting className={style.navbarLinkIcon} />
                    <p className={style.navbarLinkText}>Configuración</p>
                </Link>
            </div>
        </div>
    );
}
