import React, {useEffect} from 'react'

import {Redirect} from "react-router-dom";

import {LogoutService} from "../../../services/authService";

import {useStore} from "../../../hooks-store/store";

function Logout(props) {

    const dispatch = useStore(true)[1]

    useEffect(() => {
        dispatch('LOGOUT')
        localStorage.removeItem('cart')
        LogoutService()
    })

    return <Redirect to={'/'} />
}

export default Logout