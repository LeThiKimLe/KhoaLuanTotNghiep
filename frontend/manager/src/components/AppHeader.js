import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
    CButton,
    CBadge,
    CListGroup,
    CListGroupItem,
    CDropdownItem,
    CDropdownToggle,
    CDropdownMenu,
    CDropdown,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { kimnguyenlogo } from 'src/assets/brand/kimnguyenlogo_b'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { companyActions } from 'src/feature/bus-company/busCompany.slice'
import { selectListRequest } from 'src/feature/bus-company/busCompany.slice'
import { useEffect, useRef, useState } from 'react'
import Notification from 'src/views/notifications/Notification'

const AppHeader = () => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)
    const connection = useRef(null)
    const listRequest = useSelector(selectListRequest)
    const [openList, setOpenList] = useState(false)

    const handleNavToCompany = () => {
        window.location.href = '#/ticket-system/bus-companies'
    }

    useEffect(() => {
        // Kết nối tới máy chủ WebSocket
        const host = process.env.REACT_APP_SOCKET_URL
        const hostname = host ? host : window.location.hostname
        let connectionString = `ws://${hostname}/api/notice`
        const newSocket = new WebSocket(connectionString)
        connection.current = newSocket

        // Listen for messages
        connection.current.addEventListener('message', (event) => {
            const data = JSON.parse(event.data)
            //check if data is a list
            if (Array.isArray(data)) {
                dispatch(companyActions.getBusRequest(data))
            } else {
                dispatch(companyActions.addRequest(data))
            }
            console.log(data)
        })
        //Listen for errors
        connection.current.addEventListener('error', (event) => {
            console.log('Error:', event)
        })
        // Cleanup: Đóng kết nối khi component unmount
        return () => connection.current.close()
    }, [])

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderBrand className="mx-auto d-md-none" to="/">
                    <CIcon
                        icon={kimnguyenlogo}
                        height={48}
                        alt="Logo"
                        className="c-sidebar-brand-full"
                    />
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink to="/dashboard" component={NavLink}>
                            Dashboard
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav>
                    <CNavItem className="position-relative">
                        <CDropdown variant="nav-item">
                            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                                <CButton
                                    className="position-relative"
                                    variant="outline"
                                    color={openList ? 'primary' : 'secondary'}
                                    onClick={() => setOpenList(!openList)}
                                >
                                    <CIcon icon={cilBell} size="lg" />
                                    {listRequest.length > 0 && (
                                        <CBadge
                                            color="danger"
                                            position="top-end"
                                            shape="rounded-pill"
                                        >
                                            {listRequest.length}
                                            <span className="visually-hidden">unread messages</span>
                                        </CBadge>
                                    )}
                                </CButton>
                            </CDropdownToggle>
                            <CDropdownMenu
                                className="p-0"
                                placement="bottom-end"
                                style={{ width: 'max-content', maxWidth: '400px' }}
                            >
                                <CListGroup>
                                    {listRequest.map((item, index) => (
                                        <Notification
                                            onClick={() => {
                                                setOpenList(false)
                                                dispatch(companyActions.setOpenListRequest(true))
                                                handleNavToCompany()
                                            }}
                                            key={index}
                                            title={item.businessName + ' đã đăng ký bán vé'}
                                        >
                                            <small>{`Người đại diện: ${item.name}`}</small>
                                            <small>{` - SĐT: ${item.tel}`}</small>
                                        </Notification>
                                    ))}
                                </CListGroup>
                            </CDropdownMenu>
                        </CDropdown>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>
            <CHeaderDivider />
            <CContainer fluid>
                <AppBreadcrumb />
            </CContainer>
        </CHeader>
    )
}
export default AppHeader
