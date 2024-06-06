import React, { useEffect, useState } from 'react'
import { CCol, CFormSelect, CRow } from '@coreui/react'
import { getRouteJourney, tripProcess, getTripJourney } from 'src/utils/tripUtils'
import { useSelector } from 'react-redux'
import { selectCompanyId } from 'src/feature/auth/auth.slice'

const TripPicker = ({
    listRoute,
    route,
    setRoute,
    trip,
    setTrip,
    baseOption,
    additionalOption,
}) => {
    const companyId = useSelector(selectCompanyId)
    const listTrip = tripProcess(listRoute, companyId)
    const [curTrip, setCurTrip] = useState(null)
    useEffect(() => {
        if (route != 0 && route != -1) {
            const tp = listTrip.find((t) => t.route.id === route)
            setTrip(tp.turnGo.id)
        } else {
            setTrip(0)
        }
    }, [route])
    useEffect(() => {
        if (trip != 0 && trip != -1 && listTrip.length > 0) {
            const tp = listTrip.find((t) => t.turnGo.id === trip || t.turnBack.id === trip)
            setCurTrip(tp)
        }
    }, [trip])
    return (
        <div>
            <CFormSelect
                id="route-select"
                value={route}
                onChange={(e) => setRoute(parseInt(e.target.value))}
            >
                <option value={baseOption.value}>{baseOption.label}</option>
                {listRoute.map((rt) => (
                    <option key={rt.id} value={rt.id}>
                        {getRouteJourney(rt)}
                    </option>
                ))}
                {additionalOption &&
                    additionalOption.map((add, index) => (
                        <option value={add.value} key={index}>
                            {add.label}
                        </option>
                    ))}
            </CFormSelect>
            {route !== 0 && route !== -1 && (
                <div className="mt-3">
                    <i>{curTrip ? getTripJourney(curTrip) : 'Chưa có chuyến xe'}</i>
                </div>
            )}
        </div>
    )
}

export default TripPicker
