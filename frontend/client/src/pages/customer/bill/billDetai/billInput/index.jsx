import styles from './styles.module.css'

const BillInput = ({infor}) => {
    return (
        <div className={styles.container}>
            <span>{infor}</span>
        </div>
    )
}

export default BillInput