import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Profile
const UserProfile = React.lazy(() => import('./views/profile/infor/Infor'))
const ChangePassword = React.lazy(() => import('./views/profile/changePassword/ChangePassword'))

//System Manager
const TransportManagement = React.lazy(() => import('./views/system-manager/grab-system/Transport'))
const CompanyManagement = React.lazy(() => import('./views/system-manager/ticket-system/Company'))
const SystemRouteManagement = React.lazy(() => import('./views/system-manager/ticket-system/Route'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard, protected: true },
    { path: '/profile/infor', name: 'Thông tin tài xế', element: UserProfile },
    { path: '/profile/change-password', name: 'Đổi mật khẩu', element: ChangePassword },
    {
        path: '/ticket-system',
        name: 'Hệ thống đặt vé',
        element: SystemRouteManagement,
        exact: true,
        protected: true,
    },
    {
        path: '/ticket-system/routes',
        name: 'Quản lý tuyến',
        element: SystemRouteManagement,
        protected: true,
    },
    {
        path: '/ticket-system/bus-companies',
        name: 'Quản lý nhà xe',
        element: CompanyManagement,
        protected: true,
    },
    {
        path: '/grab-system',
        name: 'Hệ thống đối tác vận chuyển',
        element: TransportManagement,
        exact: true,
        protected: true,
    },
    {
        path: '/grab-system/transport-partner',
        name: 'Quản lý đối tác vận chuyển',
        element: TransportManagement,
        protected: true,
    },
]

export default routes