import React from "react";

interface InputFieldProps {
    value: string,
    onChange: (data: string) => void
}

export const InputField:React.FC<InputFieldProps> = ({value, onChange}) => {
    return (
        <input value={value} onChange={(e) => onChange(e.target.value)}/>
    )
}