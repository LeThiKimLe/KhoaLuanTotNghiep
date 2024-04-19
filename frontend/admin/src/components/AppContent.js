import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import AdminProtectedRoute from './AdminProtectedRoute'
// routes config
import routes from '../routes'
import { useDispatch, useSelector } from 'react-redux'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
import { routeAction } from 'src/feature/route/route.slice'
import { getListAssignLocation } from 'src/utils/routeUtils'
import { locationAction } from 'src/feature/location/location.slice'
import routeThunk from 'src/feature/route/route.service'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import locationThunk from 'src/feature/location/location.service'

// const AppContent = () => {
//     return (
//         <CContainer lg>
//             <Suspense fallback={<CSpinner color="primary" />}>
//                 <Routes>
//                     {routes.map((route, idx) => {
//                         return (
//                             route.element && (
//                                 <Route
//                                     key={idx}
//                                     path={route.path}
//                                     exact={route.exact}
//                                     name={route.name}
//                                     element={<route.element />}
//                                 />
//                             )
//                         )
//                     })}
//                     <Route path="/" element={<Navigate to="dashboard" replace />} />
//                 </Routes>
//             </Suspense>
//         </CContainer>
//     )
// }

const AppContent = () => {
    const dispatch = useDispatch()
    const companyId = useSelector(selectCompanyId)
    //Get company route info
    const getCompanyRouteData = () => {
        dispatch(routeThunk.getRoute())
            .unwrap()
            .then((listRoute) => {
                return listRoute
            })
            .then(async (listRoute) => {
                let listCompanyAssign = []
                await dispatch(companyThunk.getAssignedRouteForCompany())
                    .unwrap()
                    .then((listAssign) => {
                        const listRouteAssign = listRoute
                            .filter((route) =>
                                listAssign.find((assign) => assign.routeId === route.id),
                            )
                            .map((route) => {
                                return {
                                    ...route,
                                    trips: route.trips.filter(
                                        (trip) => trip.busCompanyId === companyId,
                                    ),
                                }
                            })
                        console.log(listRouteAssign)
                        dispatch(routeAction.setCompanyRoute(listRouteAssign))
                        listCompanyAssign = listRouteAssign
                    })
                return listCompanyAssign
            })
            .then(async (listRouteAssign) => {
                const listCompanyLocation = getListAssignLocation(listRouteAssign)
                await dispatch(locationThunk.getLocations())
                    .unwrap()
                    .then((listLocation) => {
                        const listLocationAssign = listLocation.filter(
                            (local) =>
                                listCompanyLocation.findIndex((item) => item.id === local.id) !==
                                -1,
                        )
                        const filterStation = listLocationAssign.map((item) => {
                            const validStation = item.stations.filter(
                                (station) =>
                                    station.busCompanyId === companyId ||
                                    station.busCompanyId === null,
                            )
                            return {
                                ...item,
                                stations: validStation,
                            }
                        })
                        console.log(filterStation)
                        dispatch(locationAction.setCompanyLocation(filterStation))
                    })
            })
    }
    useEffect(() => {
        getCompanyRouteData()
    }, [])
    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Routes>
                    {routes.map((route, idx) =>
                        route.protected
                            ? route.element && (
                                  <Route element={<AdminProtectedRoute />}>
                                      <Route
                                          key={idx}
                                          path={route.path}
                                          exact={route.exact}
                                          name={route.name}
                                          element={<route.element />}
                                      />
                                  </Route>
                              )
                            : route.element && (
                                  <Route
                                      key={idx}
                                      path={route.path}
                                      exact={route.exact}
                                      name={route.name}
                                      element={<route.element />}
                                  />
                              ),
                    )}
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                </Routes>
            </Suspense>
        </CContainer>
    )
}

export default React.memo(AppContent)
