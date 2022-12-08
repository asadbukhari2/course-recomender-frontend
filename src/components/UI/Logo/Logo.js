import React from 'react'

import CRLogo from '../../../assets/images/logo-icon-black.png'

import classes from './Logo.module.css'

function Logo(props) {
    return (
        <div className={classes.Logo}>
            <a href={'/'}>
                <h3 className={classes.LogoText}><img src={CRLogo} alt={"JC Logo"} className={classes.LogoImg}/>&nbsp;Course Recommender</h3>
            </a>
        </div>
    )
}

export default Logo