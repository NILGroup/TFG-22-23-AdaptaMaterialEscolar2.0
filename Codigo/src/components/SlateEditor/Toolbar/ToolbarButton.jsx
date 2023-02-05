import style from "./ToolbarButton.module.css";

export default function ToolbarButton({ text, onClick, toolbarGroup, activeGroup }) {
    return (
        <button
            className={style.toolbarButton}
            onClick={() => onClick(toolbarGroup)}
            isactive={activeGroup === toolbarGroup ? "" : undefined}
        >
            {text}
        </button>
    );
}