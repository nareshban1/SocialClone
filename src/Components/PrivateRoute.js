import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../context/AuthContext'



function PrivateRoute({ component: Component, ...rest}) {
    const {currentUser} = useAuth()
    return (
        <Route {...rest} render={props => { return currentUser ? <component {...props}/> : <Redirect to="/"/>
        }}>

        </Route>
    )               
}

export default PrivateRoute
