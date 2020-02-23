import React from 'react'
import styles from './note.module.css'

export const Note = ({ children }) => {
    return (
        <div className={ styles.note }>
            { children }
        </div>
    )
}
