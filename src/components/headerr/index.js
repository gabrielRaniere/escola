import React, { useEffect } from "react";
import {Container} from './styled';
import { IoMdHome, IoMdExit } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RiShutDownLine } from "react-icons/ri";
import {loginFailure} from '../../store/modules/auth/actions';
import { toast } from "react-toastify";


export default function Header() {

    const dispach = useDispatch();

    const logged = useSelector(state => state.authReducer.isLogged);

    useEffect(()=>{console.log(logged)});

    function handleExit() {
        dispach(loginFailure());
        toast.info('Sua seção foi encerrada...');
    }

    return(
       <Container>
        <Link to="register">
            <IoPersonCircleOutline size={30}  className="icon"/>
        </Link>
        <Link to='/'>
            <IoMdHome size={30}  className="icon"/>
        </Link>
        {
            logged ? (
                <Link to='/login'>
                    <RiShutDownLine onClick={handleExit} size={28} className="icon"/>
                </Link>
            ) :
            (
                <Link to='/login'>
                <IoMdExit size={30}  className="icon"/>
                </Link>
            )
        }
       </Container>
    )
}