import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import { ROUTE_DATA } from '../../../utils/test_data'
import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Route from './route'
import { useSelector } from 'react-redux'
import { selectListRoute } from '../../../feature/route/route.slice'

const Schedule = () => {
    const listRoute = useSelector(selectListRoute)
    const [filteredRoute, setFilteredRoute] = useState(listRoute)
    const [exchange, setExchange] = useState(true)
    const [departure, setDeparture] = useState('')
    const [destination, setDestination] = useState('')
    
    const handleExchange = () => {
        if (exchange)
            setExchange(false)
        else
            setExchange(true)
        setDeparture(destination)
        setDestination(departure)
    }

    const changeDeparture = (e) => {
        setDeparture(e.target.value)
        
    }

    const changeDestination = (e) => {
        setDestination(e.target.value)
    }

    useEffect(()=>{

        var updatedRoute = [...listRoute];
        var depQuery = departure.toLowerCase()
        var desQuery = destination.toLowerCase()

        updatedRoute= updatedRoute.filter((route) => 
            route.departure.name.toLowerCase().indexOf(depQuery.toLowerCase()) !== -1 &&
            route.destination.name.toLowerCase().indexOf(desQuery.toLowerCase()) !== -1 ||
            route.destination.name.toLowerCase().indexOf(depQuery.toLowerCase()) !== -1 &&
            route.departure.name.toLowerCase().indexOf(desQuery.toLowerCase()) !== -1
        );

        setFilteredRoute(updatedRoute);
          
    }, [departure,destination])

    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="schedule"/>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.searchBar}>
                            <div className={styles.searchPlace}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <input  type="text" 
                                        placeholder='Điểm đi' 
                                        value={departure}
                                        onChange={changeDeparture}
                                        />
                            </div>
                            <div className={styles.searchExchange} onClick={handleExchange}>
                                {exchange ? 
                                    (<FontAwesomeIcon icon={faArrowRightArrowLeft}/>)
                                    :
                                    (<FontAwesomeIcon icon={faArrowRightArrowLeft} flip="horizontal"/>) 
                                }
                            </div>
                            <div className={styles.searchPlace}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <input  type="text" 
                                        placeholder='Điểm đến' 
                                        value={destination}
                                        onChange={changeDestination}
                                />
                            </div>
                        </div>
                        {filteredRoute.map((route) => (
                            <Route  key={route.id}
                                    route={route} 
                                    reverse={route.departure.name.toLowerCase().indexOf(departure) !==-1 ? false : true}>
                            </Route>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Schedule
