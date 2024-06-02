import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import AdminProtectedRoute from './AdminProtectedRoute'
// routes config
import routes from '../routes'
import { useDispatch, useSelector } from 'react-redux'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
import { routeAction, selectListRoute } from 'src/feature/route/route.slice'
import { getListAssignLocation } from 'src/utils/routeUtils'
import { locationAction } from 'src/feature/location/location.slice'
import routeThunk from 'src/feature/route/route.service'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import locationThunk from 'src/feature/location/location.service'
import {
    companyActions,
    selectListCompany,
    selectUpdate,
} from 'src/feature/bus-company/busCompany.slice'
import feeThunk from 'src/feature/fee/fee.service'
import { feeAction, selectListFee, selectServiceDueDate } from 'src/feature/fee/fee.slice'
import { convertToDisplayDate, subStractDays } from 'src/utils/convertUtils'
import parse from 'date-fns/parse'
import { useNavigate } from 'react-router-dom'
import { noticeAction } from 'src/feature/notification/notice.slice'

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
    const update = useSelector(selectUpdate)
    const dueDate = useSelector(selectServiceDueDate)
    const [allowAccess, setAllowAccess] = React.useState(true)
    const navigate = useNavigate()
    const listFee = useSelector(selectListFee)
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
                        dispatch(locationAction.setCompanyLocation(filterStation))
                    })
            })
            .then(() => {
                dispatch(companyActions.setUpdate(false))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getCompanyData = () => {
        dispatch(companyThunk.getCompany())
            .unwrap()
            .then((listCompany) => {
                const company = listCompany.find((company) => company.busCompany.id === companyId)
                if (company) dispatch(companyActions.setCurCompany(company))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getNextDueDay = (day) => {
        var currentDay = parse(day, 'yyyy-MM-dd', new Date())
        var currentMonth = currentDay.getMonth()
        var nextDate = new Date(currentDay.getTime())
        nextDate.setDate(5)
        nextDate.setMonth(currentMonth + 1)
        return nextDate
    }

    const getServiceData = () => {
        dispatch(feeThunk.getFee())
            .unwrap()
            .then((res) => {
                const companyFee = res.filter((fee) => fee.company.id == companyId)
                // Sort fees based on status and dueDate
                const sortedFees = companyFee.sort((a, b) => {
                    return new Date(b.dueDate) - new Date(a.dueDate)
                })
                // Get the first fee from the sorted array
                const lastestFee = sortedFees[0]
                if (lastestFee) {
                    if (lastestFee.status === 'Đã thanh toán') {
                        const dueDate = getNextDueDay(lastestFee.dueDate)
                        dispatch(feeAction.setServiceDueDate(dueDate))
                    } else {
                        dispatch(feeAction.setServiceDueDate(new Date(lastestFee.dueDate)))
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getDueFeeNotice = () => {
        if (listFee.length > 0) {
            const sortedFees = [...listFee].sort((a, b) => {
                return new Date(b.dueDate) - new Date(a.dueDate)
            })
            const dueFee = sortedFees[0]
            if (dueFee && dueFee.status !== 'Đã thanh toán') {
                const dueDate = new Date(dueFee.dueDate)
                const currentDate = new Date()
                const diffTime = dueDate - currentDate
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                if (diffDays <= 5 && diffDays >= 0) {
                    const newNotice = {
                        id: dueFee.id,
                        title: 'Phí dịch vụ sắp đến hạn',
                        content: `Phí dịch vụ sắp đến hạn vào ngày ${dueFee.dueDate}!`,
                        type: 'fee',
                        location: '/system-manage/expense',
                    }
                    dispatch(noticeAction.addNotice(newNotice))
                } else if (diffDays < 0) {
                    const newNotice = {
                        id: dueFee.id,
                        title: 'Phí dịch vụ đã quá hạn',
                        content: `Phí dịch vụ đã quá hạn vào ngày ${convertToDisplayDate(
                            dueFee.dueDate,
                        )}!. Hệ thống sẽ bị khóa cho đến khi bạn thanh toán phí dịch vụ!`,
                        type: 'fee',
                        location: '/system-manage/expense',
                    }
                    dispatch(noticeAction.addNotice(newNotice))
                }
            }
        }
    }
    useEffect(() => {
        getCompanyRouteData()
        getCompanyData()
        getServiceData()
    }, [])
    useEffect(() => {
        if (update) getCompanyRouteData()
    }, [update])
    useEffect(() => {
        if (dueDate < new Date()) {
            setAllowAccess(false)
        } else {
            setAllowAccess(true)
        }
    }, [dueDate])
    useEffect(() => {
        getDueFeeNotice()
    }, [listFee])

    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Routes>
                    {routes
                        .filter((rt) => allowAccess || (!allowAccess && rt.limit === false))
                        .map((route, idx) =>
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
