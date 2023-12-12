import React, {useState, useEffect} from "react";
import {Container} from '../../globalStyles/globalStyled';
import { Form } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/modules/register/actions';
import { loginFailure } from "../../store/modules/auth/actions";
import {updateUser} from '../../store/modules/auth/actions';
import Loading from '../../components/loading/index'
import axios from "../../services/axios";
import { toast } from "react-toastify";
import customHistory from '../../services/history';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const dispach = useDispatch();

    const load = useSelector(state => state.authReducer.Loading);

    const authState = useSelector(state => state.authReducer);

    useEffect(()=> {
        if(authState.isLogged) {

            setNome( authState.user.data.nome);
            setEmail( authState.user.data.email );
            setpassword( authState.user.data.password )
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        if(authState.isLogged) {
            dispach(updateUser({
                nome, 
                password, 
                email, 
                id: authState.user.data.id
            }))
            return;
        }

        dispach(actions.registerUser({nome, email, password}))
    }

    const handleConfirmExclude = e => {
        const confirm = (e.target.nextSibling);

        confirm.classList.toggle('display-none')
    }

    const handleDeleteUser = (e, id) => {
        axios.delete(`users/${id}`)
        .then(r => {
            dispach(loginFailure());

            customHistory.push('/login');
            toast.info('conta excluída !');

            setNome('');
            setEmail('');
            setpassword('');
        })
        .catch(err => {
            toast.error('algo deu  errado');
            e.target.parentElement.parentElement.classList.toggle('display-none');
            console.log(err)
        })
    }

    if(load) return (
        <Container>
            <h1>Loading</h1>
            <Loading/>
        </Container>
    )

    return (
        <Container>
            <h1>{authState.isLogged ? 'Editar' : 'Register'}</h1>

            <Form method="post" onSubmit={handleSubmit}>
                <label htmlFor="nome-id">Nome</label>
                <input 
                    type="text" 
                    id="nome-id" 
                    onChange={e => setNome(e.target.value)}
                    value={nome}
                />

                <label htmlFor="email-id">Email</label>
                <input 
                    type="email"
                    id="email-id"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />

                <label htmlFor="pass-id">password</label>
                <input 
                    type="password" 
                    id="pass-id"
                    onChange={e => setpassword(e.target.value)}
                    value={password}
                />

                <button type="submit">{authState.isLogged ? 'editar' : 'cadastrar'}</button>

                {authState.isLogged ? (
                    <button 
                    type="button"
                        className="btn-exclude-acount" 
                        onClick={handleConfirmExclude}>
                            Excluir conta
                    </button>
                ): <></>}

                <div className="delete-count-container display-none">
                    <div>
                        <p>Are you Sure ?</p>
                        <small>your account will be deleted forever</small>
                        <button type="button" className="btn-no" onClick={e => {
                            e.target.parentElement.parentElement.classList.toggle('display-none')
                        }}>No</button>
                        <button type="button" onClick={e => handleDeleteUser(e, authState.user.data.id)}>Yes</button>
                    </div>
                </div>
            </Form>
        </Container>
    )
}