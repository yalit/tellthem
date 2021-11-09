import React, {useState} from "react";

export interface SliderInputProps {
    value: number,
    min: number,
    max: number,
    step?: number,
    onChange: (x: number) => void,
    name: string
}

export const SliderInput:React.FC<SliderInputProps> = ({value, min, max, step = 1, onChange = null, name}) => {
    const [internalValue, setInternalValue] = useState(value)

    const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val:number = Number(event.target.value)

        setInternalValue(val)
        onChange && onChange(val)
    }

    return (
        <input aria-label={name} type="range" min={min} max={max} value={internalValue} step={step} onChange={updateValue} />
    )
}