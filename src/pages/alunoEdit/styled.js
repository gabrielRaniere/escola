import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const FotoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
;
    }

    .icon {
        position: absolute;
        background-color: ${primaryColor};
        padding: 5px;
        border-radius: 50%;
        color: white;
        bottom: -15px;
        cursor: pointer;
    }

    a {
        position: absolute;
        bottom: 0;
        margin-right: 20px;

    }
`;
