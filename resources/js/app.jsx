import './bootstrap'

import React from 'react'
import ReactDom from 'react-dom'
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { BrowserRouter } from "react-router-dom";
import App from './components/App'
import { ModalsProvider } from '@mantine/modals';
const theme = createTheme({
    primaryColor: "indigo",
    // fontFamily: 'sans-serif',
    fontFamily: "Open Sans, sans-serif",
    // autoContrast: true,
    // defaultRadius: 'xl'
});
ReactDom.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ModalsProvider>
        </MantineProvider>
    </React.StrictMode >
)