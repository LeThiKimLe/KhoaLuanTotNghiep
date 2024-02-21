import styles from './styles.module.css'
import SectionTitle from '../../../../components/common/sectionTitle'
import { useTranslation } from 'react-i18next';

const PropertyList = () =>
{
    const {t, i18n} = useTranslation();
    return (
        <>
        <div className={styles.pListContainer}>
        <SectionTitle title={t("property.title")}
                    subtitle={t("property.slogan")}></SectionTitle>
            <div className={styles.pListCover}>
                <div className={styles.pList}>
                    <div className={styles.pListItem}>
                        <img src="./props1.svg" alt="" className={styles.pListImg}/>
                        <div className={styles.pListTitle}>
                            <span className={styles.property}>{t("property.list_props.0.property")}</span>
                            <span className={styles.property_field}>{t("property.list_props.0.property_field")}</span>
                            <h3 className={styles.property_desc}>{t("property.list_props.0.property_desc")}</h3>
                        </div>
                    </div>
                    <div className={styles.pListItem}>
                        <img src="./props2.svg" alt="" className={styles.pListImg}/>
                        <div className={styles.pListTitle}>
                            <span className={styles.property}>{t("property.list_props.1.property")}</span>
                            <span className={styles.property_field}>{t("property.list_props.1.property_field")}</span>
                            <h3 className={styles.property_desc}>{t("property.list_props.1.property_desc")}</h3>
                        </div>
                    </div>
                    <div className={styles.pListItem}>
                        <img src="./props3.svg" alt="" className={styles.pListImg}/>
                        <div className={styles.pListTitle}>
                            <span className={styles.property}>{t("property.list_props.2.property")}</span>
                            <span className={styles.property_field}>{t("property.list_props.2.property_field")}</span>
                            <h3 className={styles.property_desc}>{t("property.list_props.2.property_desc")}</h3>
                        </div>
                    </div>
                </div>
                <div className={styles.pListMainImg}>
                    <img src="pic.svg" alt="" />
                </div>
            </div>
        </div>
        </>
    )
}

export default PropertyList