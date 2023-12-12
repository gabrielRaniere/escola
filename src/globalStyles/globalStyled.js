import {createGlobalStyle, styled} from "styled-components";
import * as colors from '../config/colors'
import 'react-toastify/dist/ReactToastify.css';
export default createGlobalStyle`
    
    :root {
        --toastify-icon-color-success: white;
        --toastify-icon-color-error: #f2Af29;
        --toastify-color-error: #f2Af29;
    }

    * {
        margin: 0;
        padding: 0;
    }

    body{
        font-family: sans-serif;
        background-color: ${colors.primaryDarkColor}
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        background-color: ${colors.successColor};
        color: white;
    }

    h1 {
        margin-bottom: 10px;
    }

    button {
        margin-top: 10px;
        width: 100%;
        padding: 10px 0;
        background-color: ${colors.primaryColor};
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.8;
    }
`;

export const Container = styled.div`
    max-width: 450px;
    min-height: 400px;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    padding: 20px;
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`;


