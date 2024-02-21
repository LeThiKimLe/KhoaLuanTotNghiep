import styles from './styles.module.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { authActions, selectUserRoleId, selectUser, selectLoading, selectMessage, selectError } from '../../../../feature/auth/auth.slice'
import { GENDER_OPTION, UPDATE_INFOR } from '../../../../utils/constants'
import { useEffect, useState } from 'react'
import male from '../../../../assets/male.svg'
import female from '../../../../assets/female.svg'
import FormInput from '../../../../components/common/formInput'
import Button, { OptionButton } from '../../../../components/common/button'
import { useDispatch } from 'react-redux'
import Message from '../../../../components/message'
import authThunk from '../../../../feature/auth/auth.service'

const ProfileInfor = () => {

    const dispatch = useDispatch()
    const userRole = useSelector(selectUserRoleId)
    const user = useSelector(selectUser)
    const message = useSelector(selectMessage)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const [updated, setUpdated] = useState(false)

    const [file, setFile] = useState(undefined)
    const handleUpImage = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setValueInfor({ ...valueInfor, file: e.target.files[0] })
        setUpdated(true)
    }

    const [isUpdating, setIsUpdating] = useState(false)

    const [valueInfor, setValueInfor] = useState(
        user ? ({
            tel: user.user.tel,
            name: user.user.name,
            email: user.user.email,
            gender: (user.user.gender === "true" ?
                GENDER_OPTION[0] :
                GENDER_OPTION[1]),
            idCard: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.idCard
                    : user.user.driver.idCard)
                : ('12345678909')),
            address: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.address
                    : user.user.driver.address)
                : ('123 Phan Boi Chau')),
            beginWorkDate: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.beginWorkDate
                    : user.user.driver.beginWorkDate)
                : ('09-09-2023')),
            licenseNumber: (userRole < 4 ? '' : user.user.driver.licenseNumber),
            issueDate: (userRole < 4 ? '' : user.user.driver.issueDate),
            img: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.img
                    : user.user.driver.img)
                : (user.user.customer.img)),
            file: undefined
        }) :
            (
                {
                    tel: '', name: '',
                    email: '', gender: GENDER_OPTION[0],
                    idCard: '', address: '',
                    beginWorkDate: '',
                    licenseNumber: '',
                    issueDate: '',
                    img: '',
                    file: undefined
                }
            )
    )

    const handleResetInfor = (e) => {
        e.preventDefault()
        setValueInfor({
            tel: user.user.tel,
            name: user.user.name,
            email: user.user.email,
            gender: (user.user.gender === "true" ?
                GENDER_OPTION[0] :
                GENDER_OPTION[1]),
            idCard: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.idCard
                    : user.user.driver.idCard)
                : ('12345678909')),
            address: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.address
                    : user.user.driver.address)
                : ('123 Phan Boi Chau')),
            beginWorkDate: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.beginWorkDate
                    : user.user.driver.beginWorkDate)
                : ('09-09-2023')),
            licenseNumber: (userRole < 4 ? '' : user.user.driver.licenseNumber),
            issueDate: (userRole < 4 ? '' : user.user.driver.issueDate),
            img: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.img
                    : user.user.driver.img)
                : (user.user.customer.img)),
        })
        setIsUpdating(false)
        setFile(undefined)
        setUpdated(false)
    }

    const userInfor = UPDATE_INFOR

    const onChangeInfor = (e) => {
        if (updated === false)
            setUpdated(true)
        setValueInfor({ ...valueInfor, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (isUpdating) {
            if (updated == true) {
                dispatch(authThunk.updateProfile({ updatedInfor: valueInfor }))
                    .unwrap()
                    .then(() => {
                        setIsUpdating(false)
                        setUpdated(false)
                        setFile(undefined)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                setIsUpdating(false)
                setUpdated(false)
            }
        }
        else {
            setIsUpdating(true)
        }
    }

    useEffect(() => {
        if (message !== '') {
            const timer = setTimeout(() => {
                dispatch(authActions.reset());
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message])

    useEffect(()=> {
        setValueInfor({
            tel: user.user.tel,
            name: user.user.name,
            email: user.user.email,
            gender: (user.user.gender === "true" ?
                GENDER_OPTION[0] :
                GENDER_OPTION[1]),
            idCard: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.idCard
                    : user.user.driver.idCard)
                : ('12345678909')),
            address: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.address
                    : user.user.driver.address)
                : ('123 Phan Boi Chau')),
            beginWorkDate: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.beginWorkDate
                    : user.user.driver.beginWorkDate)
                : ('09-09-2023')),
            licenseNumber: (userRole < 4 ? '' : user.user.driver.licenseNumber),
            issueDate: (userRole < 4 ? '' : user.user.driver.issueDate),
            img: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.img
                    : user.user.driver.img)
                : (user.user.customer.img)),
        })
    }, [user])

    useEffect(() => {
        dispatch(authActions.reset())
        return () => {
            dispatch(authActions.reset())
        };
    }, [])
    
    return (
        <div>
            {message !== '' && <Message message={message} messagetype={error ? 2 : 1} />}
            <Container fluid>
                <Row>
                    <Col md={4}>
                        <div className={styles.userIcon}>
                            <img src={file ? file
                                : (valueInfor.img && valueInfor.img!=="" ? valueInfor.img
                                    : valueInfor.gender.value === 1 ? female
                                        : male)} alt="User ICon" />
                            {isUpdating &&
                                <input type="file" onChange={handleUpImage} name='myImage' style={{ width: '100%' }}></input>}
                        </div>
                    </Col>
                    <Col md={8}>
                        <form action="" className={styles.inforForm} onSubmit={handleUpdate}>
                            {userInfor.filter((infor) => infor.role.includes(userRole))
                                .map((infor) => (
                                    <FormInput key={infor.id} {...infor}
                                        value={valueInfor[infor.name]}
                                        onChange={onChangeInfor}
                                        readOnly={isUpdating === false ? true : infor.editable.includes(userRole)}
                                    >
                                    </FormInput>
                                )
                                )
                            }
                            <div className={styles.btnGroup}>
                                <Button text={isUpdating ? "Lưu thông tin" : "Cập nhật"}
                                    className={styles.updateBtn}
                                    loading={loading}
                                >
                                </Button>
                                {isUpdating &&
                                    <OptionButton text='Hủy' onClick={handleResetInfor} className={styles.updateBtn}></OptionButton>}
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfileInfor