import styles from './styles.module.css'

const SectionTitle = (props) => {
    const {title, subtitle, className, ...exprops} = props
    return(
        <div className={`${styles.sectionTitle} ${className? className : ''}`} {...exprops}>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
        </div>
    )
}

export default SectionTitle