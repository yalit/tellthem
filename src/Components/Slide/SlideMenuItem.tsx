import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SlideMenuItemProps {
    className?: string,
    title: string,
    open?: boolean
}

export const SlideMenuItem:React.FC<SlideMenuItemProps> = ({children, className , title, open = false}) => {
    const [isOpen, setIsOpen] = useState(open)

    const caretIcon = (isOpen ? "caret-down" : 'caret-right')

    return (
        <div className={`slide-display--menu--item ${className ? className : ''}`}>
            <div className="slide-display--menu--item--title" onClick={() => setIsOpen(!isOpen)}>
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
