import React, {useState} from "react";
import { Form } from '../register/styled';
import { Container } from "../../globalStyles/globalStyled";
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../store/modules/auth/actions';
import Loading from '../../components/loading/index';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const dispach = useDispatch();

    const load = useSelector(state => state.authReducer.Loading);

    function handleSubmit(e) {
        e.preventDefault();

        dispach(loginRequest({email, password}));
    }

    

    if(load) return (
        <Container>
            <h1>Carregando</h1>
            <Loading/>
        </Container>
    )

    return(
        <Container>
            <h1>Login</h1>
            <Form method="post" onSubmit={handleSubmit}>
                <label htmlFor="input-log-email">Email</label>
                <input 
                    type="email" 
                    id="input-log-email" 
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="input-log-password">Password</label>
                <input 
                    type="password" 
                    id="input-log-password"
                    onChange={e => setPass(e.target.value)}
                />

                <button>Entrar</button>
            </Form>
        </Container>
    )
}