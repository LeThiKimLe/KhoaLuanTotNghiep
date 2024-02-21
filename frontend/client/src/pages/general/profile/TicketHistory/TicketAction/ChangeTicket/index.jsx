import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Button, { OptionButton } from '../../../../../../components/common/button'
import { useEffect, useState, useCallback, useDebugValue } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTicket, selectProcess } from '../../../../../../feature/ticket/ticket.slice'
import SeatMap from '../../../../../customer/trip/seatmap'
import DatePicker from 'react-datepicker';
import { parse, format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { ticketAction } from '../../../../../../feature/ticket/ticket.slice'
import { searchAction } from '../../../../../../feature/search/search.slice'
import './custom.css'
import searchThunk from '../../../../../../feature/search/search.service'
import { selectRearchResult } from '../../../../../../feature/search/search.slice'
import notfound from '../../../../../../assets/notfound.png'
import SearchItem from '../../../../../customer/list/searchItem'
import { convertToDisplayDate } from '../../../../../../utils/unitUtils'
import { selectNewTrip, selectNewSeat, selectMessage, selectModifiedTrip } from '../../../../../../feature/ticket/ticket.slice'
import PickLocation from '../../../../../customer/trip/pickLocation'
import { selectCurrentTrip, tripActions } from '../../../../../../feature/trip/trip.slice';
import ticketThunk from '../../../../../../feature/ticket/ticket.service'
import bookingThunk from '../../../../../../feature/booking/booking.service'

const ChangeTicket = ({ close }) => {
    const process = useSelector(selectProcess)
    const [error, setError] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const currrentTickets = useSelector(selectCurrentTicket)
    const [listChange, setListChange] = useState([])
    const [action, setAction] = useState('changeSeat')
    const [selectedSeats, setSelectedSeats] = useState([])
    const [newDepDate, setNewDepDate] = useState(parse(currrentTickets.tickets[0].schedule.departDate, 'yyyy-MM-dd', new Date()))
    const {listTripGo} = useSelector(selectRearchResult)
    const [searchResult, setSearchResult] = useState(listTripGo)
    const [loading, setLoading] = useState(false)
    const newTrip = useSelector(selectNewTrip)
    const newSeats = useSelector(selectNewSeat)
    const currentTrip = useSelector(selectModifiedTrip)
    const dispatch = useDispatch()
    const message = useSelector(selectMessage)
    const [filterTicket, setFilterTicket] = useState(currrentTickets.tickets)

    const handleChooseTicket = (e) => {
        if (listChange.map((ticket)=>ticket.seat).includes(e.target.name)) {
            const newList = listChange.filter((item) => item.seat !== e.target.name)
            setListChange(newList)
        }
        else {
            setListChange([...listChange, {
                id: e.target.value,
                seat: e.target.name
            }])
        }
    }

    const handleSelectTicket = async () => {
        if (listChange.length !== 0) {
            setSelectedSeats([])
            setLoading(true)
            try {
                dispatch(searchThunk.getSameTrips({
                    tripId: currrentTickets.trip.id,
                    departDate: format(newDepDate, 'dd/MM/yyyy'),
                }))
                    .then(() => {
                        setLoading(false)
                        dispatch(ticketAction.comeForward())
                        dispatch(ticketAction.setListChange(listChange))
                    })
                    .catch((error) => {
                        console.log(error)
                        setLoading(false)
                    })
            }
            catch (error) {
                console.log(error)
            }
        }
        else
            setError(true)
    }

    const handleSeatProcess = () => {
        if (selectedSeats.length === listChange.length) {
            dispatch(ticketAction.comeForward())
        }
        else
            setError(true)
    }

    const handleCheckAll = () => {
        if (listChange.length === currrentTickets.tickets.length)
            setListChange([])
        else
            setListChange(currrentTickets.tickets.map((ticket) => {
                return {
                    id: ticket.id,
                    seat: ticket.seat
                }
            }))
    }

    const handleChangeAction = (e) => {
        setAction(e.target.name)
    }

    const handleSeatClick = useCallback((seatName) => {
        if (selectedSeats.includes(seatName)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatName));
        } else {
            if (listChange.length > selectedSeats.length) {
                setSelectedSeats([...selectedSeats, seatName]);
            }
        }
    }, [selectedSeats]);

    const handleConfirmPolicy = () => {
        if (confirm)
            dispatch(ticketAction.comeForward())
        else
            setError(true)
    }

    const handleConfirmChange = () => {
        setLoading(true)
        dispatch(ticketThunk.changeTicket({
            bookingCode: currrentTickets.code,
            listChange: listChange,
            listNew: action==='changeSeat' ? selectedSeats : newSeats,
            newScheduleId: action === 'changeSeat' ? currentTrip.id : newTrip.id
        }
        ))
            .unwrap()
            .then(() => {
                setLoading(false)
                dispatch(bookingThunk.getUserHistory())
                dispatch(ticketAction.finishAction())
                dispatch(ticketAction.comeForward())
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }

    const getNewTrip = async () => {
        setLoading(true)
        dispatch(searchThunk.getSameTrips({
            tripId: currrentTickets.trip.id,
            departDate: format(newDepDate, 'dd/MM/yyyy'),
        }))
            .unwrap()
            .then((response) => {
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                dispatch(searchAction.resetResult())
            })
    }

    useEffect(() => {
        if (confirm)
            setError(false)
    }, [confirm])

    useEffect(() => {
        if (error === true) {
            if (listChange.length !== 0)
                setError(false)
        }
    }, [listChange])

    useEffect(() => {
        if (error === true) {
            if (selectedSeats.length === listChange.length)
                setError(false)
        }
    }, [selectedSeats])

    useEffect(() => {
        dispatch(searchAction.resetResult())
    }, [])

    useEffect(() => {
        if (searchResult.length !== 0) {
            dispatch(ticketAction.setModifiedTrip(searchResult.filter((trip) => trip.id === currrentTickets.tickets[0].schedule.id)[0]))
        }
    }, [searchResult])

    useEffect(()=>{
        if (currrentTickets)
            setFilterTicket(currrentTickets.tickets.filter((tk)=>tk.state !== 'Đã hủy' && tk.state !== 'Chờ hủy'))
    }, [currrentTickets])

    return (
        <div>
            {process === 1 && (
                <div className={styles.container}>
                    <h2 style={{ textAlign: 'center' }}>Chính sách đổi vé</h2>
                    <h3><b style={{ fontSize: '18px' }}>* Điều kiện đổi vé</b></h3>
                    <p>
                        <b><i>+ Đối với vé ngày thường: </i></b>
                        <span>Khách hàng đã đặt vé với số lượng và thông báo hủy vé trước 24 tiếng trước giờ khởi hành
                            sẽ được hỗ trợ đổi vé 1 lần. </span>
                        <br />
                        <b><i>+ Đối với vé lễ: </i></b>
                        <span>KHÔNG hỗ trợ đổi vé lễ hoặc đổi vé thường sang vé lễ</span>
                        <br />
                        <p>
                            <FontAwesomeIcon icon={faCircleExclamation} color='red' />
                            <i> Chỉ hỗ trợ đổi vé một lần duy nhất</i>
                        </p>
                    </p>
                    <div className={styles.infor_confirm}>
                        <input
                            style={{ transform: 'scale(2)', marginRight: '10px' }}
                            type="checkbox"
                            checked={confirm}
                            onChange={() => setConfirm(!confirm)}
                        />
                        <label style={{ fontWeight: '600' }}>Tôi đồng ý với chính sách đổi vé của Xe Kim Nguyên</label>
                        <br />
                        {error && <i style={{ color: 'red' }}>Vui lòng xác nhận đồng ý với chính sách đổi vé</i>}
                    </div>
                    <Button text='Tiếp tục' onClick={handleConfirmPolicy} className={styles.nextBtn}></Button>
                </div>
            )
            }
            {process === 2 &&
                (
                    <div className={styles.container}>
                        <h2 style={{ textAlign: 'center' }}>Đổi vé</h2>
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
                        <br />
                        <div>
                            <span className={styles.inforTitle}>Chọn vé cần đổi*</span>
                            <br />
                            <label htmlFor="all" style={{ marginTop: '10px' }}>
                                <input type="checkbox"
                                    name='all'
                                    checked={listChange.length === currrentTickets.tickets.length}
                                    onChange={handleCheckAll}
                                    style={{ margin: '0 10px', width: '20px', height: '20px' }} />
                                <i>Chọn tất cả</i>
                            </label>
                            <br />
                            <div className={styles.ticketContainer}>
                                {filterTicket.filter((ticket)=>ticket.state !== 'Đã hủy').map((ticket) => (
                                    <div className={styles.ticketCover}>
                                        <div key={ticket.id} className={styles.ticketItem}>
                                            <label htmlFor={ticket.seat}>
                                                <input type="checkbox"
                                                    name={ticket.seat}
                                                    value={ticket.id}
                                                    checked={listChange.map((tk) => tk.seat).includes(ticket.seat)}
                                                    onChange={handleChooseTicket}
                                                    style={{ marginRight: '10px', width: '20px', height: '20px' }}
                                                />
                                                <br />
                                                <span>Vé: </span>
                                                <b>{ticket.seat}</b>
                                                <br />
                                                <i style={{ fontSize: '13px' }}>Mã vé: </i>
                                                <i style={{ fontSize: '13px' }}>{ticket.id}</i>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                            <br />
                            <span className={styles.inforTitle}>Chọn hành động*</span>
                            <div>
                                <label htmlFor="changeSeat" style={{ margin: '5px 0' }}>
                                    <input type="radio" name='changeSeat'
                                        checked={action === 'changeSeat'}
                                        onChange={handleChangeAction}
                                        style={{ marginRight: '10px', width: '15px', height: '15px' }}
                                    />
                                    <span style={action === 'changeSeat' ? { color: '#d09c0c', fontWeight: '600' } : { fontWeight: '600' }}>Đổi chỗ</span>
                                </label>
                                <br />
                                <label htmlFor="changeTrip">
                                    <input type="radio" name='changeTrip'
                                        checked={action === 'changeTrip'}
                                        onChange={handleChangeAction}
                                        style={{ marginRight: '10px', width: '15px', height: '15px' }}
                                    />
                                    <span style={action === 'changeTrip' ? { color: '#d09c0c', fontWeight: '600' } : { fontWeight: '600' }}>Đổi chuyến</span>
                                </label>
                            </div>

                            <b style={{ fontSize: '14px' }}>Lưu ý: </b>
                            <span style={{ fontSize: '14px' }}> Đổi chuyến chỉ áp dụng đổi cho các chuyến có cùng tuyến, cùng giá vé
                                với chuyến xe cũ </span>
                            <br />
                            {error && <i style={{ color: 'red', fontSize: '15px' }}>Vui lòng chọn vé cần đổi</i>}
                            <Button text='Tiếp tục' className={styles.nextBtn} onClick={handleSelectTicket} loading={loading}></Button>
                        </div>
                    </div>
                )}
            {
                process === 3 && (
                    <div>
                        <h2 style={{ textAlign: 'center' }}>{action === 'changeSeat' ? 'Đổi chỗ' : 'Đổi chuyến'}</h2>
                        {action === 'changeSeat' && (
                            currentTrip ?
                                (
                                    <div>
                                        <span>{`Chọn ${listChange.length} ghế`}</span>
                                        <SeatMap seatMap={currentTrip.tripInfor.route.busType.seatMap}
                                            booked={currentTrip.tickets}
                                            selectedSeats={selectedSeats}
                                            handleSeatClick={handleSeatClick}>
                                        </SeatMap>
                                        {error && <i style={{ color: 'red', fontSize: '15px' }}>{`Vui lòng chọn đủ số ghế cần đổi (${listChange.length}) ghế`} </i>}
                                        <Button text='Tiếp tục' className={styles.nextBtn} onClick={handleSeatProcess} loading={loading}></Button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className={styles.notfound}>
                                            <p>Chuyến xe của bạn không còn chỗ trống. Hãy đổi sang chuyến khác</p>
                                            <img src={notfound} alt="" />
                                        </div>
                                    </div>
                                )
                        )}
                        {
                            action === 'changeTrip' && (
                                <div>
                                    <div className={`${styles.searchBox} searchChange`}>
                                        <i>Chọn ngày đi: </i>
                                        <div>
                                            <DatePicker selected={newDepDate}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Ngày khởi hành"
                                                onChange={setNewDepDate}
                                                minDate={new Date()}
                                            />
                                        </div>
                                        <Button text='Tìm kiếm'
                                            className={styles.searchBtn}
                                            loading={loading}
                                            onClick={getNewTrip}
                                        >
                                        </Button>
                                    </div>
                                    <div className={styles.resultContainer}>
                                        {searchResult.length === 0 ? (
                                            <div className={styles.notfound}>
                                                <p>Không tìm thấy chuyến xe</p>
                                                <img src={notfound} alt="" />
                                            </div>
                                        ) :
                                            (
                                                <div className={styles.listResult}>
                                                    <i><b>Hãy chọn {listChange.length} vé từ 1 chuyến xe khác</b></i>
                                                    {searchResult.filter((trip) => !currentTrip || (trip.id !== currentTrip.id && trip.availability >= listChange.length)).map((trip) => (
                                                        <SearchItem trip={trip} key={trip.id} sameTrip={true}></SearchItem>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                process === 4 && (
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Xác nhận đổi vé</h2>
                        <span className={styles.inforTitle}>Chuyến xe: </span>
                        {currrentTickets.trip.turn === true ? (
                            <span className={styles.inforValue}>{`${currrentTickets.trip.route.departure.name} - ${currrentTickets.trip.route.destination.name}`}</span>
                        ) : (
                            <span className={styles.inforValue}>{`${currrentTickets.trip.route.destination.name} - ${currrentTickets.trip.route.departure.name}`}</span>
                        )}
                        <br />
                        {
                            action === 'changeSeat' && (
                                <div>
                                    <span className={styles.inforTitle}>Thời gian khởi hành: </span>
                                    <span className={styles.inforValue}>{`${currrentTickets.tickets[0].schedule.departTime.slice(0, -3)}h - Ngày ${convertToDisplayDate(currrentTickets.tickets[0].schedule.departDate)}`}</span>
                                    <br />
                                    <span className={styles.inforTitle}>Đổi ghế: </span>
                                    <b>{listChange.map((ticket) => ticket.seat).join()}</b>
                                    <span>{` ---> `}</span>
                                    <b>{selectedSeats.join()}</b>
                                </div>
                            )
                        }
                        {
                            action === 'changeTrip' && (
                                <div>
                                    <b style={{ textDecoration: 'underline' }}>Đổi chuyến</b>
                                    <br />
                                    <span className={styles.inforTitle}> Chuyến cũ: </span>
                                    <span className={styles.inforValue}>{`${currrentTickets.tickets[0].schedule.departTime.slice(0, -3)}h - Ngày ${convertToDisplayDate(currrentTickets.tickets[0].schedule.departDate)}`}</span>
                                    <br />
                                    <span className={styles.inforTitle}> Ghế: </span>
                                    <b>{listChange.map((ticket) => ticket.seat).join()}</b>
                                    <div>----------------------------------------------</div>
                                    <span className={styles.inforTitle}> Chuyến mới: </span>
                                    <span className={styles.inforValue}>{`${newTrip.departTime.slice(0, -3)}h - Ngày ${convertToDisplayDate(newTrip.departDate)}`}</span>
                                    <br />
                                    <span className={styles.inforTitle}> Ghế: </span>
                                    <b>{newSeats.join()}</b>
                                </div>
                            )
                        }
                        <br />
                        <b>Lưu ý: </b>
                        <span>Hệ thống chỉ hỗ trợ đổi vé một lần. Bạn sẽ không thể đổi hay hủy vé sau khi đổi.</span>
                        {message !== '' && (<p style={{color: 'red'}}>{message}</p>)} 
                        { message ==='' &&
                            <Button text='Xác nhận đổi vé' 
                                 className={styles.nextBtn} 
                                 onClick={handleConfirmChange} 
                                 loading={loading}>
                            </Button>
                        }
                    </div>
                )
            }
            {
                process === 5 && (
                    <div className={styles.container}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FontAwesomeIcon icon={faCircleCheck} color='green' size={'2x'} />
                            <span>Vé đã được đổi thành công</span>
                        </div>
                        <OptionButton text='Đóng' className={styles.nextBtn} onClick={close}></OptionButton>
                    </div>
                )
            }
        </div>
    )
}

export default ChangeTicket