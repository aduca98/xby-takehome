import React, { CSSProperties, useState } from "react";

type ButtonProps = {
    label: string | JSX.Element;
    onClick: any;
    loading?: boolean;
    timeout?: number;
    type?: "submit" | "button";
    className?: string;
    disabled?: boolean;
    style?: CSSProperties;
};

function Button({
    type = "button",
    loading,
    style,
    label,
    onClick,
    timeout = 0,
    className,
    disabled = false,
}: ButtonProps) {
    const [isLoading, setLoading] = useState(false);

    const _onClick = async () => {
        setLoading(true);

        try {
            await onClick();
        } catch (err) {
        } finally {
            setTimeout(() => setLoading(false), timeout);
        }
    };

    const isDisabled = disabled || isLoading || loading;

    return (
        <button
            type={type}
            onClick={_onClick}
            disabled={isDisabled}
            style={style}
            className={
                `${
                    className || ""
                } bg-indigo-500 align-middle w-full text-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2` +
                (isDisabled ? " disabled:opacity-60 cursor-not-allowed" : "") +
                (isLoading || loading ? " cursor-wait " : "")
            }
        >
            <div className="w-full">
                {isLoading || loading ? "loading..." : label}
            </div>
        </button>
    );
}

export { Button };
