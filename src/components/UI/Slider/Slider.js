import React, {useState} from 'react'

import classes from "./Slider.module.css";

function Slider(props) {
    const [index, setIndex] = useState(0)

    const width = window.innerWidth

    let propsChildren = []
    if (props && props.children && props.children.length > 0) {
        propsChildren = props.children
    }

    let productToView
    // console.log('width is : ', width)
    if (props.styleFor === 'featured') {
        if (width > 1800) {
            productToView = propsChildren.slice(index, index + 6).map(child => {
                propsChildren.push(child)
                return child
            })
        } else if (width <= 1800 && width > 1500) {
            productToView = propsChildren.slice(index, index + 5).map(child => {
                propsChildren.push(child)
                return child
            })
        } else if (width <= 1500 && width > 1024) {
            productToView = propsChildren.slice(index, index + 4).map(child => {
                propsChildren.push(child)
                return child
            })
        } else if (width <= 1024 && width > 768) {
            productToView = propsChildren.slice(index, index + 3).map(child => {
                propsChildren.push(child)
                return child
            })
        } else if (width <= 768 && width > 480) {
            productToView = propsChildren.slice(index, index + 2).map(child => {
                propsChildren.push(child)
                return child
            })
        } else if (width <= 480) {
            productToView = propsChildren.slice(index, index + 1).map(child => {
                propsChildren.push(child)
                return child
            })
        }
    } else if(props.styleFor === 'main'){
        productToView = propsChildren.slice(index, index + 1).map(child => {
            propsChildren.push(child)
            return child
        })
    }


    const slideLeft = () => {
        {
            // console.log('in slide left : ', props)
        }
        setIndex((index + 1) % props.images.length)
    }

    const slideRight = () => {
        {
            // console.log('in slide Right : ', props)
        }
        const nextIndex = index - 1;
        if (nextIndex < 0) {
            setIndex(props.images.length - 1)
        } else {
            setIndex(nextIndex)
        }
    }

    return (
        <div className={props.styleFor === 'featured' ? classes.SlideShowContainer : classes.MainSlideShowContainer}>

            <div className={props.styleFor === 'featured' ? classes.SlideShowData : null}>
                {props.styleFor === 'main' ? <div className={classes.NumberText}>{index + 1}/{props.images.length}</div> : null}
                {productToView}
                {/*{props.styleFor === 'main' ? <div className={classes.Text}>{props.images}</div>: null}*/}
                {/*{props.styleFor === 'main' ? <div className={classes.Text}>Caption Text {index + 1}</div>: null}*/}

                {/*{propsChildren.slice(index, index + 4).map(child => {*/}
                {/*    propsChildren.push(child)*/}
                {/*    return child*/}
                {/*})}*/}
            </div>

            <button className={[classes.Prev, classes.Fade].join(' ')} onClick={slideLeft}>&#10094;</button>
            <button className={classes.Next} onClick={slideRight}>&#10095;</button>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={classes.Prev} onClick={slideRight}>&#10094;</a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={classes.Next} onClick={slideLeft}>&#10095;</a>
        </div>
    )
}

export default Slider