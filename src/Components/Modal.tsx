import React, {useState} from "react";
import './Styles/Modal.scss'

interface ModalProps {
    display?: boolean, //is the modal displayed or not : default : false
    onClose?: () => void, //action to do to close the modal
    closeButton?: boolean, //display or not the close button : default : true
    closeOnBack?: boolean, //enable the closing of the modal on the background : default : true
    className?: string //allow to add a className to the modal classes : default : ''
}

export const Modal:React.FC<ModalProps> = ({children,
                                               display= false,
                                               onClose= () => {return},
                                               closeButton = true,
                                               closeOnBack= true,
                                               className= ''
                                            }) => {

    if (!display) return null

    return (
        <>
            <div className="modal-background">
            </div>
            <div className="modal-container" onClick={() => {closeOnBack && onClose()}}>
                <div className={`modal ${className}`}>
                    {children}

                    {closeButton && <div className="close" onClick={onClose}></div>}
                </div>
            </div>
        </>

    )
}