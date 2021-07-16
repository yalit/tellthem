import React from "react";
import './Styles/Header.scss';
import AppBar from '@material-ui/core/AppBar';
import {Toolbar, Typography} from "@material-ui/core";

function Header(){
    return (
        <AppBar position="relative" color={"primary"} id="header">
            <Toolbar>
                <Typography variant="h6" color={"inherit"} noWrap>
                    Tell Them with some slides
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;