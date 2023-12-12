import React, {useState, useEffect} from "react";
import {Container} from '../../globalStyles/globalStyled';
import {FotoContainer} from './styled';
import axios from '../../services/axios';
import { toast } from "react-toastify";
import customHistory from '../../services/history';
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../components/loading/index';
import { get } from "lodash";

export default function FotoComponent({ match}) {

    const [foto, setFoto] = useState('');

    const id = match.params.id;

    const dispach = useDispatch();

    const load = useSelector(state => state.authReducer.Loading)

    useEffect(()=> {
        dispach({type: 'SET_LOAD'});
        axios.get(`alunos/${id}`)
        .then(r => setFoto(get(r, 'data.Pictures[0].url', '')))
        .catch(e => {
            customHistory.push('/')
            toast.error('aluno não exite...');
            console.log(e);
        })
        .finally(()=> dispach({type: 'SET_LOAD'}))
        ;
    }, [])

    function handleChange(e) {
        const foto = (e.target.files[0]);
        const urlFoto = URL.createObjectURL(foto);

        setFoto(urlFoto)  
        
        const formData = new FormData();

        formData.append('aluno_id', id);
        formData.append('foto', foto);

        dispach({type: 'SET_LOAD'})
        axios.post('pictures/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(r => {
            toast.success('foto configurada com sucesso !')
        })
        .catch(err => console.log(err))
        .finally(()=> dispach({type: 'SET_LOAD'}))
    }

    if(load) return (
        <Container>
            <h1>Carregando</h1>
            <Loading/>
        </Container>
    )

    return (
        <Container>
            <h1>FOTO</h1>

            <FotoContainer>
               <label htmlFor="foto-input">
                    {
                        foto.length > 0 ? (
                            <img src={foto} alt="foto selecionada"/>
                        )  :
                        (
                            <div className="icon">
                                <p>Selecione</p>
                            </div>
                        )
                    }
               </label>
               <input type="file" id="foto-input" onChange={handleChange}/>
            </FotoContainer>

        </Container>
    )
}