import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SlideMenuItemProps {
    className?: string,
    title: string,
    open?: boolean,
    onOpen?: (sectionStatus: {[key: string]: boolean}) => void,
    name: string
}

export const SlideMenuItem:React.FC<SlideMenuItemProps> = ({children, className , title, open, onOpen, name}) => {
    const [isOpen, setIsOpen] = useState<boolean>(open || open !== undefined)

    const caretIcon = (isOpen ? "caret-down" : 'caret-right')

    const onClick = () => {
        (onOpen !== undefined && onOpen({[name]: !isOpen}))
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (open !== isOpen && open !== undefined) setIsOpen(open)
    })

    return (
        <div className={`slide-display--menu--item ${className ? className : ''}`}>
            <div className="slide-display--menu--item--title" onClick={onClick}>
                <div>{title}</div>
                <div className="slide-display--menu--item--caret">
                    <FontAwesomeIcon icon={caretIcon} />
                </div>
            </div>
            {isOpen && (
                <div className="slide-display--menu--item--data">
                    {children}
                </div>
            )}

        </div>
    )
}
