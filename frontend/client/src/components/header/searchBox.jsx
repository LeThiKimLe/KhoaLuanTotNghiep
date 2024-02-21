import styles from './styles.module.css'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from '../../feature/search/search.slice';
import { selectSearchInfor, selectListDeparture, selectListDestination } from '../../feature/search/search.slice';
import { createListRoutes } from '../../utils/routeUtils';
import { useState, useRef, useEffect, useMemo, memo } from 'react'
import Message from '../message';
import { faBus, faCalendarDays, faLocationDot, faTicketSimple } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DatePicker from 'react-datepicker';
import Button from "../common/button";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { selectLoadingState } from '../../feature/route/route.slice';
import searchThunk from '../../feature/search/search.service';

const SearchBox = ({ listRoute, intro, parentClass, setSearchAction }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    const searchInfor = useSelector(selectSearchInfor)
    const listDeparture = useSelector(selectListDeparture)
    const listDestination = useSelector(selectListDestination)
    // const { listDeparture, listDestination } = useMemo(() => createListRoutes(listRoute), [])
    const originPlaceInput = useRef(null);
    const [currentInfor, setCurrentInfor] = useState(searchInfor)
    const [message, setMessage] = useState({ content: '', repeat: 0 })
    const navigate = useNavigate()
    const today = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(today.getMonth() + 2);
    const depOptions = listDeparture.map((dep) => { return { value: dep.key, label: dep.location.name } })
    const desOptions = currentInfor.departLocation && listDestination.filter((des) => des.key === currentInfor.departLocation.value)[0] ? 
    (listDestination.filter((des) => des.key === currentInfor.departLocation.value)[0].location.map(
        (des) => {
            return {
                value: { id: des.routeId, turn: des.round },
                label: des.destination.name
            }
        })) : []

    const handleCurrentInfor = (propName, propValue) => {
        if (propName !== 'searchRoute')
            setCurrentInfor({
                ...currentInfor,
                [propName]: propValue
            })
        else{
            setCurrentInfor({
                ...currentInfor,
                searchRoute: propValue
            })
        }
    }

    const resetCurrentInfor = () => {
        setCurrentInfor({
            ...currentInfor,
            searchRoute: null,
            desLocation: null
        })
    }

    const handleOriginPlace = (place) => {
        setCurrentInfor({
            ...currentInfor,
            searchRoute: null,
            desLocation: null,
            departLocation: place
        })
    }

    const handleDesPlace = (place) => {
        handleCurrentInfor('desLocation', place)
    }

    const checkOrigin = () => {
        if (!(currentInfor.departLocation)) {
            originPlaceInput.current.focus();
            setMessage({ content: 'Hãy chọn điểm đi', repeat: Date.now() })
        }
        else {
            setMessage({ content: '', repeat: 0 })
        }
    }

    const chooseOriginDate = (date) => {
        handleCurrentInfor('departDate', format(date, 'dd/MM/yyyy'))
    };

    const chooseReturnDate = (date) => {
        handleCurrentInfor('arrivalDate', format(date, 'dd/MM/yyyy'));
    }

    const chooseTicketNumber = (amount) => {
        const new_quatity = currentInfor.numberTicket + amount
        if (new_quatity >= 1 && new_quatity <= 5)
            handleCurrentInfor('numberTicket', new_quatity)
    }

    const handleSearch = () => {
        if (currentInfor.searchRoute) {
            setMessage({ content: '', repeat: 0 })
            dispatch(searchAction.setSearch(currentInfor))
            if (setSearchAction)
                setSearchAction(true)
            navigate('/trips');
        }
        else {
            setMessage({ content: 'Hãy chọn đủ điểm đi và điểm đến', repeat: Date.now() })
        }
    }

    useEffect(() => {
        if (currentInfor.desLocation) {
            const selectedTrip = listRoute.filter((route) => route.id === currentInfor.desLocation.value.id)[0]
            setCurrentInfor({
                ...currentInfor,
                searchRoute: selectedTrip,
                turn: currentInfor.desLocation.value.turn
            })
        }
    }, [currentInfor.desLocation])
    useEffect(() => {
        if (currentInfor.departDate)
        {
            if (parse(currentInfor.departDate, 'dd/MM/yyyy', new Date()).getDate() - new Date().getDate() < 0)
                if (currentInfor.searchRoute)
                    setCurrentInfor({
                        ...currentInfor,
                        departDate: format(new Date(), 'dd/MM/yyyy')
            })
            if (parse(currentInfor.departDate, 'dd/MM/yyyy', new Date()) - parse(currentInfor.arrivalDate, 'dd/MM/yyyy', new Date()) > 0)
                    setCurrentInfor({
                        ...currentInfor,
                        arrivalDate: currentInfor.departDate
            })
        }
    }, [currentInfor?.departDate])
    useEffect(() => {
        if (listRoute.length > 0)
        {
            const { listDeparture, listDestination } =  createListRoutes(listRoute)
            dispatch(searchAction.setListDeparture(listDeparture))
            dispatch(searchAction.setListDestination(listDestination))
        }
    }, [listRoute.length])
    return (
        <>
            {message.content !== '' && <Message message={message.content} repeat={message.repeat} />}
            {intro ? (<div>
                <h1 className={styles.headerTitle}>{t('header.welcome')}</h1>
                <p className={styles.headerDesc}>{t('header.promo')}</p>
            </div>) : null
            }
            <div className={parentClass ? parentClass :styles.headerSearch}>
                <div className={styles.tripTypeBox}>
                    <label className={styles.tripTypeBoxItem}>
                        <input
                            type="radio"
                            value="one_way"
                            checked={currentInfor.oneway === true}
                            className={styles.radioBox}
                            onChange={() => handleCurrentInfor('oneway', true)}
                        />
                        <span>{t('header.searchbox.one_way')}</span>
                    </label>
                    <label className={styles.tripTypeBoxItem}>
                        <input
                            type="radio"
                            value="round_trip"
                            checked={currentInfor.oneway === false}
                            className={styles.radioBox}
                            onChange={() => handleCurrentInfor('oneway', false)}
                        />
                        <span>{t('header.searchbox.round_trip')}</span>
                    </label>
                </div>
                <div className={styles.headerSearchList}>
                    <div className={`${styles.groupItem} ${styles.locationGroup}`}>
                        <div className={styles.headerSearchItem}>
                            <FontAwesomeIcon icon={faBus} className={styles.headerIcon} />
                            <div className={styles.selectArea}>
                                <div className={styles.selectTitle}>{t('header.searchbox.origin')}</div>
                                <Select options={depOptions}
                                    ref={originPlaceInput}
                                    value={currentInfor.departLocation}
                                    onChange={handleOriginPlace}
                                    className={styles.selectItem}
                                    placeholder="Origin"
                                >
                                </Select>
                            </div>
                        </div>
                        <div className={styles.dot}></div>
                        <div className={styles.headerSearchItem}>
                            <FontAwesomeIcon icon={faLocationDot} className={styles.headerIcon} />
                            <div className={styles.selectArea}>
                                <div className={styles.selectTitle}>{t('header.searchbox.destination')}</div>
                                <Select options={desOptions}
                                    value={currentInfor.desLocation}
                                    onFocus={checkOrigin}
                                    onChange={handleDesPlace}
                                    className={styles.selectItem}
                                    placeholder="Destination"
                                >
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.groupItem} ${styles.timeGroup}`}>
                        <div className={styles.headerSearchItem}>
                            <FontAwesomeIcon icon={faCalendarDays} className={styles.headerIcon} />
                            <div className={styles.selectArea}>
                                <div className={styles.selectTitle}>{t('header.searchbox.depart_date')}</div>
                                <div className={styles.datePicker}>
                                    <DatePicker selected={parse(currentInfor.departDate, 'dd/MM/yyyy', new Date())}
                                        onChange={chooseOriginDate}
                                        className={styles.headerSearchInput}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Depart Date"
                                        minDate={today}
                                        maxDate={twoMonthsLater}
                                    />
                                </div>
                            </div>
                        </div>

                        {currentInfor.oneway === false ?
                            (
                                <div className={styles.headerSearchItem}>
                                    <FontAwesomeIcon icon={faCalendarDays} className={styles.headerIcon} />
                                    <div className={styles.selectArea}>
                                        <div className={styles.selectTitle}>{t('header.searchbox.return_date')}</div>
                                        <div className={styles.datePicker}>
                                            <DatePicker selected={parse(currentInfor.arrivalDate, 'dd/MM/yyyy', new Date())}
                                                onChange={chooseReturnDate}
                                                className={styles.headerSearchInput}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Arrival Date"
                                                minDate={parse(currentInfor.departDate, 'dd/MM/yyyy', new Date())}
                                                maxDate={twoMonthsLater}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }

                        <div className={`${styles.headerSearchItem} ${styles.ticketAmount}`}>
                            <FontAwesomeIcon icon={faTicketSimple} className={styles.headerIcon} />
                            <div className={styles.selectArea}>
                                <div className={styles.selectTitle}>{t('header.searchbox.ticket_number')}</div>
                                <div className={styles.ticketChange}>
                                    <button className={styles.optionCounterButton}
                                        onClick={() => chooseTicketNumber(-1)}
                                        disabled={currentInfor.numberTicket === 1}>
                                        <span>-</span>
                                    </button>
                                    <span className={styles.headerSearchText}>{currentInfor.numberTicket}</span>
                                    <button className={styles.optionCounterButton}
                                        onClick={() => chooseTicketNumber(1)}
                                        disabled={currentInfor.numberTicket === 5}>
                                        <span>+</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.headerSearchButton}>
                    <Button onClick={handleSearch} text={t('header.searchbox.search_btn')} ></Button>
                </div>
            </div>
        </>
    )
}

export default memo(SearchBox)