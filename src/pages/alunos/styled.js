import styled from "styled-components";
import * as colors from '../../config/colors';

export const AlunoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-bottom: 0.3px solid #eee;

    img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }

    .icons{
        display: flex;
        align-items: center;
        gap: 15px;
        color: ${colors.primaryColor};
    }

    .icon:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    a {
        margin-top: 3px;
        color: ${colors.primaryColor};
    }
`;

export const AddAluno = styled.div`
    align-self: flex-start;
    font-weight: 500;
    margin: 10px 0 15px 0;
    padding: 5px;
    position: relative;
    cursor: pointer;

    a {
        color: ${colors.primaryColor};
        display: flex;
        gap: 5px;
        align-items: center;
        text-decoration: none;
    }

    &::after {
        content: '';
        bottom: 0;
        position: absolute;
        height: 2px;
        width: 0;
        left: 0;
        background: scroll transparent;
    }

    &:hover::after {
        transition: 0.3s all ease;
        width: 100%;
        background-color: ${colors.primaryColor};
    }
`;