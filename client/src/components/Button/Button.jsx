import { iconButtonClasses } from "@mui/material";
import "./Button.css";

const Button = ({
    id,
    innerText,
    className,
    variant,
    onClick,
    disabled,
    color,
    size,
    startIcon,
    endIcon,
    loading,
    type,
    arrowHover = true,
    href = "#",
    ...options
}) => {
    return (
        <button
            id={id}
            className={`button ${className} ${size} ${disabled && "disabled"} ${variant} ${color}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...options}
        >
            {loading && <span className="loading material-icons">sync</span>}
            {!loading && startIcon && <div className="start-icon">{startIcon}</div>}
            {!loading && innerText}
            {!loading && endIcon && <div className="start-icon">{endIcon}</div>}
            {arrowHover && (
                <div className="before">
                    <span className="material-icons">chevron_right</span>
                </div>
            )}
        </button>
    );
};

export default Button;
