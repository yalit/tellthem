import React from "react";
import './Styles/Header.scss';
import {useAppContext} from "../AppContext";

function Header(){
    const {state} = useAppContext()

    return <div id="header">
        <div className="header--title">Tell Them All {state.currentSlide && ` - ${state.currentSlide.title}`}</div>
    </div>;
}

export default Header;