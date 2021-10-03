import React, { CSSProperties, useState } from "react";
import { Button as SemanticButton } from "semantic-ui-react";
import { Colors } from "../";

type Props = {
    label: string | any;
    loading?: boolean;
    disabled?: boolean;
    onClick: (e: any) => void;
    style?: CSSProperties;
    type?: "button" | "submit";
    className?: string;
};

export function Button({
    label,
    disabled,
    loading,
    onClick,
    style,
    type = "button",
    className,
}: Props) {
    const [isLoading, setLoading] = useState(false);

    return (
        <SemanticButton
            type={type}
            style={{
                padding: "15px 20px",
                fontWeight: 700,
                fontFamily: "Mulish, serif",
                fontSize: 18,
                borderRadius: 5,
                ...style,
            }}
            disabled={disabled || loading}
            loading={loading || isLoading}
            className={`go__button ${className || ""}`}
            onClick={async (e) => {
                setLoading(true);
                try {
                    await onClick(e);
                } finally {
                    setLoading(false);
                }
            }}
        >
            {label}
        </SemanticButton>
    );
}
