import React, {useState, useEffect} from "react";
import {Container} from '../../globalStyles/globalStyled';
import {Form} from '../../pages/register/styled';
import axios from '../../services/axios';
import { toast } from "react-toastify";
import {isEmail} from 'validator';
import Loading from '../../components/loading/index';
import { useSelector, useDispatch } from "react-redux";
import customHistory from '../../services/history';
import { get } from "lodash";
import {FotoContainer} from './styled';
import { BsPersonCircle } from "react-icons/bs";
import {FaEdit} from 'react-icons/fa';
import { Link } from "react-router-dom";


export default function EditAluno(props) {

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [foto, setFoto] = useState([]);

    const {id} = props.match.params;

    const dispach = useDispatch();
    const load = useSelector(state => state.authReducer.Loading);

    useEffect(()=>{
        if(id !== 'new') {
            dispach({type: 'SET_LOAD'});
            axios.get(`alunos/${id}`)
            .then(r => {
                const data = r.data;

                console.log(data.Pictures)

                setNome(data.nome);
                setSobrenome(data.sobrenome);
                setEmail(data.email);
                setIdade(data.idade);
                setAltura(data.altura);
                setPeso(data.peso);
                setFoto(data.Pictures);
            })
            .catch(e => {
                if(e.response.status === 404) {
                    customHistory.push('/');
                    toast.error('aluno não encontrado...');
                }
            })
            .finally(()=> dispach({type: 'SET_LOAD'}));
        }
    }, [])

    async function consumApi(method, url) {
        try{
            await axios[method](url, {
                nome, 
                sobrenome, 
                email, 
                idade, 
                altura, 
                peso
            });

            toast.success('deu certo !')
        }catch(e) {
            console.log(e);
            const erros = get(e, 'response.data', []);
            erros.map(err => toast.error(err));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let flag = true;

        if(nome.length < 3 || nome.length > 15) {
            toast.error('nome deve conter entre 3 a 15 caracteres');
            flag = false;
        }
        if(sobrenome.length < 3 || sobrenome.length > 15) {
            toast.error('sobrenome deve conter entre 3 a 15 caracteres');
            flag = false;
        }
        if(!isEmail(email)) {
            toast.error('formato de email invalido !');
            flag = false;
        }
        if(!altura || altura.length > 3) {
            toast.error('campo altura deve conter entre 1 a 3 caracteres');
            flag = false;
        }
        if(!peso || peso.length > 3) {
            toast.error('campo peso deve conter entre 1 a 3 caracteres');
            flag = false;
        }

        if(!flag) return;

        if(id === 'new') {
            await consumApi('post', 'alunos/');
            customHistory.push('/')

        }else {
            await consumApi('put', `alunos/${id}`);
        }
    }

    if(load) return (
        <Container>
            <h1>Carregando</h1>
            <Loading/>
        </Container>
    )

    return(
        <Container>
            <h1>{id === 'new' ? 'Criar Aluno': 'Editar aluno'}</h1>

            {id === 'new' ? (
                <></>
            )
            :
            (
                <FotoContainer>
                    {foto.length > 0 ? (
                        <img src={foto[0].url} alt="foto do aluno"/>
                    ):
                    (   
                        <BsPersonCircle size={150}/>
                    )
                    }
                    <Link to={`/foto/${id}`}>
                        <FaEdit className="icon"/>
                    </Link>
                </FotoContainer>
            )}

            <Form method="post" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="sobrenome"
                    value={sobrenome}
                    onChange={e => setSobrenome(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="idade"
                    value={idade}
                    onChange={e => setIdade(e.target.value)}    
                />
                <input 
                    type="number" 
                    placeholder="altura"
                    value={altura}
                    onChange={e => setAltura(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="peso"
                    value={peso}
                    onChange={e => setPeso(e.target.value)}
                />

                <button>{id === 'new' ? 'criar Aluno' : 'editar aluno'}</button>
            </Form>
        </Container>
    )
}