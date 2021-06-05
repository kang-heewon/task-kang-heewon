import { css, Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import "reset-css";
import { Layout } from "./components/layout/Layout";
import { UserForm } from "./pages/UserForm";

ReactDOM.render(
  <React.StrictMode>
    <link
      href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
      rel="stylesheet"
      type="text/css"
    />
    <Global
      styles={css`
        * {
          font-family: "Spoqa Han Sans Neo", "sans-serif";
          box-sizing: border-box;
        }
      `}
    />
    <Layout>
      <UserForm />
    </Layout>
  </React.StrictMode>,
  document.getElementById("root")
);
