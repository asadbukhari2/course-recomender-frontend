import React from 'react'

import classes from './Course.module.css'

import {useStore} from "../../../hooks-store/store";

import BagSVG from "../../../hoc/SVGIcons/BagSVG";
import Aux from "../../../hoc/Aux/Aux";

function Course(props) {

    const dispatch = useStore()[1]
    const state = useStore()[0]


    const toggleCartHandler = () => {

        if (state.cart.items.length > 0) {
            state.cart.items.filter(item => item.id === props.fItem.id).map(filterItem => {
                if (localStorage.getItem('cart')) {
                    localStorage.removeItem('cart')
                }
                dispatch('ADDITION_CART', props.fItem)
                alert('Added to Cart Successfully!')
                localStorage.setItem('cart', JSON.stringify(state.cart.items))
            })

            if (!(state.cart.items.filter(item => item.id === props.fItem.id).length > 0)) {
                if (localStorage.getItem('cart')) {
                    localStorage.removeItem('cart')
                }
                dispatch('ADD_CART', props.fItem)
                alert('Added to Cart Successfully!')
                localStorage.setItem('cart', JSON.stringify(state.cart.items))
            }

        } else {
            if (localStorage.getItem('cart')) {
                localStorage.removeItem('cart')
            }
            dispatch('INITIATING_CART', props.fItem)
            alert('Added to Cart Successfully!')
            localStorage.setItem('cart', JSON.stringify(state.cart.items))
        }

    }


    console.log('pops in course component before return : ', props)

    return (
        <Aux>
            <div className={classes.Container}>
                <img
                    className={classes.Image}
                    src={props.fItem.photo} alt={'Featured Item'}
                />
                {/*</NavLink>*/}
                <div className={classes.Middle}>
                    <div className={classes.ToolTip} onClick={toggleCartHandler}>
                        <span className={classes.ToolTipText}>Add to Cart</span>
                        <BagSVG
                            name={'bag'}
                            fill={'transparent'}
                            width={35}
                            className={props.fItem.sku > 0 ? classes.BagSVG : classes.BagSVGNotAllowed}
                        />
                    </div>
                </div>

                <div className={classes.Rating}>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9734;</span>
                </div>

                <div className={classes.DetailView}>
                    <div className={classes.Price}>
                        <span>Rs:{Math.floor(props.fItem.price)}</span>
                    </div>

                </div>

            </div>
        </Aux>
    )
}

export default React.memo(Course)