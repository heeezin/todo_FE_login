import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({user,children}) {
    return (
        user? children: <Navigate to="/login"/>
    )
}
//유저 값이 있으면? 투두: Redirect to /login