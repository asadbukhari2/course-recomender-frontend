import React from 'react'

import classes from './Input.module.css'


function Input(props) {
    let inputElement = null
    let styleClass = null
    let invalidMessage = ''
    const inputClasses = [classes.InputElement]
    const bigInputClasses = [classes.BigInputElement]
    const textAreaClasses = [classes.TextAreaElement]
    const selectClasses = [classes.SelectElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        bigInputClasses.push(classes.Invalid)
        textAreaClasses.push(classes.Invalid)
        selectClasses.push(classes.Invalid)
        invalidMessage = ("fill this field")
        // invalidMessage = (<span>Fill this field</span>)
    }

    if (props.touched) {
        if (!props.value) {
            invalidMessage = ("required")
        } else if (props.touched && props.invalid) {
            invalidMessage = ("invalid")
        }
    }

    switch (props.elementType) {
        case ('searchInput'):
            styleClass = classes.SearchInput
            // styleClass = classes.SearchInputElement
            inputElement = (
                <input
                    placeholder={props.label}
                    className={classes.SearchInputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            )
            break
        case ('bigInput'):
            styleClass = classes.BigInput
            inputElement = (
                <input
                    placeholder={props.label}
                    className={bigInputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            )
            break
        case ('textarea'):
            styleClass = classes.TextAreaInput
            inputElement = (
                <textarea
                    placeholder={props.label}
                    className={textAreaClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            )
            break
        case ('select'):
            styleClass = classes.SelectInput
            inputElement = (
                <select
                    className={selectClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>)
            break
        case ('searchSelect'):
            styleClass = classes.SearchSelect
            // styleClass = classes.SearchSelectElement
            inputElement = (
                <select
                    // className={selectClasses.join(' ')}
                    className={classes.SearchSelectElement}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>)
            break
        default:
            styleClass = classes.Input
            inputElement = (
                <input
                    placeholder={props.label}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            )
    }
    return (
        <div className={styleClass}>
            <label>{props.label}</label>
            {inputElement}
            <div className={classes.InvalidMessage}>
                <span>{invalidMessage}</span>
            </div>
        </div>
    )
}

export default Input