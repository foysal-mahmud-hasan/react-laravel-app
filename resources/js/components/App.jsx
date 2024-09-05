import { MantineProvider } from "@mantine/core";
import React from "react";
import SignupForm from './SignupForm';
import AppRoute from "../AppRoute";

function App() {
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <AppRoute />
        </MantineProvider>
    )
}

export default App