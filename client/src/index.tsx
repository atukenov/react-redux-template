import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "antd/dist/antd.min.css";
import { createRoot } from "react-dom/client";

import i18n from "./translation";
import App from "./App";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
