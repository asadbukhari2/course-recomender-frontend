import React from 'react';

import classes from './Modal.module.css'
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../BackDrop/Backdrop";


function Modal(props) {
    return (
        <Aux>
            <Backdrop
                show={props.show}
                clicked={props.modalClosed}
            />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                <div className={classes.ModalContent}>
                    {props.children}
                </div>
            </div>
        </Aux>
    )
}

export default React.memo(Modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);