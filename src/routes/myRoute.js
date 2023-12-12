import React from "react";
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';

export default function MyRoute({path, component, isClosed, ...rest}) {
    const isLogged = useSelector(state => state.authReducer.isLogged);

    if(isClosed && !isLogged) {
        toast.error('faça login para continuar...', {toastId: 'toastId'})
        return <Redirect to='/login/'/>
    }
    return <Route path={path} component={component} {...rest}/>
}

MyRoute.defaultProps = {
    isClosed: false
}

MyRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.element], [PropTypes.func]).isRequired,
    isClosed: PropTypes.bool
}