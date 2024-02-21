import { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from '../../assets/logo10.png';
import { useSelector } from 'react-redux'
import { authActions, selectIsLoggedIn, selectUserRoleId, selectLogout } from '../../feature/auth/auth.slice';
import Select from 'react-select'
import { faSortDown, faCircleUser, faClockRotateLeft, faUnlockKeyhole, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from 'react-redux';
import LogoutConfirmation from '../logout/Logout';
import authThunk from '../../feature/auth/auth.service';
import { PROFILE_ACTION } from '../../utils/constants';
import { profileAction } from '../../feature/profile/profile.slice';
import MediaQuery from 'react-responsive';

const Navbar = () => {

    const isLogined  = useSelector(selectIsLoggedIn)
    const userRole = useSelector(selectUserRoleId)
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const [language, setLanguage] = useState({
        'vie': true,
        'eng': false
    })
    const langBtn = useRef(null)

    const goToLogin = () => {
        navigate('/login');
    }

    const { t, i18n } = useTranslation();

    const handleTranslate = () => {
        if (language.vie === true) {
            langBtn.current.textContent = "VIE"
            setLanguage({ vie: false, eng: true })
            i18n.changeLanguage("en")
        }
        else {
            langBtn.current.textContent = "ENG"
            setLanguage({ vie: true, eng: false })
            i18n.changeLanguage("vi")
        }
    }

    const user = JSON.parse(localStorage.getItem('current_user'))
    const actionList = PROFILE_ACTION

    const handleAction = (action) => {
       
        if (action.navigate===true)
        {
            dispatch(profileAction.setActive({active: action.index}))
            navigate(`/profile/${action.name}`)
        }
        else if (action.name === 'logout')
            dispatch(authActions.confirmlogout())
    }

    const isLogout = useSelector(selectLogout)

    const handleConfirmLogout = () => {
        dispatch(authThunk.logout())
        .unwrap()
        .then(()=>{
            navigate('/')  
            window.location.reload()
        })
    };
    const handleCancelLogout = () => {
        dispatch(authActions.cancelogout())
    };
    const [validSession, setValidSession] = useState(
        JSON.parse(localStorage.getItem('validSession')),
    )
    window.addEventListener('storage', () => {
        setValidSession(JSON.parse(localStorage.getItem('validSession')))
    })
    useEffect(() => {
        if (validSession === false)
            dispatch(authActions.deleteUserInfor())
    }, [validSession])
    return (
        <>
        <div className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <img src={Logo} alt="XeKimNguyen" />
                </div>
                <div className={styles.navItems}>
                    <button className={`${styles.navButton} ${styles.langBtn}`} ref={langBtn} onClick={handleTranslate}>ENG</button>
                    {isLogined === true ?
                        (
                            <div className={styles.userOption}>
                                <div className={styles.accountName}>
                                    <FontAwesomeIcon icon={faUser} />
                                    {user && user.user?.name}
                                    <FontAwesomeIcon icon={faSortDown} />
                                </div>
                                <div className={styles.actionOption}> 
                                {actionList.filter((action) => action.roles.includes(userRole)).map(
                                    (action) => (
                                        <div className={styles.optionItem} 
                                            onClick={()=>handleAction(action)}
                                            key= {action.index}>
                                            <FontAwesomeIcon icon={action.icon} width="20px" height="20px"/>
                                            <span>{action.title}</span>
                                        </div>
                                    ))
                                }
                                </div>
                            </div> 
                        )
                        : (
                            <>
                                <MediaQuery minWidth={878}>
                                    <button className={styles.navButton} onClick={goToLogin}> {t("header.login/signup")} </button>
                                </MediaQuery>
                                    <MediaQuery maxWidth={878}>
                                    <button className={styles.navButton} onClick={goToLogin}> {t("header.login")} </button>
                                </MediaQuery>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
        {isLogout === true && (
                <LogoutConfirmation
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                    type = 'confirm'
                />
            )}
        </>
    )
}

export default Navbar
