import styled from "styled-components";
import { primaryColor, primaryDarkColor } from "../../config/colors";

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;


    input {
        margin: 5px 0 10px 0;
        width: 100%;
        height: 35px;
        padding: 0 10px;
        box-sizing: border-box;
        border: 0.5px solid #eee;
        border-radius: 4px;
        outline: none;
    }

    input:hover {
        border: 1px solid ${primaryColor};
    }

    label {
        display: block;
        text-align: left;
        opacity: 0.7;
    }

    .btn-exclude-acount {
        width: 20%;
        background-color: ${primaryDarkColor};
        align-self: flex-end;
        margin-top: 30px;
        font-size: 10px;
    }

    .delete-count-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .delete-count-container div{
        width: 30%;
        background-color: #eee;
        padding: 20px;
        border-radius: 5px;
        font-weight: bold;
        gap: 5px;
    }

    .delete-count-container small{
        opacity: 0.8;
        font-weight:normal;
    }

    .delete-count-container .btn-no {
        background-color: ${primaryDarkColor};
    }

    .display-none {
        display: none;
    }
`;
