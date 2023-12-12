import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const FotoContainer = styled.div`
    width: 100%;

    .icon, img {
        margin: auto;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 3px  ${primaryColor};
        border-style: dashed;
    }

    .icon {
        background-color: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    label {
        margin-top: 30px;
        display: block;
        cursor: pointer;
    }

    input {
        display: none;
    }
`;