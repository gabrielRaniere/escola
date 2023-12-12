import styled from "styled-components"
import * as colors from '../../config/colors'

export const Container = styled.div`
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${colors.primaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;

    .icon {
        cursor: pointer;
        color: white;
    }

    a {
        position: relative;
        padding: 5px ;
    }

    a::after {
        content: '';
        background: none  scroll ;
        bottom: 0;
        display: block;
        height: 2px;
        position: absolute;
        background-color: #fff;
        transition: all 0.3s ease;
        width: 0;
    }

    a:hover::after {
        left: 0;
        width: 100%;
    }
`;