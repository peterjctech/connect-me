import { useState } from "react";

interface TooltipProps {
    hover: string | string[];
    children: React.ReactNode;
}

const Tooltip = ({ hover, children }: TooltipProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <div className="tooltip" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            <p className="tooltip__main">{children}</p>
            {showTooltip && (
                <div className="tooltip__content">
                    <p className="tooltip__hover">
                        {typeof hover === "string"
                            ? hover
                            : hover.map((str) => {
                                  return <span>{str}</span>;
                              })}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
