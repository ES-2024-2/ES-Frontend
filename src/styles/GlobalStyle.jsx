import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    button {
        cursor: pointer;
    }

    body {
        margin: 0;
        background-color: white;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }
`

export default GlobalStyle