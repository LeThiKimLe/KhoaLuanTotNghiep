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
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CListGroup,
    CListGroupItem,
    CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { kimnguyenlogo } from 'src/assets/brand/kimnguyenlogo_b'
import { selectListNotice } from 'src/feature/notification/notice.slice'
import Notification from 'src/views/notifications/Notification'
import { useNavigate } from 'react-router-dom'

const AppHeader = () => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)
    const listNotice = useSelector(selectListNotice)
    const [openList, setOpenList] = React.useState(false)
    const navigate = useNavigate()
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
                                    {listNotice.length > 0 && (
                                        <CBadge
                                            color="danger"
                                            position="top-end"
                                            shape="rounded-pill"
                                        >
                                            {listNotice.length}
                                            <span className="visually-hidden">Thông báo</span>
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
                                    {listNotice.map((item, index) => (
                                        <Notification
                                            onClick={() => {
                                                navigate(item.location)
                                            }}
                                            key={index}
                                            title={item.title}
                                        >
                                            <small>{item.content}</small>
                                        </Notification>
                                    ))}
                                </CListGroup>
                                {listNotice.length === 0 && (
                                    <CListGroup>
                                        <CListGroupItem className="text-center">
                                            Không có thông báo mới
                                        </CListGroupItem>
                                    </CListGroup>
                                )}
                            </CDropdownMenu>
                        </CDropdown>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilList} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilEnvelopeOpen} size="lg" />
                        </CNavLink>
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
