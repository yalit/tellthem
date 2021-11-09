import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";

library.add({faCaretDown,faCaretRight})

export type SlideMenuItemProps = {
    className?: string,
    title: string,
    open?: boolean,
    onOpen?: (sectionStatus: {[key: string]: boolean}) => void,
    name: string
}

const SlideMenuItem:React.FC<SlideMenuItemProps> = ({children, className , title, open, onOpen, name}) => {
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
                    <FontAwesomeIcon icon={caretIcon} data-testid={`switch-display-menu-item-${name}`} />
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

export default SlideMenuItem
