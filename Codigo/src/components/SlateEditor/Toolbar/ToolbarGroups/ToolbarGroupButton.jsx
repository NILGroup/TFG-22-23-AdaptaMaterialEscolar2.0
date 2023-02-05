import style from "./ToolbarGroupButton.module.css";

export default function ToolbarGroupButton({ children, onClick }) {
    return (
        <button className={style.toolbarButton} onClick={() => onClick()} >
            {children}
        </button>
    );
}