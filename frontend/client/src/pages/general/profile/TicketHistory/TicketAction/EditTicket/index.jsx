import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Button, { OptionButton } from '../../../../../../components/common/button'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTicket, selectProcess } from '../../../../../../feature/ticket/ticket.slice'
import { useDispatch } from 'react-redux'
import { ticketAction } from '../../../../../../feature/ticket/ticket.slice'
import { convertToDisplayDate } from '../../../../../../utils/unitUtils'
import ticketThunk from '../../../../../../feature/ticket/ticket.service'
import { selectLoading, selectModifiedTrip } from '../../../../../../feature/ticket/ticket.slice'
import bookingThunk from '../../../../../../feature/booking/booking.service'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { selectRearchResult } from '../../../../../../feature/search/search.slice'
import { parse, format } from 'date-fns'
import searchThunk from '../../../../../../feature/search/search.service'
import { tripActions } from '../../../../../../feature/trip/trip.slice'
import PickLocation from '../../../../../customer/trip/pickLocation'
import './custom.css'

const EditTicket = ({ close }) => {
    const [confirm, setConfirm] = useState(false)
    const process = useSelector(selectProcess)
    const [error, setError] = useState(false)
    const currrentTickets = useSelector(selectCurrentTicket)
    const [message, setMessage] = useState('')
    const loading = useSelector(selectLoading)
    const [departDate, setdepartDate] = useState(parse(currrentTickets.tickets[0].schedule.departDate, 'yyyy-MM-dd', new Date()))
    const [pickLocation, setPickLocation] = useState(currrentTickets.pickStation)
    const [dropLocation, setDropLocation] = useState(currrentTickets.dropStation)
    const dispatch = useDispatch()
    const currentTrip = useSelector(selectModifiedTrip)
    const {listTripGo} = useSelector(selectRearchResult)
    const [searchResult, setSearchResult] = useState(listTripGo)
    const handleLoadStation = async () => {
        try {
            dispatch(searchThunk.getSameTrips({
                tripId: currrentTickets.trip.id,
                departDate: format(departDate, 'dd/MM/yyyy'),
            }))
                .then(() => {

                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleConfirmPolicy = () => {
        if (confirm) {
            dispatch(ticketAction.comeForward())
            handleLoadStation()
        }
        else
            setError(true)
    }

    const handleConfirmEdit = () => {
        dispatch(ticketThunk.editTicket(
            {
                bookingCode: currrentTickets.code,
                pickStationId: pickLocation.id,
                dropStationId: dropLocation.id
            }))
            .unwrap()
            .then(() => {
                setMessage('')
                dispatch(ticketAction.comeForward())
                dispatch(bookingThunk.getUserHistory())
                dispatch(ticketAction.finishAction())
            })
            .catch((error) => {
                setMessage(error)
            })
    }

    const handlePickLocation = useCallback((location) => {
        setPickLocation(location)
    }, [])

    const handleDropLocation = useCallback((location) => {
        setDropLocation(location)
    }, [])

    const handleChooseLocation = () => {
        if (pickLocation.id === currrentTickets.pickStation.id && dropLocation.id === currrentTickets.dropStation.id) {
            setMessage('Bạn chưa thay đổi điểm đi hoặc đón')
        }
        else {
            setMessage('')
            dispatch(ticketAction.comeForward())
        }
    }

    useEffect(() => {
        if (confirm)
            setError(false)
    }, [confirm])

    useEffect(() => {
        if (searchResult.length !== 0) {
            dispatch(ticketAction.setModifiedTrip(searchResult.filter((trip) => trip.id === currrentTickets.tickets[0].schedule.id)[0]))
        }
    }, [searchResult])

    return (
        <div style={{ height: '100%' }}>
            {process === 1 && (
                <div className={styles.container}>
                    <h2 style={{ textAlign: 'center' }}>Chính sách sửa vé</h2>
                    <h3><b style={{ fontSize: '18px' }}>* Điều kiện sửa vé</b></h3>
                    <p>
                        <span>Khách hàng có thể thực hiện đổi điểm đón - trả trước ít nhất 4h trước giờ khởi hành</span>
                    </p>
                    <div className={styles.infor_confirm}>
                        <input
                            style={{ transform: 'scale(2)', marginRight: '10px' }}
                            type="checkbox"
                            checked={confirm}
                            onChange={() => setConfirm(!confirm)}
                        />
                        <label style={{ fontWeight: '600' }}>Tôi đồng ý với chính sách sửa vé của Xe Kim Nguyên</label>
                        <br />
                        {error && <i style={{ color: 'red' }}>Vui lòng xác nhận đồng ý với chính sách sửa vé</i>}
                    </div>
                    <Button text='Tiếp tục' onClick={handleConfirmPolicy} className={styles.nextBtn} loading={loading}></Button>
                </div>
            )
            }
            {process === 2 &&
                (
                    <div className={styles.container}>
                        <h2 style={{ textAlign: 'center' }}>Sửa vé</h2>
                        <span className={styles.inforTitle}>Tuyến xe: </span>
                        {currrentTickets.trip.turn === true ? (
                            <span className={styles.inforValue}>{`${currrentTickets.trip.route.departure.name} - ${currrentTickets.trip.route.destination.name}`}</span>
                        ) : (
                            <span className={styles.inforValue}>{`${currrentTickets.trip.route.destination.name} - ${currrentTickets.trip.route.departure.name}`}</span>
                        )}
                        <br />
                        <span className={styles.inforTitle}>Thời gian khởi hành: </span>
                        <span className={styles.inforValue}>{`${currrentTickets.tickets[0].schedule.departTime.slice(0, -3)}h - Ngày ${convertToDisplayDate(currrentTickets.tickets[0].schedule.departDate)}`}</span>
                        <br />
                        <span className={styles.inforTitle}>Chọn điểm đón - trả: </span>
                        <div className={`editTicket ${styles.tabStyle}`}>
                            {currentTrip ? (
                                <Tabs>
                                    <TabList>
                                        <Tab> <b>Điểm đón</b> </Tab>
                                        <Tab> <b>Điểm trả</b> </Tab>
                                    </TabList>
                                    <TabPanel>
                                        <PickLocation pick={true}
                                            listLocation={currentTrip.tripInfor.stopStations.filter((station) => station.stationType === 'pick')}
                                            setLocation={handlePickLocation}
                                            selected={pickLocation.id}
                                            getObject={true}
                                            modifiedTrip={currentTrip}
                                        >
                                        </PickLocation>
                                    </TabPanel>
                                    <TabPanel>
                                        <PickLocation pick={false}
                                            listLocation={currentTrip.tripInfor.stopStations.filter((station) => station.stationType === 'drop')}
                                            setLocation={handleDropLocation}
                                            selected={dropLocation.id}
                                            getObject={true}
                                            modifiedTrip={currentTrip}
                                        >
                                        </PickLocation>
                                    </TabPanel>
                                </Tabs>
                            ) : (
                                <div style={{ color: 'red' }}>
                                    <i>Đang load dữ liệu. Vui lòng chờ trong giây lát ...</i>
                                </div>
                            )}
                        </div>
                        <br />
                        <div>
                            {message !== '' && <i style={{ color: 'red' }}>{message}</i>}
                            {currentTrip && (
                                <Button text='Tiếp tục' className={styles.nextBtn} onClick={handleChooseLocation} loading={loading}></Button>
                            )}
                        </div>
                    </div>
                )}
            {
                process === 3 && (
                    <div className={styles.container}>
                        <h2 style={{ textAlign: 'center' }}>Xác nhận sửa vé</h2>
                        <span className={styles.inforTitle}>Chuyến xe: </span>
                        {currrentTickets.trip.turn === true ? (
                            <span className={styles.inforValue}>{`${currrentTickets.trip.route.departure.name} - ${currrentTickets.trip.route.destination.name}`}</span>
                        ) : (
                            <span className={styles.inforValue}>{`${currrentTickets.trip.route.destination.name} - ${currrentTickets.trip.route.departure.name}`}</span>
                        )}
                        <br />
                        <span className={styles.inforTitle}>Thời gian khởi hành: </span>
                        <span className={styles.inforValue}>{`${currrentTickets.tickets[0].schedule.departTime.slice(0, -3)}h - Ngày ${convertToDisplayDate(currrentTickets.tickets[0].schedule.departDate)}`}</span>
                        <br />

                        <span className={styles.inforTitle}>Điểm đón - trả cũ: </span>
                        <span className={styles.inforValue}>{`${currrentTickets.pickStation.station.name} - ${currrentTickets.dropStation.station.name}`}</span>
                        <br />

                        <span className={styles.inforTitle}>Điểm đón - trả mới: </span>
                        <span className={styles.inforValue}>{`${pickLocation.station.name} - ${dropLocation.station.name}`}</span>
                        <br />
                        <Button text='Xác nhận sửa vé' className={styles.nextBtn} onClick={handleConfirmEdit} loading={loading}></Button>
                    </div>
                )
            }
            {
                process === 4 && (
                    <div className={styles.container}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FontAwesomeIcon icon={faCircleCheck} color='green' size={'2x'} />
                            <span>Vé đã được sửa thành công</span>
                        </div>
                        <OptionButton text='Đóng' className={styles.nextBtn} onClick={close} loading={loading}></OptionButton>
                    </div>
                )
            }
        </div>
    )
}

export default EditTicket