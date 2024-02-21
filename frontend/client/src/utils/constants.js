import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faClockRotateLeft, faUnlockKeyhole, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons"

export const PROFILE_ACTION = [
    {
        title: 'Thông tin tài khoản',
        index: 1,
        roles: [1,2,3,4],
        name: 'account-infor',
        navigate: true,
        icon: faCircleUser,
        subDescription: 'Chỉnh sửa các thông tin cá nhân'
    },
    {
        title: 'Lịch sử đặt vé',
        index: 2,
        roles: [1],
        name: 'ticket-history',
        navigate: true,
        icon: faClockRotateLeft,
        subDescription: 'Xem lại lịch sử đặt vé'
    },
    {
        title: 'Đổi mật khẩu',
        index: 3,
        roles: [1,2,3,4],
        name: 'change-password',
        navigate: true,
        icon: faUnlockKeyhole,
        subDescription: 'Đổi mật khẩu đăng nhập tài khoản'

    },

    {
        title: 'Đăng xuất',
        index: 4,
        roles: [1,2,3,4],
        name: 'logout',
        navigate: false,
        icon: faRightToBracket,
        subDescription: 'Đăng xuất khỏi phiên làm việc'
    },
]

export const GENDER_OPTION = [
    {
        value: 1,
        label: 'Nữ'
    },
    {
        value: 0,
        label: 'Nam'                        
    }
]

export const UPDATE_INFOR = [
    {
        id: 1,
        name: "tel",
        type: "text",
        placeholder: "Số điện thoại",
        errorMessage: "Sai số điện thoại",
        label: "Số điện thoại",
        pattern: "^0[0-9]{9,10}$",
        required: false,
        role:[1,2,3,4],
        editable: [1]
    },
    {
        id: 2,
        name: "name",
        type: "text",
        placeholder: "Họ và tên",
        errorMessage: "Tên không quá 30 ký tự",
        label: "Họ và tên",
        pattern: "^.{1,30}$",
        required: false,
        role:[1,2,3,4],
        editable: [2,3,4]
    },
    {
        id: 3,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "",
        label: "Email",
        required: false,
        role:[1,2,3,4],
        editable: [2,3,4]
    },
    {
        id: 4,
        name: "gender",
        type: "select",
        placeholder: "Chọn giới tính",
        errorMessage: "",
        label: "Giới tính",
        options: GENDER_OPTION,
        role:[1,2,3,4],
        editable: []
    },
    {
        id: 5,
        name: "address",
        type: "text",
        placeholder: "Địa chỉ",
        errorMessage: "",
        label: "Địa chỉ",
        role:[2,3,4],
        editable: []
    },
    {
        id: 6,
        name: "idCard",
        type: "text",
        placeholder: "CCCD",
        pattern: "^\d{9}$|^\d{12}$",
        errorMessage: "CCCD chỉ chứa 9 hoặc 12 số",
        label: "CCCD",
        role:[2,3,4],
        editable: [2,3,4]
    },
    {
        id: 7,
        name: "beginWorkDate",
        type: "text",
        placeholder: "Work Day",
        pattern: "",
        errorMessage: "",
        label: "Ngày làm việc",
        role:[2,3,4],
        editable: [2,3,4]
    },
    {
        id: 8,
        name: "licenseNumber",
        type: "text",
        placeholder: "Số bằng lái",
        pattern: "",
        errorMessage: "",
        label: "Số hiệu bằng lái",
        role:[4],
        editable: [4]
    },
    {
        id: 9,
        name: "issueDate",
        type: "text",
        placeholder: "Ngày cấp bằng",
        pattern: "",
        errorMessage: "",
        label: "Ngày cấp bằng lái",
        role:[4],
        editable: [4]
    }
]

export const TICKET_INFOR = [
    {
        id: 1,
        name: "tel",
        type: "text",
        placeholder: "Số điện thoại",
        errorMessage: "Sai số điện thoại",
        label: "Số điện thoại",
        pattern: "^0[0-9]{9,10}$",
        required: true,
        
    },
    {
        id: 2,
        name: "booking_code",
        type: "text",
        placeholder: "Mã đặt vé",
        errorMessage: "Mã đặt vé phải đúng 6 ký tự, không chứa ký tự thường và đặc biệt",
        label: "Mã đặt vé",
        pattern: "^[A-Z0-9]{6}$",
        required: true,
        
    }
]

export const BILL_INFOR = [
    {
        id: 1,
        name: "billCode",
        type: "text",
        placeholder: "Mã số hóa đơn",
        errorMessage: "Mã hóa đơn có 7 ký tự",
        label: "Mã hóa đơn",
        pattern: "^[a-zA-Z0-9]{7}$",
        required: true,
    },
    {
        id: 2,
        name: "captchaCode",
        type: "text",
        placeholder: "Nhập mã xác thực có trong hình",
        errorMessage: "Mã xác thực có đúng 6 ký tự",
        label: "Mã xác thực",
        pattern: "^[a-zA-Z0-9]{6}$",
        required: true,
    }
]

export const STATE_DICTIONARY = [
    {
        key: 'success',
        value: 'Thành công',
        message: 'Đặt vé thành công'
    },
    {
        key: 'pending',
        value: 'Giữ chỗ',
        message: 'Chờ thanh toán'
    },
    {
        key: 'cancel',
        value: 'Đã hủy',
        message: 'Thanh toán thất bại'
    }
] 

export const TICKET_STATE_DICTIONARY = [
    {
        key: 'success',
        value: 'Đã thanh toán',
        message: 'Thành công'
    },
    {
        key: 'pending',
        value: 'Chờ thanh toán',
        message: 'Chờ thanh toán'
    },
    {
        key: 'cancel',
        value: 'Đã hủy',
        message: 'Đã hủy'
    },
    {
        key: 'canceling',
        value: 'Chờ hủy',
        message: 'Chờ hủy'
    },
]
