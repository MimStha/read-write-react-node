import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";

import App from "./app";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
        <App />
    </SnackbarProvider>
, rootElement);