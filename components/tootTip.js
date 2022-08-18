import React from "react";
import { useRef } from "react";

export default function Tooltip({ children, tooltipText }) {
    const tipRef = React.createRef(null);
    function handleMouseEnter() {
        tipRef.current.style.opacity = 1;
        tipRef.current.style.marginLeft = "20px";
    }
    function handleMouseLeave() {
        tipRef.current.style.opacity = 0;
        tipRef.current.style.marginLeft = "10px";
    }
    return (
        <div
            className="relative flex items-center opacity-75"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute whitespace-no-wrap bg-red-500 text-white px-4 py-2 rounded flex items-center transition-all duration-150 w-full"
                style={{ right: "100%", opacity: 0 }}
                ref={tipRef}
            >
                <div
                    className="bg-red-500 h-3 w-3 absolute"
                    style={{ right: "-6px", transform: "rotate(45deg)" }}
                />
                {tooltipText}
            </div>
            {children}
        </div>
    );
}