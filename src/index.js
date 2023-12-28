import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
import { SocketProvider } from "./Context/SocketProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <SocketProvider>
      <App />
      </SocketProvider>
    </ChatProvider>
  </BrowserRouter>
);
