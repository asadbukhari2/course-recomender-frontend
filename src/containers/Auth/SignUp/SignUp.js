import React, {useEffect, useRef, useState} from 'react'

import classes from "./SignUp.module.css";

import {NavLink, useHistory} from "react-router-dom";
import {formElements, InputChangeHandler} from "../../../shared/utility";
import {Register} from "../../../services/authService";
import {getCurrentUser} from "../../../services/authService";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";

import {useStore} from "../../../hooks-store/store";
import {SubmitOrder} from "../../../services/orderServices";

function SignUp(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [is_active, setIsActive] = useState(true)
    const [contact, setContact] = useState('')
    const [city, setCity] = useState('')

    const [loading, setLoading] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const [signUpForm, setSignUpForm] = useState({
        first_name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First Name',
                label: 'First Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        last_name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name',
                label: 'Last Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'bigInput',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                label: 'E-Mail'
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
        },
        password2: {
            elementType: 'bigInput',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm Password',
                label: 'Confirm Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false
        },
        // is_active: true,
        contact_no: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Phone',
                label: 'Contact #'
            },
            value: '',
            validation: {
                required: true,
                minLength: 11,
                maxLength: 25,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        city_name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City',
                label: 'City'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    })

    const state = useStore()[0]
    const dispatch = useStore()[1]

    const history = useHistory()

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

    const signUpHandler = (e) => {
        e.preventDefault()

        const user = {
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'password': password,
            'password2': password2,
            'is_active': is_active
        }
        Register(user, contact, city)
            .then((response) => {
                    if (_Mounted.current) {
                        console.log('Response on Registration : ', response)

                        // const token = getCurrentUser().token
                        // const user = getCurrentUser().decodeUser
                        dispatch('AUTH_START')

                    }
                    history.push('/')
                    window.location.reload()
                }
            )
            .catch((error) => {
                console.log('Register Catch Response is : ', error)
            })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedValues = InputChangeHandler(event, inputIdentifier, signUpForm)
        setSignUpForm(updatedValues.updatedForm)

        setFirstName(signUpForm.first_name.value)
        setLastName(signUpForm.last_name.value)
        setEmail(signUpForm.email.value)
        setPassword(signUpForm.password.value)
        setPassword2(signUpForm.password2.value)
        setContact(signUpForm.contact_no.value)
        setCity(signUpForm.city_name.value)

        setFormIsValid(updatedValues.formIsValid)
    }

    const formElementsArray = formElements(signUpForm)

    let form = (
        <form className={classes.SignUpForm} onSubmit={signUpHandler}>
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
            <div className={classes.SignUpButtons}>
                {/*<div onClick={toggleOrderHandler}>*/}
                <div>
                    {/*{console.log('user token and id : ', currentUser.decodeUser, ' now ...', currentUser.token)}*/}
                    <Button btnType={'ButtonGhost'}
                        // dispatchAction={'AUTH_START'}
                        // dispatchValue={currentUser.token}
                        // dispatchValueSecond={currentUser.decodeUser}
                    >
                        Sign Up
                    </Button>
                    {/*{console.log('none of now global state is : ', state)}*/}
                </div>
                <div>
                    <NavLink
                        exact={props.exact}
                        to={'/auth'}
                    >
                        <Button btnType={'ButtonGhost'}>
                            Log In
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
        <section className={classes.SignUpSection}>
            <h2>Sign Up</h2>
            {form}

        </section>
    )
}

export default SignUp