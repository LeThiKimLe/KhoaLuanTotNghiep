import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectUserRoleId, selectUser, selectLoading, selectMessage, selectError } from '../../../feature/auth/auth.slice'
import { PROFILE_ACTION, GENDER_OPTION, UPDATE_INFOR } from '../../../utils/constants'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from 'react'
import male from '../../../assets/male.svg'
import female from '../../../assets/female.svg'
import FormInput from '../../../components/common/formInput'
import Button, { OptionButton } from '../../../components/common/button'
import { useNavigate } from 'react-router-dom'
import { selectActive } from '../../../feature/profile/profile.slice'
import { profileAction } from '../../../feature/profile/profile.slice'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../feature/auth/auth.slice'
import TicketHistory from './TicketHistory'
import ProfileInfor from './ProfileInfor'
import ResetPassword from './ResetPass'
import LogoutConfirmation from '../../../components/logout/Logout'

const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const actionList = PROFILE_ACTION
    const userRole = useSelector(selectUserRoleId)
    const user = useSelector(selectUser)
    const active = useSelector(selectActive)

    const handleAction = (action) => {
        dispatch(profileAction.setActive({ active: action.index }))
        navigate(`/profile/${action.name}`)
    }

    const [validSession, setValidSession] = useState(
        JSON.parse(localStorage.getItem('validSession')),
    )
    const [confirm, setConfirm] = useState(false)
    const handleLogout = () => {
        dispatch(authActions.deleteUserInfor())
    }
    window.addEventListener('storage', () => {
        setValidSession(JSON.parse(localStorage.getItem('validSession')))
    })
    useEffect(() => {
        return () => {
            dispatch(authActions.reset());
        };
    }, [])

    if (validSession)
    return (
        <div>
            <Navbar></Navbar>
            <Header type="list" />
            <div className={styles.profile_container}>
                <div className={styles.profile_wrapper}>
                    <Container fluid>
                        <Row lg={12} md={12} xs={12}>
                            <Col lg={3} className={`d-none d-lg-block ${styles.navBar}`}>
                                {actionList.filter((action) => action.roles.includes(userRole)).map(
                                    (action) => (
                                        <div className={`${styles.navItem} ${action.index === active ? styles.active : ''}`}
                                            onClick={() => handleAction(action)}
                                            key={action.index}>
                                            <FontAwesomeIcon icon={action.icon} width="20px" height="20px" />
                                            <span>{action.title}</span>
                                        </div>
                                    ))
                                }
                            </Col>
                            <Col lg={9} md={12} className={styles.navContent}>
                                <div className={styles.actionTitle}>
                                    <h1>{actionList[active - 1].title}</h1>
                                    <h3>{actionList[active - 1].subDescription}</h3>
                                </div>
                                <div className={styles.actionContent}>
                                    {
                                        actionList[active - 1].name === 'account-infor' && (
                                            <ProfileInfor></ProfileInfor>
                                        )
                                    }
                                    {actionList[active - 1].name === 'ticket-history' && (
                                        <TicketHistory></TicketHistory>
                                    )
                                    }
                                    {actionList[active - 1].name === 'change-password' && (
                                        <ResetPassword></ResetPassword>
                                    )
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
    else {
        if (confirm === false)
            return (
                <LogoutConfirmation
                    type="interupt"
                    onConfirm={handleLogout}
                ></LogoutConfirmation>
            )
    }
}
export default Profile