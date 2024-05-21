import React from 'react'
import CancelTicket from './views/searchTicket/action/CancelTicket'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//Profile
const UserProfile = React.lazy(() => import('./views/profile/infor/Infor'))
const ChangePassword = React.lazy(() => import('./views/profile/changePassword/ChangePassword'))

//Booking
const Booking = React.lazy(() => import('./views/booking/Booking'))

//Search ticket
const SearchTicket = React.lazy(() => import('./views/searchTicket/SearchTicket'))

//Request confirm
const ConfirmCancel = React.lazy(() => import('./views/confirmCancel/ConfirmCancel'))

//Employee Management
const DriverManagement = React.lazy(() => import('./views/employees/DriverManagement'))
const StaffManagement = React.lazy(() => import('./views/employees/StaffManagement'))
const DetailEmployee = React.lazy(() => import('./views/employees/DetailEmployee'))
const DetailDriver = React.lazy(() => import('./views/employees/DetailDriver'))

//SystemManagement
const StationManagement = React.lazy(() => import('./views/system/StationManagement'))
const BusManagement = React.lazy(() => import('./views/system/BusManagement'))
const RouteManagement = React.lazy(() => import('./views/system/RouteManagement'))
const SpecialDayManagement = React.lazy(() => import('./views/schedule/SpecialDayManage'))
const ReviewManagement = React.lazy(() => import('./views/system/ReviewManagement'))
const BusTypeManagement = React.lazy(() => import('./views/system/BusTypeManagement'))
const TripManagement = React.lazy(() => import('./views/system/TripManagement'))

//ScheduleManagement
const ScheduleManagement = React.lazy(() => import('./views/schedule/ScheduleManagement'))
const TripDistribute = React.lazy(() => import('./views/schedule/TripDistribute'))

//Chat
const Chat = React.lazy(() => import('./views/chat/Chat'))

//Company Info
const CompanyInfor = React.lazy(() => import('./views/profile/company/CompanyInfor'))

//Expense Management
const Expense = React.lazy(() => import('./views/expense/Expense'))

//Transportation Management
const ScheduleTracking = React.lazy(() => import('./views/schedule/ScheduleTracking'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard, protected: true },
    { path: '/profile/infor', name: 'Thông tin nhân viên', element: UserProfile },
    { path: '/profile/change-password', name: 'Đổi mật khẩu', element: ChangePassword },
    { path: '/company/infor', name: 'Thông tin nhà xe', element: CompanyInfor },
    { path: '/booking', name: 'Đặt vé', element: Booking },
    { path: '/search-ticket', name: 'Tìm vé', element: SearchTicket },
    { path: '/confirm-cancel', name: 'Duyệt hủy vé', element: ConfirmCancel },
    { path: '/chat', name: 'Cửa sổ khách hàng', element: Chat },
    {
        path: '/employee-manage',
        name: 'Quản lý nhân sự',
        element: StaffManagement,
        exact: true,
        protected: true,
    },
    {
        path: '/employee-manage/staffs',
        name: 'Quản lý nhân viên',
        element: StaffManagement,
        protected: true,
    },
    {
        path: '/employee-manage/drivers',
        name: 'Quản lý tài xế',
        element: DriverManagement,
        protected: true,
    },
    {
        path: '/employee-manage/staffs/detail',
        name: 'Chi tiết nhân viên',
        element: DetailEmployee,
        protected: true,
    },
    {
        path: '/employee-manage/drivers/detail',
        name: 'Chi tiết tài xế',
        element: DetailDriver,
        protected: true,
    },
    {
        path: '/system-manage',
        name: 'Quản lý hệ thống',
        element: StationManagement,
        exact: true,
        protected: true,
    },
    {
        path: '/system-manage/trips',
        name: 'Quản lý tuyến xe',
        element: TripManagement,
        protected: true,
    },
    {
        path: '/system-manage/locations',
        name: 'Quản lý trạm xe',
        element: StationManagement,
        protected: true,
    },
    {
        path: '/system-manage/routes',
        name: 'Quản lý tuyến xe',
        element: RouteManagement,
        protected: true,
    },
    {
        path: '/system-manage/bus-types',
        name: 'Quản lý loại xe',
        element: BusTypeManagement,
        protected: true,
    },
    {
        path: '/system-manage/buses',
        name: 'Quản lý xe',
        element: BusManagement,
        protected: true,
    },
    {
        path: '/system-manage/special-date',
        name: 'Quản lý ngày',
        element: SpecialDayManagement,
        protected: true,
    },
    {
        path: '/system-manage/reviews',
        name: 'Quản lý đánh giá',
        element: ReviewManagement,
        protected: true,
    },
    {
        path: '/system-manage/expense',
        name: 'Quản lý chi phí',
        element: Expense,
        protected: true,
    },
    {
        path: '/schedule-manage',
        name: 'Điều hành xe',
        element: ScheduleManagement,
        exact: true,
        protected: true,
    },
    {
        path: '/schedule-manage/schedule',
        name: 'Lịch trình xe',
        element: ScheduleManagement,
        protected: true,
    },
    {
        path: '/schedule-manage/distribute',
        name: 'Thống kê tuyến',
        element: TripDistribute,
        protected: true,
    },
    {
        path: '/schedule-manage/tracking',
        name: 'Quản lý chuyến xe',
        element: ScheduleTracking,
        protected: true,
    },
]

export default routes
