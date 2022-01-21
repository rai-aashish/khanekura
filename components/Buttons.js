import styles from '../styles/components/buttons.module.scss'

export default function Buttons() {
    return (
        <div>
            
        </div>
    )
}


export function ButtonGroup({children}){
    return(
        <div className={styles['button-group']}>
            {children}
        </div>
    )
}