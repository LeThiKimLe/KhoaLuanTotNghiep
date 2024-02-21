import React, { useCallback, useEffect, useState } from 'react'
import Navbar from "../../../components/navbar"
import Header from "../../../components/header"
import styles from './styles.module.css'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCalendarDays, faLocationDot, faTicketSimple, faArrowRight, faFilter, faXmark } from "@fortawesome/free-solid-svg-icons"
import { format } from 'date-fns';
import SearchItem from './searchItem'
import { useSelector } from 'react-redux'
import { selectSearchInfor, selectRearchResult } from '../../../feature/search/search.slice'
import { selectListRoute } from '../../../feature/route/route.slice'
import { search } from 'slick/finder'
import SearchBox from '../../../components/header/searchBox'
import { TRIP_DATA } from '../../../utils/test_data'
import Footer from '../../../components/footer'
import FilterBar from './FilterBar'
import seatThunk from '../../../feature/seat/seat.service'
import { selectSeatMap } from '../../../feature/seat/seat.slice'
import { useDispatch } from 'react-redux'
import Loading from '../../../components/loading'
import notfound from '../../../assets/notfound.png'
import searchThunk from '../../../feature/search/search.service'
import { convertTimeToInt, convertToDisplayDate } from '../../../utils/unitUtils'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import './styles.css'
import { tripActions } from '../../../feature/trip/trip.slice'
import { selectCurrentTrip, selectReturnTrip } from '../../../feature/trip/trip.slice'
import MediaQuery from 'react-responsive'
const ListResult = ({filterResult}) => {
    return (
        <div>
            {filterResult.length === 0 ? (
                <div className={styles.notfound}>
                    <p>Không tìm thấy chuyến xe</p>
                    <img src={notfound} alt="" />
                </div>
            ) :
                (
                    <>
                        {filterResult.map((trip) => (
                            <SearchItem trip={trip} key={trip.id}></SearchItem>
                        ))}
                    </>
                )}
        </div>
    )
}

const TripSum = ({trip, turn}) => {
    console.log(trip)
    return (
        <div className={styles.tripSum}>
            <div className={`${styles.header}`}>
                <span className={styles.title}>
                    {
                        turn === true ? 'Chuyến đi' : 'Chuyến về'
                    }
                </span>
            </div>
            <div className={styles.body}>
                <b>{`${trip.departTime.slice(0,-3)} - ${convertToDisplayDate(trip.departDate)}`}</b>
                <br></br>
                <span>{
                    trip.tripInfor.turn === true ? trip.tripInfor.startStation.name : trip.tripInfor.endStation.name
                }</span>
                <span>{` - `}</span>
                <span>{
                    trip.tripInfor.turn === true ? trip.tripInfor.endStation.name : trip.tripInfor.startStation.name
                }</span>
            </div>
        </div>
    )
}

const List = () => {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    const {listTripGo, listTripReturn} = useSelector(selectRearchResult)
    const [selectedTab, setSelectedTab] = useState(0)
    const [search, setSearch] = useState(true)
    const seatMap = useSelector(selectSeatMap)
    const [resetFilter, setResetFilter] = useState(false)
    const [currentListTrip, setCurrentListTrip] = useState(listTripGo)
    const [sortOptions, setSortOptions] = useState({
        'soon': {
            value: false,
            label: 'Khởi hành sớm nhất'
        },
        'late': {
            value: false,
            label: 'Khởi hành muộn nhất'
        }
    })

    const [backupTrips, setBackupTrips] = useState(currentListTrip)
    const currentTrip = useSelector(selectCurrentTrip)
    const returnTrip = useSelector(selectReturnTrip)
    const [sortState, setSortState] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const handleSortClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !sortOptions[name].value

        if (value === true)
            setSortState(name)
        else
            setSortState('')

        setSortOptions((prevOptions) => ({
            ...prevOptions,
            [name]: {
                ...prevOptions[name],
                value: value
            }
        }))

        Object.keys(sortOptions).forEach(key => {
            if (key !== name && sortOptions[key].value === true) {
                setSortOptions((prevOptions) => ({
                    ...prevOptions,
                    [key]: {
                        ...prevOptions[key],
                        value: false
                    }
                }))
            }
        })
    }

    //search infor
    const searchInfor = useSelector(selectSearchInfor)

    //search result
    const [filterResult, setFilterResult] = useState(currentListTrip)
    const [unsortTrip, setUnsortTrip] = useState(currentListTrip)

    const setTripResult = (listResult, unsortList) => {
        setFilterResult(listResult)
        if (unsortList)
            setUnsortTrip(unsortList)
        else
            setUnsortTrip(listResult)
    }

    useEffect(() => {
        const condition = Object.entries(sortOptions).filter(([key, value]) => value.value === true)
            .map(([key, value]) => {
                return key
            })
        if (condition.length !== 0) {

            if (condition[0] === 'soon') {
                const tripAscending = [...filterResult].sort((a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime));
                setFilterResult(tripAscending)
            }
            else if (condition[0] === 'late') {
                const tripDescending = [...filterResult].sort((a, b) => convertTimeToInt(b.departTime) - convertTimeToInt(a.departTime));
                setFilterResult(tripDescending)
            }
        }
        else {
            setTripResult(unsortTrip)
        }
    }, [sortOptions])

    const triggerSearch = (value) => {
        setSearch(value)
    }

    useEffect(() => {
        if (search === true) {
            setLoading(true)
            setResetFilter(true)
            window.scrollTo(0, 330);
            setTimeout(() => {
                dispatch(searchThunk.getTripsGo(searchInfor))
                    .unwrap()
                    .then(() => {
                        if (searchInfor.oneway === false)
                        {
                            dispatch(searchThunk.getTripsReturn(searchInfor))
                            .unwrap()
                            .then(() => {
                                setLoading(false)
                                setSearch(false)
                                setSelectedTab(0)
                            }
                            )
                            .catch((error) => {
                                setLoading(false)
                                setSearch(false)
                            })
                        } 
                        else{
                            setLoading(false)
                            setSearch(false)
                        }
                    }
                    )
                    .catch((error) => {
                        setLoading(false)
                        setSearch(false)
                    }) 
            }, 1000)
            dispatch(tripActions.getCurTrip(null))
            dispatch(tripActions.getReturnTrip(null))
        }
    }, [search]);

    useEffect(() => {
        setFilterResult(currentListTrip)
        setUnsortTrip(currentListTrip)
        setBackupTrips(currentListTrip)
    }, [currentListTrip])

    useEffect(() => {
        if (resetFilter === true) {
            Object.entries(sortOptions).filter(([key, value]) => value.value === true)
                .forEach(([key, value]) => {
                    setSortOptions((prevOptions) => ({
                        ...prevOptions,
                        [key]: {
                            ...prevOptions[key],
                            value: false
                        }
                    }))
                })
            setResetFilter(false)
        }
    }, [resetFilter])

    useEffect(() => {
        setResetFilter(true)
        if (selectedTab === 0)
            setCurrentListTrip(listTripGo)
        else
            setCurrentListTrip(listTripReturn)
    }, [selectedTab, listTripGo, listTripReturn])
    return (
        <div>
            <Navbar></Navbar>
            <Header type="list" />
            {
                searchInfor.searchRoute && (
                    <div className={styles.listContainer}>
                        <div className={styles.subContainer}>
                            <MediaQuery minWidth={878}>
                                <SearchBox listRoute={listRoute} parentClass={styles.searchBox} setSearchAction={triggerSearch}></SearchBox>
                            </MediaQuery>
                            <div className={styles.listWrapper}>
                                <div>
                                    <MediaQuery minWidth={878}>
                                    {
                                        searchInfor.oneway === false && (
                                            <div>
                                                {currentTrip && (<TripSum trip={currentTrip} turn={true}></TripSum>)}
                                                {returnTrip && (<TripSum trip={returnTrip} turn={false}></TripSum>)}
                                            </div>
                                        )
                                    }
                                    <FilterBar listTrip={backupTrips} sort={sortState} setResult={setTripResult} reset={resetFilter}>
                                    </FilterBar>
                                    </MediaQuery>
                                    <MediaQuery maxWidth={878}>
                                        <div className={`${styles.filterContainer} ${!showFilter ? styles.hidden : ''}`}>
                                            {showFilter &&
                                                <div className={styles.closeFilter} onClick={() =>  setShowFilter(false)}>
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </div>
                                            }
                                            <FilterBar listTrip={backupTrips} sort={sortState} setResult={setTripResult} reset={resetFilter}>
                                            </FilterBar>
                                        </div>
                                        <div className={`${styles.mask} ${!showFilter ? styles.hidden : ''}`} />
                                    </MediaQuery>
                                </div>
                                <div className={styles.listResult} >
                                    <div className={styles.searchBar}>
                                        <div className={`${styles.searchItem} ${styles.searchPlace}`}>
                                            <div>
                                                <FontAwesomeIcon icon={faLocationDot} className={styles.searchItemIcon} />
                                                <input type="text"
                                                    className={styles.searchInput}
                                                    readOnly
                                                    value={(searchInfor.turn === true || searchInfor.turn === 1) ? searchInfor.searchRoute.departure.name
                                                        : searchInfor.searchRoute.destination.name} />
                                            </div>
                                            <div className={styles.exchangeBtn}>
                                                <FontAwesomeIcon icon={faArrowRight} className={styles.searchItemIcon} />
                                            </div>
                                            <div>
                                                <FontAwesomeIcon icon={faLocationDot} className={styles.searchItemIcon} />
                                                <input type="text"
                                                    className={styles.searchInput}
                                                    readOnly
                                                    value={(searchInfor.turn === true || searchInfor.turn === 1) ? searchInfor.searchRoute.destination.name
                                                        : searchInfor.searchRoute.departure.name} />
                                            </div>
                                        </div>
                                        <div className={`${styles.searchItem} ${styles.searchDate}`}>
                                            <FontAwesomeIcon icon={faCalendarDays} className={styles.searchItemIcon} />
                                            <input type="text" className={styles.searchInput} readOnly value={searchInfor.departDate} />
                                        </div>
                                        {/* <div className={`${styles.searchItem} ${styles.searchNumber}`}>
                                            <FontAwesomeIcon icon={faTicketSimple} className={styles.searchItemIcon} />
                                            <input type="text" className={styles.searchInput} readOnly value={searchInfor.numberTicket + ' vé'} />
                                        </div> */}
                                    </div>
                                    <div className={styles.searchTotal}>
                                        <span>{`Kết quả tìm kiếm : ${loading ? '-' : filterResult.length} chuyến`}</span>
                                        <MediaQuery maxWidth={878}>
                                            <button className={styles.filterBtn} onClick={() => setShowFilter(true)}>
                                                Bộ lọc
                                                <FontAwesomeIcon icon={faFilter} />
                                            </button>
                                        </MediaQuery>
                                    </div>
                                    <div className={styles.sortArea}>
                                        <div>Sắp xếp theo: </div>
                                        {Object.entries(sortOptions).map(([key, value]) => (
                                            <div className={value.value === true ? `${styles.optionChoice} ${styles['optionChoice-active']}`
                                                : styles.optionChoice}
                                                onClick={handleSortClick}
                                                data-name={key}
                                                key={key}
                                            >
                                                {value.label}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.resultContainer}>
                                        {loading ? (<Loading scale={0.7}></Loading>) : (
                                            <div>
                                                <MediaQuery maxWidth={878}>
                                                {
                                                    searchInfor.oneway === false && (
                                                        <div>
                                                            {currentTrip && (<TripSum trip={currentTrip} turn={true}></TripSum>)}
                                                            {returnTrip && (<TripSum trip={returnTrip} turn={false}></TripSum>)}
                                                        </div>
                                                    )
                                                }
                                                </MediaQuery>
                                                {
                                                    searchInfor.oneway ? (
                                                        <ListResult filterResult={filterResult}></ListResult>
                                                    ) : (
                                                        <Tabs className="tabStyle" selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                                                            <TabList>
                                                                <Tab>{`Chuyến đi ${searchInfor.departDate}`}</Tab>
                                                                <Tab>{`Chuyến về ${searchInfor.arrivalDate}`}</Tab>
                                                            </TabList>
                                                            <TabPanel>
                                                                <ListResult filterResult={filterResult}></ListResult>
                                                            </TabPanel>
                                                            <TabPanel>
                                                                <ListResult filterResult={filterResult}></ListResult>
                                                            </TabPanel>
                                                        </Tabs>
                                                    )
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer></Footer>
        </div>
    )
}

export default List