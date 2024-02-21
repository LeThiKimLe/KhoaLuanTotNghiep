import styles from './styles.module.css'

const Loading = ({scale}) => {
    return(
        <div className={styles['loading-container']}>
                <img src="./bus1_2x.gif" alt="Example GIF" style={{transform: scale ? `scale(${scale})` : 'scale(1)'}}/>
        </div>
    )
}

export default Loading