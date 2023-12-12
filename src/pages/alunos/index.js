import React, {useState, useEffect} from "react";
import {Container} from '../../globalStyles/globalStyled';
import { AlunoContainer, AddAluno } from "./styled";
import axios from '../../services/axios';
import {get} from 'lodash';
import { BsPersonCircle } from "react-icons/bs";
import { IoAlertSharp, IoAddCircleOutline  } from "react-icons/io5";
import {FaWindowClose, FaEdit} from 'react-icons/fa';
import Loading from '../../components/loading/index';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

export default function Alunos() {
    const [alunos, setAlunos]  = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
       async function getAlunos() {
        try{
            setLoad(true);
            const response = (await axios.get('/alunos/')).data;
            console.log(response[3].Pictures[0].url)
            return response;
        }catch(e) {
            console.log(e);
        }finally{
            setLoad(false);
        }
       }

       getAlunos().then(r => setAlunos(r))
    }, []);

    function handleShowAlert(e) {
        const alertIcon = e.currentTarget.nextSibling;

        alertIcon.setAttribute('display', 'block');
        e.currentTarget.remove()
    }

    async function handleDeleteTask(e, id) {
        try{
            setLoad(true)
            e.persist()
            await axios.delete(`alunos/${id}`)

            const newAlunos = alunos.filter(al => {
                if(al.id === id) {
                    return false;
                }
                return true;
            });
            setAlunos([...newAlunos])

        }catch(e) {
            const msg = get(e, 'response.data', null);
            toast.error(msg);
        }finally{
            setLoad(false);
        }
    }

    if(load) return (
        <Container>
            <h1>Carregando</h1>
            <Loading/>
        </Container>
    )   
    
    if(alunos) return( 
        <Container>
            <h1>Alunos</h1>   
            
            
            <AddAluno>
                <Link to='/aluno/new/edit'>
                    <IoAddCircleOutline size={20}/>
                    <p>Adicionar novo Aluno</p>
                </Link>
            </AddAluno>

            {alunos.map(aluno => (
                <AlunoContainer key={aluno.id}>
                    {get(aluno, 'Pictures[0]', null) ? 
                    (<img src={aluno.Pictures[0].url}/>):
                    (<BsPersonCircle size={40}/>)
                    }

                    <span>{aluno.nome}</span>
                    <span>{aluno.email}</span>

                    <div className="icons">
                        <Link to={`/aluno/${aluno.id}/edit`}>
                            <FaEdit className="icon"/>
                        </Link>
                        <FaWindowClose className="icon" onClick={handleShowAlert}/>
                        <IoAlertSharp 
                            size={20} 
                            className="icon" 
                            color="black" 
                            display={'none'}
                            onClick={e => {handleDeleteTask(e, aluno.id)}}
                        />
                    </div>
                </AlunoContainer>
            ))}
        </Container>
    )
}