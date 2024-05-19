import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { companyActions } from 'src/feature/bus-company/busCompany.slice'
import companyThunk from 'src/feature/bus-company/busCompany.service'
// routes config
import routes from '../routes'
import { useDispatch, useSelector } from 'react-redux'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
const AppContent = () => {
    const dispatch = useDispatch()
    const companyId = useSelector(selectCompanyId)
    const getCompanyData = () => {
        dispatch(companyThunk.getCompany())
            .unwrap()
            .then((listCompany) => {
                const company = listCompany.find((company) => company.busCompany.id === companyId)
                if (company) dispatch(companyActions.setCurCompany(company))
            })
    }
    useEffect(() => {
        getCompanyData()
    }, [])
    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Routes>
                    {routes.map((route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={<route.element />}
                                />
                            )
                        )
                    })}
                    <Route path="/" element={<Navigate to="trips" replace />} />
                </Routes>
            </Suspense>
        </CContainer>
    )
}
export default React.memo(AppContent)
