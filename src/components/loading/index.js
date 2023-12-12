import React from "react";
import {LoadContainer} from './styled';
import { AiOutlineLoading } from "react-icons/ai";
import { primaryColor } from "../../config/colors";


export default function Loading() {

    return(
        <LoadContainer>
            <AiOutlineLoading size={60} color={primaryColor}/>
        </LoadContainer>
    )
}