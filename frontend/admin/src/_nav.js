import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilCalculator,
    cilChartPie,
    cilCursor,
    cilNotes,
    cilPencil,
    cilPuzzle,
    cilSpeedometer,
    cilStar,
    cilBook,
    cilSearch,
    cilPeople,
    cilFactory,
    cilCalendar,
    cilChatBubble,
    cilGarage,
} from '@coreui/icons'
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
        name: 'Công việc',
    },
    {
        component: CNavItem,
        name: 'Đặt vé',
        to: '/booking',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Tìm vé',
        to: '/search-ticket',
        icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Duyệt hủy vé',
        to: '/confirm-cancel',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
        badge: {
            color: 'success',
            text: '',
        },
    },
    {
        component: CNavItem,
        name: 'Cửa sổ khách hàng',
        to: '/chat',
        icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
        badge: {
            color: 'success',
            text: '',
        },
    },
    {
        component: CNavTitle,
        name: 'Quản lý',
        protected: true,
    },
    {
        component: CNavGroup,
        name: 'Quản lý nhân sự',
        to: '/employee-manage',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Quản lý nhân viên',
                to: '/employee-manage/staffs',
            },
            {
                component: CNavItem,
                name: 'Quản lý tài xế',
                to: '/employee-manage/drivers',
            },
        ],
        protected: true,
    },
    {
        component: CNavGroup,
        name: 'Quản lý hệ thống',
        to: '/system-manage',
        icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Quản lý tuyến xe',
                to: '/system-manage/trips',
            },
            {
                component: CNavItem,
                name: 'Quản lý trạm xe',
                to: '/system-manage/locations',
            },
            // {
            //     component: CNavItem,
            //     name: 'Quản lý tuyến xe',
            //     to: '/system-manage/routes',
            // },
            {
                component: CNavItem,
                name: 'Quản lý loại xe',
                to: '/system-manage/bus-types',
            },
            {
                component: CNavItem,
                name: 'Quản lý xe',
                to: '/system-manage/buses',
            },
            {
                component: CNavItem,
                name: 'Quản lý ngày',
                to: '/system-manage/special-date',
            },
            {
                component: CNavItem,
                name: 'Quản lý đánh giá',
                to: '/system-manage/reviews',
            },
        ],
        protected: true,
    },
    {
        component: CNavItem,
        name: 'Quản lý chi phí',
        to: '/system-manage/expense',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        protected: true,
        limit: false,
    },
    {
        component: CNavGroup,
        name: 'Điều hành xe',
        to: '/schedule-manage',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Lịch trình xe',
                to: '/schedule-manage/schedule',
            },
            {
                component: CNavItem,
                name: 'Quản lý chuyến xe',
                to: '/schedule-manage/tracking',
            },
            // {
            //     component: CNavItem,
            //     name: 'Thống kê tuyến',
            //     to: '/schedule-manage/distribute',
            // },
        ],
        protected: true,
    },
]

export default _nav
