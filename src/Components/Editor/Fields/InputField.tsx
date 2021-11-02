import React from "react";

interface InputFieldProps {
    value: string,
    inputName: string,
    onChange: (data: string) => void
}

export const InputField:React.FC<InputFieldProps> = ({value, onChange, inputName}) => {
    return (
        <input value={value} type="text" name={inputName} onChange={(e) => onChange(e.target.value)}/>
    )
}