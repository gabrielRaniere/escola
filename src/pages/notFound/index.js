import React from "react";
import {Container} from '../../globalStyles/globalStyled'
import { Description } from "./styled";

export default function NotFound() {

    return(
        <Container>
            <h1>404</h1>
            <Description>Page not Found</Description>
        </Container>
    )
}