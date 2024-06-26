import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleDot, faLocationDot, faBusSimple, faStar, faBullseye } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { convertToStamp, addHoursToTime, convertToDisplayDate } from '../../../../utils/unitUtils'
import { selectSearchInfor } from '../../../../feature/search/search.slice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../components/common/button'
import { tripActions } from '../../../../feature/trip/trip.slice'
import Trip from '../../trip'
import { useEffect, useState } from 'react'
import { ticketAction } from '../../../../feature/ticket/ticket.slice'
import { selectNewTrip } from '../../../../feature/ticket/ticket.slice'
import { selectRound } from '../../../../feature/search/search.slice'
import { selectReturnTrip, selectCurrentTrip} from '../../../../feature/trip/trip.slice'
import companyImg from '../../../../assets/busCompany.jpg'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'
import { ListStation } from './ListStation'
import { ListReview } from './ListReview'
import { ListUtils } from './ListUtils'
import { CompanyPolicy } from './CompanyPolicy'
import { selectListReview } from '../../../../feature/review/review.slice'
import reviewThunk from '../../../../feature/review/review.service'

const SearchItem = ({ trip, sameTrip }) => {
    const [choose, setChoose] = useState(false)
    const round = useSelector(selectRound)
    const returnTrip = useSelector(selectReturnTrip)
    const currentTrip = useSelector(selectCurrentTrip) 
    const dispatch = useDispatch()
    const searchInfor = useSelector(selectSearchInfor)
    const newTrip = useSelector(selectNewTrip)
    const navigate = useNavigate()
    const [openDetail, setOpenDetail] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const listComment = useSelector(selectListReview)
    const handleChooseTrip = () => {
        if (round === true)
            dispatch(tripActions.getCurTrip(trip))
        else{
            if (trip.tripInfor.turn === searchInfor.turn) {
                dispatch(tripActions.getCurTrip(trip))
            }
            else{
                dispatch(tripActions.getReturnTrip(trip))
            }
        }
        setChoose(true)
    }

    const showDetailSelector =  () => {
        dispatch(tripActions.getCurTrip(trip))
        if (newTrip && newTrip.id === trip.id)
            dispatch(ticketAction.setNewTrip(null))
        else
            dispatch(ticketAction.setNewTrip(trip))
    }
    
    const startStation = trip.tripInfor.startStation
    const endStation =  trip.tripInfor.endStation
    const departure = trip.tripInfor.turn ===  true? trip.tripInfor.route.departure : trip.tripInfor.route.destination
    const destination = trip.tripInfor.turn === true ? trip.tripInfor.route.destination : trip.tripInfor.route.departure

    const handleOpenInfo = (e) => {
        e.preventDefault()
        setOpenDetail(!openDetail)
    }
    const openReview = () => {
        setOpenDetail(!openDetail)
        setActiveTab(1)
    }
    const getReview = () => {
        const list = listComment.filter((item) => item?.scheduleTrip?.busCompany?.id === trip?.tripInfor?.busCompany?.id  && item?.scheduleTrip?.id === trip?.tripInfor?.id)
        const rating = list.reduce((sum, item) => sum + item.rate, 0)
        if (list.length !== 0)
            return `${(rating / list.length).toFixed(1)}/5 (${list.length})`
            
        else return `--/5 (${list.length})`
    }
    useEffect(() => {
        if (choose === true) { 
            setChoose(false)
            if (round && currentTrip)
                navigate(`/trip/${trip.id}`)
            else if (!round && currentTrip && returnTrip)
                navigate(`/trip/${trip.id}`)
        }
    }, [choose, currentTrip, returnTrip])
    useEffect(() => {
        dispatch(reviewThunk.getListReview())
        .unwrap()
        .then(() => {
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className={`container ${styles.cover}`}>
            <div className={`row ${styles.searchResult}`}>
                <div className='col-4 d-flex justify-content-center align-items-center'>
                    <img src={trip.tripInfor ? trip.tripInfor.busType.image : companyImg} className={styles.busImg}></img>
                </div>
                <div className='col-8'>
                    <div className='d-flex gap-2 align-items-center'>
                        <b>{trip.tripInfor.busCompany.name}</b>
                        <div className={styles.starCover} role="button" onClick={openReview}>
                            <FontAwesomeIcon icon={faStar} />
                            {
                                trip && listComment && (
                                    <small>{getReview()}</small>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.routeTime}>
                        <div>{trip.departTime.slice(0, -3)}</div>
                        <div className={styles.distanceRoute}>
                            <FontAwesomeIcon icon={faCircleDot} className={styles.startRoute} />
                            <div className={styles.dotDistance}></div>
                            <div className={styles.hourRoute}>{convertToStamp(trip.tripInfor.hours)}</div>
                            <div className={styles.dotDistance}></div>
                            <FontAwesomeIcon icon={faLocationDot} className={styles.endRoute} />
                        </div>
                        <div>{addHoursToTime(trip.departTime, trip.tripInfor.hours)}</div>
                    </div>
                    <div className={styles.routeLocation}>
                        <div className={styles.routePoint}>{startStation.name}</div>
                        <div className={`${styles.routePoint} ${styles.endPoint}`}>{endStation.name}</div>
                    </div>
                    <div className={styles.busType}>
                        <FontAwesomeIcon icon={faBusSimple} className={styles.typeIcon} />
                        {trip?.tripInfor?.busType?.description}
                    </div>
                    <div className={styles.seatBlank}>{`* Còn ${trip.availability} ghế`}</div>
                    <div className={styles.split}></div>
                    {sameTrip ? (
                        <div>
                            <i><a href='#' onClick={showDetailSelector}>
                                {newTrip && newTrip.id === trip.id ? 'Đóng' : 'Chọn chuyến' }
                            </a>
                            </i>
                            {newTrip && newTrip.id === trip.id && (
                                <Trip tabStyle={true}></Trip>
                            )}
                        </div>
                    ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div className={styles.note}>
                            {searchInfor.searchRoute.id !== trip.tripInfor.route.id &&
                                <i> {`*Vé chặng thuộc chuyến ${departure.name} - ${destination.name} (${trip.departTime.slice(0, -3)} - Ngày ${convertToDisplayDate(trip.departDate)})`}</i>
                            }
                            {
                                trip.note &&
                                <p style={{color: '#af830a', margin: '5px 0'}}>{`*Lưu ý: ${trip.note}`}</p>
                            }
                            <a href='#' onClick={handleOpenInfo}><i role='button'>Thông tin chi tiết</i></a>
                        </div>
                        <div>
                            <div className={styles.ticketPrice} >{`${trip.ticketPrice.toLocaleString()} đ`}</div>
                            <Button className={styles.bookBtn} onClick={handleChooseTrip} text='Chọn chuyến'></Button>
                        </div>
                    </div>
                )}
                </div>
                {
                    openDetail && (
                        <div className='col-12 border-top my-3'>
                            <Tabs 
                                className="tabStyle"
                                selectedIndex={activeTab}
                                onSelect={(index) => setActiveTab(index)}
                            >
                                <TabList>
                                    <Tab>Đón - trả</Tab>
                                    <Tab>Đánh giá</Tab>
                                    <Tab>Tiện ích</Tab>
                                    <Tab>Chính sách</Tab>
                                </TabList>
                                <TabPanel>
                                    <ListStation trip={trip}></ListStation>
                                </TabPanel>
                                <TabPanel>
                                    <ListReview trip={trip?.tripInfor}></ListReview>
                                </TabPanel>
                                <TabPanel>
                                    <ListUtils trip={trip?.tripInfor}></ListUtils>
                                </TabPanel>
                                <TabPanel>
                                    <CompanyPolicy policy={trip?.tripInfor?.busCompany?.policy}></CompanyPolicy>
                                </TabPanel>
                            </Tabs>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchItem
