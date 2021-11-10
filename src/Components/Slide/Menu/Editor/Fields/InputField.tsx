import React from "react";

interface InputFieldProps {
    value: string,
    inputName: string,
    onChange: (data: string) => void
}

const InputField:React.FC<InputFieldProps> = ({value, onChange, inputName}) => {
    return (
        <input aria-label={inputName} value={value} type="text" name={inputName} onChange={(e) => onChange(e.target.value)}/>
    )
}

export default InputField