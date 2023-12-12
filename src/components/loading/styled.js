import styled, {keyframes} from "styled-components";

const rotate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export const LoadContainer = styled.div`
    width: 100px;
    height: 100px;
    align-self: center;
    margin-top: 50px;
    animation: 1s ${rotate} infinite linear;
    display: flex;
    align-items: center;
    justify-content: center;
`;

