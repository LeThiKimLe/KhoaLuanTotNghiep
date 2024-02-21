import styles from './styles.module.css'
import { faBus, faHouse, faTicket, faFileInvoice, faUsers, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Outlet, Link } from "react-router-dom";
import SearchBox from './searchBox';
import MediaQuery from 'react-responsive';
import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navAction } from '../../feature/navigation/navigation.slice';
import { selectActiveLink } from '../../feature/navigation/navigation.slice';

const Header = ({ type, active, listRoute }) => {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const activeLink = useSelector(selectActiveLink)

    const handleNavigate = (linkId) => {
        dispatch(navAction.setActiveLink(linkId))
    };

    useEffect(() => {
        dispatch(navAction.setActiveLink(active))
    }, [])

    return (
        <>
            <div className={styles.header}>
                <div className={type === "list" ? `${styles.headerContainer} ${styles.listMode}` : styles.headerContainer} >
                    <div className={styles.headerList}>
                        <Link className={`${styles.headerListItem} ${activeLink === 'home' ? styles.active : ''}`}
                            to="/"
                            onClick={() => handleNavigate('home')}
                        >
                            <FontAwesomeIcon icon={faHouse} />
                            <span>{t('header.menu.home')}</span>
                        </Link>
                        <Link className={`${styles.headerListItem} ${activeLink === 'schedule' ? styles.active : ''}`}
                            to="/schedule"
                            onClick={() => handleNavigate('schedule')}
                        >
                            <FontAwesomeIcon icon={faBus} />
                            <span>{t('header.menu.schedule')}</span>
                        </Link>
                        <MediaQuery minWidth={878}>
                            <Link className={`${styles.headerListItem} ${activeLink === 'ticket' ? styles.active : ''}`}
                                to="/ticket"
                                onClick={() => handleNavigate('ticket')}
                            >
                                <FontAwesomeIcon icon={faTicket}/>
                                <span>{t('header.menu.ticket')}</span>
                            </Link>
                            <Link className={`${styles.headerListItem} ${activeLink === 'bill' ? styles.active : ''}`}
                                to="/bill"
                                onClick={() => handleNavigate('bill')}
                            >
                                <FontAwesomeIcon icon={faFileInvoice}/>
                                <span>{t('header.menu.invoice')}</span>
                            </Link>
                            <Link className={`${styles.headerListItem} ${activeLink === 'about' ? styles.active : ''}`}
                                to="/about"
                                onClick={() => handleNavigate('about')}>
                               <FontAwesomeIcon icon={faUsers} />
                                <span>{t('header.menu.about')}</span>
                            </Link>

                        </MediaQuery>
                        <MediaQuery maxWidth={878}>
                            <div className={`otherOption ${styles.headerListItem} ${activeLink === 'other' ? styles.active : ''}`}
                                onClick={() => handleNavigate('other')}>
                                <FontAwesomeIcon icon={faChevronDown} />
                                <span>{t('header.menu.other')}</span>
                                <ul className={styles.subMenu}>
                                    <li>
                                        <Link className={`${styles.subMenuItem} ${activeLink === 'ticket' ? styles.active : ''}`}
                                            to="/ticket"
                                            onClick={() => handleNavigate('ticket')}
                                        >
                                            <FontAwesomeIcon icon={faTicket} />
                                            <span>{t('header.menu.ticket')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={`${styles.subMenuItem} ${activeLink === 'bill' ? styles.active : ''}`}
                                            to="/bill"
                                            onClick={() => handleNavigate('bill')}
                                        >
                                            <FontAwesomeIcon icon={faFileInvoice} />
                                            <span>{t('header.menu.invoice')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={`${styles.subMenuItem} ${activeLink === 'about' ? styles.active : ''}`}
                                            to="/about"
                                            onClick={() => handleNavigate('about')}>
                                            <FontAwesomeIcon icon={faUsers} />
                                            <span>{t('header.menu.about')}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </MediaQuery>
                    </div>
                    {type !== "list" && (
                        <SearchBox listRoute = {listRoute} intro={true}></SearchBox>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default memo(Header)