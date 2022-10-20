import React from 'react';
import styles from '../LadingPage/LadingPage.module.css';
import {Link} from 'react-router-dom';

export const LadingPage=()=>{
    return(
        <div className={styles.container}>
            <div className={styles.subcontainer}>
                <h1>Bienvenido a la APP FOOD!!</h1>
                <p>"Una receta no tiene alma, es el cocinero quien debe darle alma a la receta."</p>
                <div className={styles.iniciar}>
                <Link to="/home"><span className={styles.spaniniciar}>INICIAR</span></Link>
                </div>
            </div>
            <div className={styles.forma1}></div>
            <div className={styles.forma2}>

            </div>
        </div>
    )
}

