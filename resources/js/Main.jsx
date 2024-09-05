import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";

import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const theme = createTheme({
    primaryColor: "indigo",
    // fontFamily: 'sans-serif',
    fontFamily: "Open Sans, sans-serif",
    // autoContrast: true,
    // defaultRadius: 'xl'
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </React.StrictMode>
);