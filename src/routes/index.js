import React from 'react'
import {Switch} from 'react-router-dom'
import MyRoute from './myRoute'

// components
import Login from '../pages/login'
import NotFound from '../pages/notFound'
import Alunos from '../pages/alunos'
import Register from '../pages/register'
import EditAluno from '../pages/alunoEdit'
import FotoComponent from '../pages/foto'

export default function Routes() {
    return(
        <Switch>
            <MyRoute path='/login' component={Login} exact/>
            <MyRoute path='/' component={Alunos} exact/>
            <MyRoute path='/register' component={Register}/>
            <MyRoute path='/aluno/:id/edit' component={EditAluno} isClosed/>
            <MyRoute path={'/foto/:id'} component={FotoComponent} isClosed/>
            <MyRoute path='*' component={NotFound}/>
        </Switch>
    )
}