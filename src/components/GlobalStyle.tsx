import { createGlobalStyle } from "styled-components";
import COLORMAP from "./ColorMap";
const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Noto Sans TC', sans-serif;
    } 
    body{
        width: 100vw;
        height: 100vh;
        position: relative;
        overflow: hidden;
        background-color: ${COLORMAP.primary};
    }
    #root{
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
    }
`;
export default GlobalStyle;