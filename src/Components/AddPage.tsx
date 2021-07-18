import React from "react";
import './Styles/addPage.scss';

type AddPageProps = {
    onClick: Function
}

const AddPage:React.FC<AddPageProps> = ({onClick}) => {

    return (
        <div className={'add__page'} onClick={() => onClick()}>+</div>
    )
}

export default AddPage