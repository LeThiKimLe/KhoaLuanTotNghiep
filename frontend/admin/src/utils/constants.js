export const GENDER_OPTION = [
    {
        value: 1,
        label: 'Nữ',
    },
    {
        value: 0,
        label: 'Nam',
    },
]

export const UPDATE_INFOR = [
    {
        id: 1,
        name: 'tel',
        type: 'text',
        placeholder: 'Số điện thoại',
        errorMessage: 'Số điện thoại dạng +xxx... hoặc 0xxx...',
        label: 'Số điện thoại',
        pattern: '^(0d{9,10}|+d{1,3}s?d{1,14})$',
        required: false,
        role: [1, 2, 3, 4],
        editable: [1],
    },
    {
        id: 2,
        name: 'name',
        type: 'text',
        placeholder: 'Họ và tên',
        errorMessage: 'Tên không quá 30 ký tự',
        label: 'Họ và tên',
        pattern: '^.{1,30}$',
        required: false,
        role: [1, 2, 3, 4],
        editable: [2, 3, 4],
    },
    {
        id: 3,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        errorMessage: '',
        label: 'Email',
        required: false,
        role: [1, 2, 3, 4],
        editable: [2, 3, 4],
    },
    {
        id: 4,
        name: 'gender',
        type: 'select',
        placeholder: 'Chọn giới tính',
        errorMessage: '',
        label: 'Giới tính',
        options: GENDER_OPTION,
        role: [1, 2, 3, 4],
        editable: [],
    },
    {
        id: 5,
        name: 'address',
        type: 'text',
        placeholder: 'Địa chỉ',
        errorMessage: '',
        label: 'Địa chỉ',
        role: [2, 3, 4],
        editable: [],
    },
    {
        id: 6,
        name: 'idCard',
        type: 'text',
        placeholder: 'CCCD',
        pattern: '^d{9}$|^d{12}$',
        errorMessage: 'CCCD chỉ chứa 9 hoặc 12 số',
        label: 'CCCD',
        role: [2, 3, 4],
        editable: [2, 3, 4],
    },
    {
        id: 7,
        name: 'beginWorkDate',
        type: 'text',
        placeholder: 'Work Day',
        pattern: '',
        errorMessage: '',
        label: 'Ngày làm việc',
        role: [2, 3, 4],
        editable: [2, 3, 4],
    },
    {
        id: 8,
        name: 'licenseNumber',
        type: 'text',
        placeholder: 'Số bằng lái',
        pattern: '',
        errorMessage: '',
        label: 'Số hiệu bằng lái',
        role: [4],
        editable: [4],
    },
    {
        id: 9,
        name: 'issueDate',
        type: 'text',
        placeholder: 'Ngày cấp bằng',
        pattern: '',
        errorMessage: '',
        label: 'Ngày cấp bằng lái',
        role: [4],
        editable: [4],
    },
]

export const COLOR_STATE = {
    success: 'green',
    pending: '#9a9a0f',
    cancel: 'red',
    info: 'blue',
}

export const dayInWeek = [
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
    'Chủ nhật',
]

export const MONTH_IN_YEAR = [
    'Tháng một',
    'Tháng hai',
    'Tháng ba',
    'Tháng tư',
    'Tháng năm',
    'Tháng sáu',
    'Tháng bảy',
    'Tháng tám',
    'Tháng chín',
    'Tháng mười',
    'Tháng mười một',
    'Tháng mười hai',
]

export const COLOR = ['info', 'warning', 'success', 'danger', 'dark', 'light']

export const TIME_TABLE = {
    morning: {
        label: 'Sáng',
        from: 6,
        to: 12,
        color: 'success',
    },
    afternoon: {
        label: 'Chiều',
        from: 12,
        to: 18,
        color: 'primary',
    },
    evening: {
        label: 'Tối',
        from: 18,
        to: 24,
        color: 'infor',
    },
    late: {
        label: 'Khuya',
        from: 0,
        to: 6,
        color: 'warning',
    },
}

export const TRIP_STATUS = [
    {
        value: 0,
        label: 'Đăng ký',
        description: 'Tuyến xe đã được đăng ký trên hệ thống bán vé',
        helpDocument: 'https://www.google.com',
    },
    {
        value: 1,
        label: 'Chọn loại xe',
        description: 'Tạo loại phương tiện và phân cho tuyến xe',
        helpDocument: 'https://www.google.com',
    },
    {
        value: 2,
        label: 'Cập nhật giá vé',
        description: 'Cập nhật giá vé cho tuyến xe',
        helpDocument: 'https://www.google.com',
    },
    {
        value: 3,
        label: 'Cập nhật trạm',
        description:
            'Cập nhật thông tin về bãi đỗ, trạm đón - trả (nếu có), dừng nghỉ (nếu có) cho tuyến',
        helpDocument: 'https://www.google.com',
    },
    {
        value: 4,
        label: 'Sẵn sàng mở bán vé',
        description: 'Nhà xe có thể mở bán các chuyến xe',
        helpDocument: 'https://www.google.com',
    },
]

export const ORDER_STATE = [
    {
        value: 1,
        label: 'Đã cấp lệnh',
        describe: 'Admin cấp lệnh vận chuyển chuyến xe cho tài xế',
        condition: 'Tài xế đã cập nhật trạng thái xe là an toàn trong ngày',
    },
    {
        value: 2,
        label: 'Đã nhận lệnh',
        describe: 'Tài xế đã nhận lệnh vận chuyển chuyến xe',
        condition:
            'Admin đã cấp lệnh vận chuyển cho tài xế và upload hình ảnh lệnh vận chuyển có chữ ký của quản lý nhà xe và tài xế',
    },
    {
        value: 3,
        label: 'Xuất bến',
        describe: 'Lệnh vận chuyển đã xuất có xác nhận rời bến của bến đi',
        condition:
            'Tài xế đã nhận lệnh vận chuyển, đến bến đi và upload hình ảnh có chứa xác nhận của bến đi',
    },
    {
        value: 4,
        label: 'Đến bến',
        describe: 'Lệnh vận chuyển đã có xác nhận nhập bến của bến đến',
        condition:
            'Tài xế đã xuất bến, đến bến đến và upload hình ảnh có chứa xác nhận của bến đến',
    },
    {
        value: 5,
        label: 'Đã hoàn thành',
        describe: 'Quản lý nhà xe đã xác nhận thông tin lệnh vận chuyển hoàn tất',
        condition: 'Lệnh vận chuyển đã có đủ xác nhận',
    },
]

export const SCHEDULE_STATE = [
    {
        value: 1,
        label: 'Rời bãi đỗ',
        data: 'Rời bãi đỗ',
        needOrder: 'Đã nhận lệnh',
        stationType: ['park-start'],
        reverse: false,
        condition: 'Cần nhận lệnh vận chuyển',
    },
    {
        value: 2,
        label: 'Đến bến đi',
        data: 'Đến bến đi',
        needOrder: 'Xuất bến',
        stationType: ['pick', 'departure'],
        reverse: false,
        condition: 'Cần cập nhật lệnh vận chuyển trước',
    },
    {
        value: 3,
        label: 'Tiếp tục hành trình',
        data: 'Đang đi',
        needOrder: '',
        stationType: [],
        reverse: true,
        condition: '',
    },
    {
        value: 4,
        label: 'Đến trạm đón',
        data: 'Đến trạm đón',
        needOrder: '',
        stationType: ['pick'],
        reverse: true,
        condition: '',
    },
    {
        value: 5,
        label: 'Đến trạm trả',
        data: 'Đến trạm trả',
        needOrder: '',
        stationType: ['drop'],
        reverse: true,
        condition: '',
    },
    {
        value: 6,
        label: 'Đến trạm dừng chân',
        data: 'Đến trạm dừng chân',
        needOrder: '',
        stationType: ['stop'],
        reverse: true,
        condition: '',
    },
    {
        value: 7,
        label: 'Đến bến đến',
        data: 'Đến bến đến',
        needOrder: 'Đến bến',
        stationType: ['drop', 'destination'],
        reverse: false,
        condition: 'Cần cập nhật lệnh vận chuyển trước',
    },
    {
        value: 8,
        label: 'Về bãi đỗ',
        data: 'Về bãi đỗ',
        needOrder: '',
        stationType: ['park-end'],
        reverse: false,
        condition: '',
    },
    {
        value: 9,
        label: 'Hoàn thành',
        data: 'Hoàn thành',
        needOrder: '',
        stationType: ['park-end'],
        reverse: false,
        condition: '',
    },
    {
        value: -1,
        label: 'Hủy',
        data: 'Hủy',
        needOrder: '',
        stationType: ['park-start'],
        reverse: false,
        condition: '',
    },
]

export const SAMPLE_FILE_TYPE = {
    staff: 'staff',
    driver: 'driver',
    bus: 'bus',
}
