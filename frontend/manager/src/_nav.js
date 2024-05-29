import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilBook, cilGarage, cilChatBubble } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        protected: true,
    },
    {
        component: CNavTitle,
        name: 'Quản trị hệ thống',
        protected: true,
    },
    {
        component: CNavGroup,
        name: 'Hệ thống đặt vé',
        to: '/ticket-system',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Quản lý tuyến',
                to: '/ticket-system/routes',
            },
            {
                component: CNavItem,
                name: 'Quản lý nhà xe',
                to: '/ticket-system/bus-companies',
            },
            {
                component: CNavItem,
                name: 'Quản lý phí',
                to: '/ticket-system/fee-manage',
            },
        ],
        protected: true,
    },
    {
        component: CNavGroup,
        name: 'Hệ thống vận chuyển',
        to: '/grab-system',
        icon: <CIcon icon={cilGarage} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Đối tác vận chuyển',
                to: '/grab-system/transport-partner',
            },
        ],
        protected: true,
    },
    {
        component: CNavItem,
        name: 'Cửa sổ khách hàng',
        to: '/chat',
        icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    },
]

export default _nav
