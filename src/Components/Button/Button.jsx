import styles from "./Button.module.css"

const Button = ({children, type, onClick}) => {
    return (<button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>)
}

export default Button
