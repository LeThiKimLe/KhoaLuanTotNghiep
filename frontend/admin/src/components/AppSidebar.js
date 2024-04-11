import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import { kimnguyenlogo } from 'src/assets/brand/kimnguyenlogo_w'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { slideActions } from 'src/feature/slide/slide.slice'
import { selectSidebarShow, selectSidebarUnfoldable } from 'src/feature/slide/slide.slice'
import { selectUser } from 'src/feature/auth/auth.slice'
// sidebar nav config
import navigation from '../_nav'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { selectListCompany } from 'src/feature/bus-company/busCompany.slice'
import { useEffect } from 'react'

const AppSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useSelector(selectSidebarShow)
    const sidebarShow = useSelector(selectSidebarUnfoldable)
    const listCompany = useSelector(selectListCompany)
    const user = useSelector(selectUser)
    const companyInfo = listCompany?.find((company) => company.id === user.user.staff.busCompanyId)
    useEffect(() => {
        if (listCompany.length === 0) {
            dispatch(companyThunk.getCompany())
        }
    }, [])
    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch(slideActions.setSidebarShow(visible))
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" to="/">
                <div
                    className="sidebar-brand-full"
                    style={{
                        fontWeight: '700',
                        fontSize: '25px',
                        textTransform: 'uppercase',
                    }}
                >
                    {companyInfo ? companyInfo.name : 'Nhà xe'}
                </div>
                {/* <CIcon className="sidebar-brand-full" icon={kimnguyenlogo} height={35} /> */}
                <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={navigation} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch(slideActions.setSidebarUnfoldable(!unfoldable))}
            />
        </CSidebar>
    )
}

export default React.memo(AppSidebar)
