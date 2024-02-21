import styles from './styles.module.css'
import './featured.css'
import SectionTitle from '../../../../components/common/sectionTitle'
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Feature1 from '../../../../assets/feature1.png';
import Feature2 from '../../../../assets/feature2.png';
import Feature3 from '../../../../assets/feature3.png';
import { selectListRoute } from '../../../../feature/route/route.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getRouteJourney } from '../../../../utils/tripUtils';
import {getDesandDep} from '../../../../utils/routeUtils'
import { searchAction } from '../../../../feature/search/search.slice';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import routeThunk from '../../../../feature/route/route.service';
const Featured = () => {
    const {t, i18n} = useTranslation();
    const listRoute = useSelector(selectListRoute)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll:1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3,
                infinite: true,
                dots: true,
                arrows: true
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                arrows: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
    }

    const handleSearch = (route) => {
        var listRoutes = listRoute
        if (listRoutes.length > 0)
        {
            const { departure, destination } = getDesandDep(
                listRoutes,
                route.departure.name,
                route.destination.name,
            )
            const currentInfor = {
                arrivalDate: format(new Date(), 'dd/MM/yyyy'),
                departDate: format(new Date(), 'dd/MM/yyyy'),
                departLocation: departure,
                desLocation: destination,
                numberTicket: 1,
                searchRoute: route,
                oneway: true,
                turn: true,
            }
            dispatch(searchAction.setSearch(currentInfor))
            navigate('/trips'); 
        }
    }

    const getImage = (index) => {
        const divide = index % 3
        if (divide === 0)
            return Feature1
        else if (divide === 1)
            return Feature2
        else
            return Feature3
    }

    useEffect(() => {
        const loadData = () => {
            dispatch(routeThunk.getRoute())
            .then(() => {}
            )
            .catch((error)=>{});
        };
        if (listRoute.length === 0)
            loadData();
    }, [])

    return(
        <>
        <div className={styles.featuredContainer}>
            <SectionTitle title={t("feature.title")}
                    subtitle={t("feature.slogan")}></SectionTitle>

            <Slider {...settings}>
                {
                    listRoute.map((route, index) => (
                        <div className={styles.featuredItem} role="button" key={route.id} onClick={() => handleSearch(route)}>
                            <img src={getImage(index)}
                                alt=""
                                className={styles.futuredImg} />
                            <div className={styles.featuredTitles}>
                                <h1>{getRouteJourney(route)}</h1>
                            </div>
                        </div>
                    ))
                }
            </Slider>
            {/* </div> */}
        </div>
        </>
    )
}

export default Featured