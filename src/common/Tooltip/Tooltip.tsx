import { useState } from "react";

interface TooltipProps {
    hover: string | string[];
    children: React.ReactNode;
    click?: () => void;
}

const Tooltip = ({ hover, children, click }: TooltipProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const handleClick = () => {
        if (click) click();
    };
    return (
        <div
            className="tooltip"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleClick}
        >
            <p className={`tooltip__main${click ? " can-click" : ""}`}>{children}</p>
            {showTooltip && hover.length > 0 && (
                <div className="tooltip__content">
                    <p className="tooltip__hover">
                        {typeof hover === "string"
                            ? hover
                            : hover.map((str) => {
                                  return <span key={str}>{str}</span>;
                              })}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
