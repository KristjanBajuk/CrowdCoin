import React from "react";
import { Container, CssBaseline } from "@mui/material";
import ButtonAppBar from "./AppBar";

const Layout = ({children}) => {
    return <React.Fragment>
            <CssBaseline />
            <ButtonAppBar />
            <Container maxWidth={"xl"}>
                {children}
            </Container>
    </React.Fragment>
};

export default Layout;