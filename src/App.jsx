import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import SendMailComponent from "./Components/sendMailComponent";

const App = () => (
  <>
  <SendMailComponent/>
  </>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)