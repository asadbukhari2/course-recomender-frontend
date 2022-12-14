import React, {useState, useEffect, useRef} from 'react'

import classes from './SignIn.module.css'

import {NavLink, useHistory} from "react-router-dom";

import {Login, getCurrentUser, FetchLogedInUser} from "../../../services/authService";
import {InputChangeHandler, formElements} from "../../../shared/utility";
import {useStore} from "../../../hooks-store/store";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {SubmitOrder} from "../../../services/orderServices";


// function SignIn(props) {
const SignIn = React.memo(props => {
    /*----State Section----*/
    // Local State Management Section
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [loginAs, setLoginAs] = useState('customer')
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'bigInput',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                label: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'bigInput',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
                label: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false
        }
    })

    // eslint-disable-next-line no-unused-vars
    const [formIsValid, setFormIsValid] = useState(false)

    const state = useStore()[0]
    const dispatch = useStore()[1]

    // Current User
    const currentUser = getCurrentUser()

    const _Mounted = useRef(true)
    const _Order = useRef(false)

    useEffect(() => {
        return () => {
            if (_Order.current) {
                dispatch('EMPTY_CART')
                // dispatch('SUBMIT_ORDER_END')
            }
            _Mounted.current = false
        }
    }, [])

    // Routing History
    const history = useHistory()

    /*----Logical Section----*/

    const loginHandler = (e) => {
        e.preventDefault()

        setUsername(loginForm.email.value)
        setPassword(loginForm.password.value)

        // Login(loginForm.email.value, loginForm.password.value, 'customer')
        Login(loginForm.email.value, loginForm.password.value)
            .then((response) => {
                if (_Mounted.current) {
                    if (response) {
                        dispatch('AUTH_START')

                        // FetchLogedInUser(getCurrentUser().decodeUser.user_id)
                        //     .then((response) => {
                        //         // dispatch('FETCH_USER', response)
                        //         console.log('fetched LoginIn user in App.js Is : ', response)
                        //         history.push('/')
                        //         window.location.reload()
                        //     })

                        console.log('before window.location.reload in SignIn.js')
                        history.push('/')
                        window.location.reload()
                    }
                }
            })
            .catch((error) => {
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()

                setLoading(false)
                setMessage(resMessage)
            })
    }


    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedValues = InputChangeHandler(event, inputIdentifier, loginForm)
        setLoginForm(updatedValues.updatedForm)
        setFormIsValid(updatedValues.formIsValid)
    }

    const formElementsArray = formElements(loginForm)


    let form = (
        <form className={classes.SignInForm} onSubmit={loginHandler}>
            {formElementsArray.map(formElement => (
                // <Aux>
                //     <label>{formElement.config.elementConfig.placeholder}</label>
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    label={formElement.config.elementConfig.label}
                />
                // </Aux>
            ))}
            <div className={classes.SignInButtons}>
                <div>
                    <Button btnType={'ButtonGhost'}
                            dispatchAction={'AUTH'}
                            dispatchValue={currentUser.token}
                    >
                        Log In
                    </Button>
                </div>
                <div>
                    <NavLink
                        // exact={props.exact}
                        to={'/sign_up'}
                    >
                        <Button btnType={'ButtonGhost'}>
                            Sign Up
                        </Button>
                    </NavLink>
                </div>
            </div>
        </form>
    )

    if (loading) {
        form = <Spinner/>
    }

    return (
        <section className={classes.SignInSection}>
            <h2>Log In</h2>
            {form}

        </section>
    )
})
// }

export default SignIn