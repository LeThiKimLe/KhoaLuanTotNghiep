export const ROUTE_DATA =
    [
        {
            id: 1,
            distance: 133,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 2,
                name: "Trà Vinh"
            },
            price: 130000,
            schedule: "TP.HCM -> Long An -> Tiền Giang -> Bến Tre -> Trà Vinh",
            parents: null,
            hours: 4.5
        },
        {
            id: 2,
            distance: 100,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 3,
                name: "Bến Tre"
            },
            price: 100000,
            schedule: "TP.HCM -> Long An -> Tiền Giang -> Bến Tre",
            parents: 1,
            hours: 2.2
        },
        {
            id: 3,
            distance: 95,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 11,
                name: "Vũng Tàu"
            },
            price: 80000,
            schedule: "TP.HCM -> Cầu Đồng Nai -> Quốc lộ 51 -> Vũng Tàu",
            parents: null,
            hours: 3.5
        },
        {
            id: 4,
            distance: 350,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 4,
                name: "Cam Ranh"
            },
            price: 250000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Cam Ranh",
            parents: 5,
            hours: 8.1
        },
        {
            id: 5,
            distance: 427,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 5,
                name: "Nha Trang"
            },
            price: 275000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Cam Ranh -> Nha Trang",
            parents: 6,
            hours: 11
        },
        {
            id: 6,
            distance: 535,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 6,
                name: "Phú Yên"
            },
            price: 325000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên",
            parents: 7,
            hours: 12
        },
        {
            id: 7,
            distance: 585,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 7,
                name: "Bình Định"
            },
            price: 375000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên -> Bình Định",
            parents: 8,
            hours: 14.3
        },
        {
            id: 8,
            distance: 757,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 8,
                name: "Quảng Ngãi"
            },
            price: 400000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên -> Bình Định -> Quãng Ngãi",
            parents: null,
            hours: 18
        },
        {
            id: 9,
            distance: 980,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 9,
                name: "Đà Nẵng"
            },
            price: 450000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Quãng Ngãi -> Quảng Nam -> Đà Nẵng",
            parents: null,
            hours: 18
        },
        {
            id: 10,
            distance: 310,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 10,
                name: "Đà Lạt"
            },
            price: 225000,
            schedule: "TP.HCM -> cầu Sài Gòn -> xa lộ Hà Nội -> ngã tư Vũng Tàu -> đường Võ Nguyên Giáp -> quốc lộ 1 -> ngã ba Dầu Giây -> quốc lộ 20 -> Lâm Đồng -> Đà Lạt",
            parents: null,
            hours: 8
        },
        {
            id: 11,
            distance: 568,
            departure: {
                id: 9,
                name: "Đà Nẵng"
            },
            destination: {
                id: 4,
                name: "Cam Ranh"
            },
            price: 300000,
            schedule: "Đà Nẵng -> Quảng Nam -> Quảng Ngãi -> Bình Định -> Phú Yên -> Nha Trang -> Cam Ranh",
            parents: null,
            hours: 10
        },
        {
            id: 12,
            distance: 666,
            departure: {
                id: 9,
                name: "Đà Nẵng"
            },
            destination: {
                id: 10,
                name: "Đà Lạt"
            },
            price: 450000,
            schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
            parents: null,
            hours: 17
        },
        {
            id: 13,
            distance: 528,
            departure: {
                id: 9,
                name: "Đà Nẵng"
            },
            destination: {
                id: 5,
                name: "Nha Trang"
            },
            price: 275000,
            schedule: "Đà Nẵng -> Quảng Nam -> Quảng Ngãi -> Bình Định -> Phú Yên -> Nha Trang",
            parents: 11,
            hours: 9.3
        }
    ]


export const BOOKING_INFOR = {
    code: 'VAZ5UY',
    status: 'success',
    message: 'Vé được đặt thành công',
    ticketNumber: 2,
    route: {
        id: 12,
        distance: 666,
        departure: {
            id: 9,
            name: "Đà Nẵng"
        },
        destination: {
            id: 10,
            name: "Đà Lạt"
        },
        price: 450000,
        schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
        parents: null,
        hours: 17
    },
    trip: {
        id: 1,
        departDate: '20-12-2023',
        departTime: '18h',
        ticketPrice: 250000,
    },
    user: {
        id: 1232,
        name: 'Kim Lệ',
        tel: '0909090909',
        email: '123@gmail.com',
    },
    pickPoint: {
        id: 17,
        name: 'Bến xe Miền Đông'
    },
    transaction: {
        id: '12345678',
        transaction_type: 'Thanh toán',
        amount: 500000,
        paymentMethod: 'MoMo',
        paymentTime: '19:16:29 10-10-2023',
        status: 'Thành công'
    },
    tickets: [
        {
            code: '930958230583',
            seat: 'A3',
            billCode: '249873598347',
        },
        {
            code: '930958230584',
            seat: 'A5',
            billCode: '249873598348',
        },
        {
            code: '930958230585',
            seat: 'A7',
            billCode: '249873598349',
        }
    ],
    bus: {
        id: 123,
        licensePlate: '51C-78971'
    }
}

export const BILL_TEST_DATA = {
    code: '930958230584',
    seat: 'A5',
    billCode: '249873598348',
    booking: {
        bookingDate: '20-10-2023',
        route: {
            id: 12,
            distance: 666,
            departure: {
                id: 9,
                name: "Đà Nẵng"
            },
            destination: {
                id: 10,
                name: "Đà Lạt"
            },
            price: 450000,
            schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
            parents: null,
            hours: 17
        },
        trip: {
            id: 1,
            departDate: '20-12-2023',
            departTime: '18h',
            ticketPrice: 250000,
        },
        user: {
            id: 1232,
            name: 'Kim Lệ',
            tel: '0909090909',
            email: '123@gmail.com',
        },
        transaction: {
            id: '12345678',
            transaction_type: 'Thanh toán',
            amount: 500000,
            paymentMethod: 'MoMo',
            paymentTime: '19:16:29 10-10-2023',
            status: 'Thành công'
        },
        bus: {
            id: 123,
            licensePlate: '51C-78971'
        }
    }
}

export const COMMENT_LIST = [
    {
        id: 1,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: true
        },
        sendDate: '21-10-2023'
    },
    {
        id: 2,
        rate: 5,
        comment: "Từ chỗ nhà chờ mình có được cho ghế ngồi đợi. Xe mới, sạch sẽ, tốt, không có mùi xe cũ, có bánh nước, giường 2 người bằng kích cỡ giường cũ nhưng bỏ cái kệ bên cạnh ra, nằm một mình rất thoải mái, chăn gối cũng ok. Xe theo lịch rời bến muộn nhất lúc 11h nhưng 10h50 đã đi làm mình không kịp nhận đồ gửi. Vẫn là theo lịch 8h mới về tới nhà nhưng 6h mình đã tới nơi.",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 3,
        rate: 2,
        comment: "Từ chỗ nhà chờ mình có được cho ghế ngồi đợi. Xe mới, sạch sẽ, tốt, không có mùi xe cũ, có bánh nước, giường 2 người bằng kích cỡ giường cũ nhưng bỏ cái kệ bên cạnh ra, nằm một mình rất thoải mái, chăn gối cũng ok.",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: true
        },
        sendDate: '21-10-2023'
    },
    {
        id: 4,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt. Từ chỗ nhà chờ mình có được cho ghế ngồi đợi. Xe mới, sạch sẽ, tốt, không có mùi xe cũ, có bánh nước, giường 2 người bằng kích cỡ giường cũ nhưng bỏ cái kệ bên cạnh ra, nằm một mình rất thoải mái.",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: true
        },
        sendDate: '21-10-2023'
    },
    {
        id: 5,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 6,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 7,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 8,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 9,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 10,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    }
]


export const TRIP_DATA = [
    {
        id: 1,
        departTime: 18,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 4,
            departure: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 4,
                name: 'Cam Ranh'
            },
            hours: 9,
            distance: 189
        },
        bookedSeat: ['A1', 'A3', 'A5', 'B7'],
        bus: {
            busType: {
                id: 2,
                name: 'bumk_bus',
                capacity: 43,
                fee: 20000,
                description: 'Xe giường 43 chỗ',
                seatMap: {
                    id: 2,
                    rowNo: 7,
                    colNo: 5,
                    floorNo: 2,
                    seats: [
                        {
                            id: 29,
                            name: 'A01',
                            row: 0,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 30,
                            name: 'A02',
                            row: 0,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 31,
                            name: 'A03',
                            row: 0,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 32,
                            name: 'A04',
                            row: 1,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 33,
                            name: 'A05',
                            row: 1,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 34,
                            name: 'A06',
                            row: 1,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 35,
                            name: 'A07',
                            row: 2,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 36,
                            name: 'A08',
                            row: 2,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 37,
                            name: 'A09',
                            row: 2,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 38,
                            name: 'A10',
                            row: 3,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 39,
                            name: 'A11',
                            row: 3,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 40,
                            name: 'A12',
                            row: 3,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 41,
                            name: 'A13',
                            row: 4,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 42,
                            name: 'A14',
                            row: 4,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 43,
                            name: 'A15',
                            row: 4,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 44,
                            name: 'A16',
                            row: 5,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 45,
                            name: 'A17',
                            row: 5,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 46,
                            name: 'A18',
                            row: 6,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 47,
                            name: 'A19',
                            row: 6,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 48,
                            name: 'A20',
                            row: 6,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 49,
                            name: 'A21',
                            row: 6,
                            col: 3,
                            floor: 1
                        },
                        {
                            id: 50,
                            name: 'A22',
                            row: 6,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 51,
                            name: 'B01',
                            row: 0,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 52,
                            name: 'B02',
                            row: 0,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 53,
                            name: 'B03',
                            row: 0,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 54,
                            name: 'B04',
                            row: 1,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 55,
                            name: 'B05',
                            row: 1,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 56,
                            name: 'B06',
                            row: 1,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 57,
                            name: 'B07',
                            row: 2,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 58,
                            name: 'B08',
                            row: 2,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 59,
                            name: 'B09',
                            row: 2,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 60,
                            name: 'B10',
                            row: 3,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 61,
                            name: 'B11',
                            row: 3,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 62,
                            name: 'B12',
                            row: 3,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 63,
                            name: 'B13',
                            row: 4,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 64,
                            name: 'B14',
                            row: 4,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 65,
                            name: 'B15',
                            row: 4,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 66,
                            name: 'B17',
                            row: 5,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 67,
                            name: 'B18',
                            row: 6,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 68,
                            name: 'B19',
                            row: 6,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 69,
                            name: 'B20',
                            row: 6,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 70,
                            name: 'B21',
                            row: 6,
                            col: 3,
                            floor: 2
                        },
                        {
                            id: 71,
                            name: 'B22',
                            row: 6,
                            col: 4,
                            floor: 2
                        }
                    ]
                }
            }

        }
    },
    {
        id: 2,
        departTime: 9,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 30,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông Tây'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 5,
            departure: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 5,
                name: 'Nha Trang'
            },
            hours: 11,
            distance: 250
        },
        bookedSeat: ['A01', 'A03', 'A06', 'A09', 'A12', 'A15', 'B03',
            'B06', 'B09', 'B12', 'B15', 'B16'],
        bus: {
            busType: {
                id: 3,
                name: 'limousine',
                capacity: 33,
                fee: 50000,
                description: 'Xe limousine 33 chỗ',
                seatMap: {
                    id: 3,
                    rowNo: 6,
                    colNo: 3,
                    floorNo: 2,
                    seats: [
                        {
                            id: 72,
                            name: 'A01',
                            row: 0,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 73,
                            name: 'A02',
                            row: 0,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 74,
                            name: 'A03',
                            row: 1,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 75,
                            name: 'A04',
                            row: 1,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 76,
                            name: 'A05',
                            row: 1,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 77,
                            name: 'A06',
                            row: 2,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 78,
                            name: 'A07',
                            row: 2,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 79,
                            name: 'A08',
                            row: 2,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 80,
                            name: 'A09',
                            row: 3,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 81,
                            name: 'A10',
                            row: 3,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 82,
                            name: 'A11',
                            row: 3,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 83,
                            name: 'A12',
                            row: 4,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 84,
                            name: 'A13',
                            row: 4,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 85,
                            name: 'A14',
                            row: 4,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 86,
                            name: 'A15',
                            row: 5,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 87,
                            name: 'A16',
                            row: 5,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 88,
                            name: 'A17',
                            row: 5,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 89,
                            name: 'B02',
                            row: 0,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 90,
                            name: 'B03',
                            row: 1,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 91,
                            name: 'B04',
                            row: 1,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 92,
                            name: 'B05',
                            row: 1,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 93,
                            name: 'B06',
                            row: 2,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 94,
                            name: 'B07',
                            row: 2,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 95,
                            name: 'B08',
                            row: 2,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 96,
                            name: 'B09',
                            row: 3,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 97,
                            name: 'B10',
                            row: 3,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 98,
                            name: 'B11',
                            row: 3,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 99,
                            name: 'B12',
                            row: 4,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 100,
                            name: 'B13',
                            row: 4,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 101,
                            name: 'B14',
                            row: 4,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 102,
                            name: 'B15',
                            row: 5,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 103,
                            name: 'B16',
                            row: 5,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 104,
                            name: 'B17',
                            row: 5,
                            col: 2,
                            floor: 2
                        }
                    ]
                }
            }
        }
    },
    {
        id: 3,
        departTime: 15.5,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 4,
            departure: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 4,
                name: 'Cam Ranh'
            },
            hours: 9,
            distance: 189
        },
        bookedSeat: ['A1', 'A3', 'A5', 'B7'],
        bus: {
            busType: {
                id: 2,
                name: 'bumk_bus',
                capacity: 43,
                fee: 20000,
                description: 'Xe giường 43 chỗ',
                seatMap: {
                    id: 2,
                    rowNo: 7,
                    colNo: 5,
                    floorNo: 2,
                    seats: [
                        {
                            id: 29,
                            name: 'A01',
                            row: 0,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 30,
                            name: 'A02',
                            row: 0,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 31,
                            name: 'A03',
                            row: 0,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 32,
                            name: 'A04',
                            row: 1,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 33,
                            name: 'A05',
                            row: 1,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 34,
                            name: 'A06',
                            row: 1,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 35,
                            name: 'A07',
                            row: 2,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 36,
                            name: 'A08',
                            row: 2,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 37,
                            name: 'A09',
                            row: 2,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 38,
                            name: 'A10',
                            row: 3,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 39,
                            name: 'A11',
                            row: 3,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 40,
                            name: 'A12',
                            row: 3,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 41,
                            name: 'A13',
                            row: 4,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 42,
                            name: 'A14',
                            row: 4,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 43,
                            name: 'A15',
                            row: 4,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 44,
                            name: 'A16',
                            row: 5,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 45,
                            name: 'A17',
                            row: 5,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 46,
                            name: 'A18',
                            row: 6,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 47,
                            name: 'A19',
                            row: 6,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 48,
                            name: 'A20',
                            row: 6,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 49,
                            name: 'A21',
                            row: 6,
                            col: 3,
                            floor: 1
                        },
                        {
                            id: 50,
                            name: 'A22',
                            row: 6,
                            col: 4,
                            floor: 1
                        },
                        {
                            id: 51,
                            name: 'B01',
                            row: 0,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 52,
                            name: 'B02',
                            row: 0,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 53,
                            name: 'B03',
                            row: 0,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 54,
                            name: 'B04',
                            row: 1,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 55,
                            name: 'B05',
                            row: 1,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 56,
                            name: 'B06',
                            row: 1,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 57,
                            name: 'B07',
                            row: 2,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 58,
                            name: 'B08',
                            row: 2,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 59,
                            name: 'B09',
                            row: 2,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 60,
                            name: 'B10',
                            row: 3,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 61,
                            name: 'B11',
                            row: 3,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 62,
                            name: 'B12',
                            row: 3,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 63,
                            name: 'B13',
                            row: 4,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 64,
                            name: 'B14',
                            row: 4,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 65,
                            name: 'B15',
                            row: 4,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 66,
                            name: 'B17',
                            row: 5,
                            col: 4,
                            floor: 2
                        },
                        {
                            id: 67,
                            name: 'B18',
                            row: 6,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 68,
                            name: 'B19',
                            row: 6,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 69,
                            name: 'B20',
                            row: 6,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 70,
                            name: 'B21',
                            row: 6,
                            col: 3,
                            floor: 2
                        },
                        {
                            id: 71,
                            name: 'B22',
                            row: 6,
                            col: 4,
                            floor: 2
                        }
                    ]
                }
            }

        }
    },
    {
        id: 4,
        departTime: 23,
        departDate: '20-10-2020',
        ticketPrice: 245000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Miền Nam Nha Trang'
        },
        route: {
            id: 5,
            departure: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 5,
                name: 'Nha Trang'
            },
            hours: 11,
            distance: 189
        },
        bookedSeat: ['A02', 'A05', 'A08', 'A11', 'A14', 'A17',
            'B02', 'B05', 'B08', 'B11', 'B14', 'B17'],
        bus: {
            busType: {
                id: 3,
                name: 'limousine',
                capacity: 33,
                fee: 50000,
                description: 'Xe limousine 33 chỗ',
                seatMap: {
                    id: 3,
                    rowNo: 6,
                    colNo: 3,
                    floorNo: 2,
                    seats: [
                        {
                            id: 72,
                            name: 'A01',
                            row: 0,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 73,
                            name: 'A02',
                            row: 0,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 74,
                            name: 'A03',
                            row: 1,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 75,
                            name: 'A04',
                            row: 1,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 76,
                            name: 'A05',
                            row: 1,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 77,
                            name: 'A06',
                            row: 2,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 78,
                            name: 'A07',
                            row: 2,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 79,
                            name: 'A08',
                            row: 2,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 80,
                            name: 'A09',
                            row: 3,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 81,
                            name: 'A10',
                            row: 3,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 82,
                            name: 'A11',
                            row: 3,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 83,
                            name: 'A12',
                            row: 4,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 84,
                            name: 'A13',
                            row: 4,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 85,
                            name: 'A14',
                            row: 4,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 86,
                            name: 'A15',
                            row: 5,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 87,
                            name: 'A16',
                            row: 5,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 88,
                            name: 'A17',
                            row: 5,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 89,
                            name: 'B02',
                            row: 0,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 90,
                            name: 'B03',
                            row: 1,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 91,
                            name: 'B04',
                            row: 1,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 92,
                            name: 'B05',
                            row: 1,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 93,
                            name: 'B06',
                            row: 2,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 94,
                            name: 'B07',
                            row: 2,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 95,
                            name: 'B08',
                            row: 2,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 96,
                            name: 'B09',
                            row: 3,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 97,
                            name: 'B10',
                            row: 3,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 98,
                            name: 'B11',
                            row: 3,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 99,
                            name: 'B12',
                            row: 4,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 100,
                            name: 'B13',
                            row: 4,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 101,
                            name: 'B14',
                            row: 4,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 102,
                            name: 'B15',
                            row: 5,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 103,
                            name: 'B16',
                            row: 5,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 104,
                            name: 'B17',
                            row: 5,
                            col: 2,
                            floor: 2
                        }
                    ]
                }
            }
        }
    },
    {
        id: 5,
        departTime: 18,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Nha Trang'
        },
        route: {
            id: 5,
            departure: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 5,
                name: 'Nha Trang'
            },
            hours: 11,
            distance: 189
        },
        bookedSeat: ['A04', 'A07', 'A10', 'A13', 'A16', 'A08', 'A11', 'A14', 'A17',
            'A01', 'A02', 'A05', 'A03', 'A06', 'A09', 'A12', 'A15',
            'B04', 'B07', 'B10', 'B13', 'B16',
            'B03', 'B04', 'B02', 'B05'],
        bus: {
            busType: {
                id: 3,
                name: 'limousine',
                capacity: 33,
                fee: 50000,
                description: 'Xe limousine 33 chỗ',
                seatMap: {
                    id: 3,
                    rowNo: 6,
                    colNo: 3,
                    floorNo: 2,
                    seats: [
                        {
                            id: 72,
                            name: 'A01',
                            row: 0,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 73,
                            name: 'A02',
                            row: 0,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 74,
                            name: 'A03',
                            row: 1,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 75,
                            name: 'A04',
                            row: 1,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 76,
                            name: 'A05',
                            row: 1,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 77,
                            name: 'A06',
                            row: 2,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 78,
                            name: 'A07',
                            row: 2,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 79,
                            name: 'A08',
                            row: 2,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 80,
                            name: 'A09',
                            row: 3,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 81,
                            name: 'A10',
                            row: 3,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 82,
                            name: 'A11',
                            row: 3,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 83,
                            name: 'A12',
                            row: 4,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 84,
                            name: 'A13',
                            row: 4,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 85,
                            name: 'A14',
                            row: 4,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 86,
                            name: 'A15',
                            row: 5,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 87,
                            name: 'A16',
                            row: 5,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 88,
                            name: 'A17',
                            row: 5,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 89,
                            name: 'B02',
                            row: 0,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 90,
                            name: 'B03',
                            row: 1,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 91,
                            name: 'B04',
                            row: 1,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 92,
                            name: 'B05',
                            row: 1,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 93,
                            name: 'B06',
                            row: 2,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 94,
                            name: 'B07',
                            row: 2,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 95,
                            name: 'B08',
                            row: 2,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 96,
                            name: 'B09',
                            row: 3,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 97,
                            name: 'B10',
                            row: 3,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 98,
                            name: 'B11',
                            row: 3,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 99,
                            name: 'B12',
                            row: 4,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 100,
                            name: 'B13',
                            row: 4,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 101,
                            name: 'B14',
                            row: 4,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 102,
                            name: 'B15',
                            row: 5,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 103,
                            name: 'B16',
                            row: 5,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 104,
                            name: 'B17',
                            row: 5,
                            col: 2,
                            floor: 2
                        }
                    ]
                }
            }
        }
    },
    {
        id: 6,
        departTime: 7,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 4,
            departure: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 2,
                name: 'Cam Ranh'
            },
            hours: 9,
            distance: 189
        },
        bookedSeat: ['A12', 'A13', 'A14', 'A15', 'A16', 'A17',
            'B12', 'B13', 'B14', 'B15', 'B16', 'B17'],
        bus: {
            busType: {
                id: 3,
                name: 'limousine',
                capacity: 33,
                fee: 50000,
                description: 'Xe limousine 33 chỗ',
                seatMap: {
                    id: 3,
                    rowNo: 6,
                    colNo: 3,
                    floorNo: 2,
                    seats: [
                        {
                            id: 72,
                            name: 'A01',
                            row: 0,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 73,
                            name: 'A02',
                            row: 0,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 74,
                            name: 'A03',
                            row: 1,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 75,
                            name: 'A04',
                            row: 1,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 76,
                            name: 'A05',
                            row: 1,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 77,
                            name: 'A06',
                            row: 2,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 78,
                            name: 'A07',
                            row: 2,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 79,
                            name: 'A08',
                            row: 2,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 80,
                            name: 'A09',
                            row: 3,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 81,
                            name: 'A10',
                            row: 3,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 82,
                            name: 'A11',
                            row: 3,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 83,
                            name: 'A12',
                            row: 4,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 84,
                            name: 'A13',
                            row: 4,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 85,
                            name: 'A14',
                            row: 4,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 86,
                            name: 'A15',
                            row: 5,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 87,
                            name: 'A16',
                            row: 5,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 88,
                            name: 'A17',
                            row: 5,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 89,
                            name: 'B02',
                            row: 0,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 90,
                            name: 'B03',
                            row: 1,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 91,
                            name: 'B04',
                            row: 1,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 92,
                            name: 'B05',
                            row: 1,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 93,
                            name: 'B06',
                            row: 2,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 94,
                            name: 'B07',
                            row: 2,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 95,
                            name: 'B08',
                            row: 2,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 96,
                            name: 'B09',
                            row: 3,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 97,
                            name: 'B10',
                            row: 3,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 98,
                            name: 'B11',
                            row: 3,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 99,
                            name: 'B12',
                            row: 4,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 100,
                            name: 'B13',
                            row: 4,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 101,
                            name: 'B14',
                            row: 4,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 102,
                            name: 'B15',
                            row: 5,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 103,
                            name: 'B16',
                            row: 5,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 104,
                            name: 'B17',
                            row: 5,
                            col: 2,
                            floor: 2
                        }
                    ]
                }
            }
        }
    },
    {
        id: 7,
        departTime: 12,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe không nhận vận chuyển chó mèo',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 4,
            departure: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 2,
                name: 'Cam Ranh'
            },
            hours: 9,
            distance: 189
        },
        bookedSeat: ['A1', 'A3', 'A5', 'B7'],
        bus: {
            busType: {
                id: 3,
                name: 'limousine',
                capacity: 33,
                fee: 50000,
                description: 'Xe limousine 33 chỗ',
                seatMap: {
                    id: 3,
                    rowNo: 6,
                    colNo: 3,
                    floorNo: 2,
                    seats: [
                        {
                            id: 72,
                            name: 'A01',
                            row: 0,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 73,
                            name: 'A02',
                            row: 0,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 74,
                            name: 'A03',
                            row: 1,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 75,
                            name: 'A04',
                            row: 1,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 76,
                            name: 'A05',
                            row: 1,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 77,
                            name: 'A06',
                            row: 2,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 78,
                            name: 'A07',
                            row: 2,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 79,
                            name: 'A08',
                            row: 2,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 80,
                            name: 'A09',
                            row: 3,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 81,
                            name: 'A10',
                            row: 3,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 82,
                            name: 'A11',
                            row: 3,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 83,
                            name: 'A12',
                            row: 4,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 84,
                            name: 'A13',
                            row: 4,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 85,
                            name: 'A14',
                            row: 4,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 86,
                            name: 'A15',
                            row: 5,
                            col: 0,
                            floor: 1
                        },
                        {
                            id: 87,
                            name: 'A16',
                            row: 5,
                            col: 1,
                            floor: 1
                        },
                        {
                            id: 88,
                            name: 'A17',
                            row: 5,
                            col: 2,
                            floor: 1
                        },
                        {
                            id: 89,
                            name: 'B02',
                            row: 0,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 90,
                            name: 'B03',
                            row: 1,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 91,
                            name: 'B04',
                            row: 1,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 92,
                            name: 'B05',
                            row: 1,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 93,
                            name: 'B06',
                            row: 2,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 94,
                            name: 'B07',
                            row: 2,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 95,
                            name: 'B08',
                            row: 2,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 96,
                            name: 'B09',
                            row: 3,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 97,
                            name: 'B10',
                            row: 3,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 98,
                            name: 'B11',
                            row: 3,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 99,
                            name: 'B12',
                            row: 4,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 100,
                            name: 'B13',
                            row: 4,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 101,
                            name: 'B14',
                            row: 4,
                            col: 2,
                            floor: 2
                        },
                        {
                            id: 102,
                            name: 'B15',
                            row: 5,
                            col: 0,
                            floor: 2
                        },
                        {
                            id: 103,
                            name: 'B16',
                            row: 5,
                            col: 1,
                            floor: 2
                        },
                        {
                            id: 104,
                            name: 'B17',
                            row: 5,
                            col: 2,
                            floor: 2
                        }
                    ]
                }
            }
        }
    },
]


export const ticketHistory = [
    {
        code: 'VAZ5UY',
        status: 'success',
        message: 'Vé được đặt thành công',
        ticketNumber: 2,
        trip: {
            id: 1,
            departDate: '20-04-2023',
            departTime: '18',
            ticketPrice: 250000,
            route: {
                id: 10,
                distance: 666,
                departure: {
                    id: 9,
                    name: "Đà Nẵng"
                },
                destination: {
                    id: 10,
                    name: "Đà Lạt"
                },
                price: 450000,
                schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
                parents: null, 
                hours: 17,
                busType: {
                    id: 3,
                    name: 'limousine',
                    capacity: 33,
                    fee: 50000,
                    description: 'Xe limousine 33 chỗ',
                    seatMap: {
                        id: 3,
                        rowNo: 6,
                        colNo: 3,
                        floorNo: 2,
                        seats: [
                            {
                                id: 72,
                                name: 'A01',
                                row: 0,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 73,
                                name: 'A02',
                                row: 0,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 74,
                                name: 'A03',
                                row: 1,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 75,
                                name: 'A04',
                                row: 1,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 76,
                                name: 'A05',
                                row: 1,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 77,
                                name: 'A06',
                                row: 2,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 78,
                                name: 'A07',
                                row: 2,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 79,
                                name: 'A08',
                                row: 2,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 80,
                                name: 'A09',
                                row: 3,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 81,
                                name: 'A10',
                                row: 3,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 82,
                                name: 'A11',
                                row: 3,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 83,
                                name: 'A12',
                                row: 4,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 84,
                                name: 'A13',
                                row: 4,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 85,
                                name: 'A14',
                                row: 4,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 86,
                                name: 'A15',
                                row: 5,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 87,
                                name: 'A16',
                                row: 5,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 88,
                                name: 'A17',
                                row: 5,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 89,
                                name: 'B02',
                                row: 0,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 90,
                                name: 'B03',
                                row: 1,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 91,
                                name: 'B04',
                                row: 1,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 92,
                                name: 'B05',
                                row: 1,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 93,
                                name: 'B06',
                                row: 2,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 94,
                                name: 'B07',
                                row: 2,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 95,
                                name: 'B08',
                                row: 2,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 96,
                                name: 'B09',
                                row: 3,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 97,
                                name: 'B10',
                                row: 3,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 98,
                                name: 'B11',
                                row: 3,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 99,
                                name: 'B12',
                                row: 4,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 100,
                                name: 'B13',
                                row: 4,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 101,
                                name: 'B14',
                                row: 4,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 102,
                                name: 'B15',
                                row: 5,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 103,
                                name: 'B16',
                                row: 5,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 104,
                                name: 'B17',
                                row: 5,
                                col: 2,
                                floor: 2
                            }
                        ]
                    }
                }
            },
            bus: {
                id: 123,
                licensePlate: '51C-78971'
            }
        },
        user: {
            id: 1232,
            name: 'Kim Lệ',
            tel: '0909090909',
            email: '123@gmail.com',
        },
        pickPoint: {
            id: 17,
            name: 'Bến xe Miền Đông'
        },
        transaction: {
            id: '12345678',
            transaction_type: 'Thanh toán',
            amount: 500000,
            paymentMethod: 'MoMo',
            paymentTime: '19:16:29 10-10-2023',
            status: 'Thành công'
        },
        tickets: [
            {
                code: '930958230583',
                seat: 'A3',
                billCode: '249873598347',
            },
            {
                code: '930958230584',
                seat: 'A5',
                billCode: '249873598348',
            },
            {
                code: '930958230585',
                seat: 'A7',
                billCode: '249873598349',
            }
        ]
    },
    {
        code: 'VAZ5UE',
        status: 'pending',
        message: 'Vé đang chờ thanh toán',
        ticketNumber: 2,
        trip: {
            id: 1,
            departDate: '20-12-2023',
            departTime: '18',
            ticketPrice: 250000,
            route: {
                id: 10,
                distance: 666,
                departure: {
                    id: 9,
                    name: "Đà Nẵng"
                },
                destination: {
                    id: 10,
                    name: "Đà Lạt"
                },
                price: 450000,
                schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
                parents: null,
                hours: 17,
                busType: {
                    id: 3,
                    name: 'limousine',
                    capacity: 33,
                    fee: 50000,
                    description: 'Xe limousine 33 chỗ',
                    seatMap: {
                        id: 3,
                        rowNo: 6,
                        colNo: 3,
                        floorNo: 2,
                        seats: [
                            {
                                id: 72,
                                name: 'A01',
                                row: 0,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 73,
                                name: 'A02',
                                row: 0,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 74,
                                name: 'A03',
                                row: 1,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 75,
                                name: 'A04',
                                row: 1,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 76,
                                name: 'A05',
                                row: 1,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 77,
                                name: 'A06',
                                row: 2,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 78,
                                name: 'A07',
                                row: 2,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 79,
                                name: 'A08',
                                row: 2,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 80,
                                name: 'A09',
                                row: 3,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 81,
                                name: 'A10',
                                row: 3,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 82,
                                name: 'A11',
                                row: 3,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 83,
                                name: 'A12',
                                row: 4,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 84,
                                name: 'A13',
                                row: 4,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 85,
                                name: 'A14',
                                row: 4,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 86,
                                name: 'A15',
                                row: 5,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 87,
                                name: 'A16',
                                row: 5,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 88,
                                name: 'A17',
                                row: 5,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 89,
                                name: 'B02',
                                row: 0,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 90,
                                name: 'B03',
                                row: 1,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 91,
                                name: 'B04',
                                row: 1,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 92,
                                name: 'B05',
                                row: 1,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 93,
                                name: 'B06',
                                row: 2,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 94,
                                name: 'B07',
                                row: 2,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 95,
                                name: 'B08',
                                row: 2,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 96,
                                name: 'B09',
                                row: 3,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 97,
                                name: 'B10',
                                row: 3,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 98,
                                name: 'B11',
                                row: 3,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 99,
                                name: 'B12',
                                row: 4,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 100,
                                name: 'B13',
                                row: 4,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 101,
                                name: 'B14',
                                row: 4,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 102,
                                name: 'B15',
                                row: 5,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 103,
                                name: 'B16',
                                row: 5,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 104,
                                name: 'B17',
                                row: 5,
                                col: 2,
                                floor: 2
                            }
                        ]
                    }
                }
            },
            bus: {
                id: 123,
                licensePlate: '51C-78971'
            },
            turn: 1
        },
        user: {
            id: 1232,
            name: 'Kim Lệ',
            tel: '0909090909',
            email: '123@gmail.com',
        },
        pickPoint: {
            id: 17,
            name: 'Bến xe Miền Đông'
        },
        transaction: {
            id: '12345678',
            transaction_type: 'Thanh toán',
            amount: 500000,
            paymentMethod: 'MoMo',
            paymentTime: '19:16:29 10-10-2023',
            status: 'Thành công'
        },
        tickets: [
            {
                code: '930958230583',
                seat: 'A3',
                billCode: '249873598347',
            },
            {
                code: '930958230584',
                seat: 'A5',
                billCode: '249873598348',
            },
            {
                code: '930958230585',
                seat: 'A7',
                billCode: '249873598349',
            }
        ]
    },
    {
        code: 'VAE5UY',
        status: 'cancel',
        message: 'Vé đã bị hủy',
        ticketNumber: 2,
        trip: {
            id: 1,
            departDate: '20-12-2023',
            departTime: '18',
            ticketPrice: 250000,
            route: {
                id: 10,
                distance: 666,
                departure: {
                    id: 9,
                    name: "Đà Nẵng"
                },
                destination: {
                    id: 10,
                    name: "Đà Lạt"
                },
                price: 450000,
                schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
                parents: null,
                hours: 17,
                busType: {
                    id: 3,
                    name: 'limousine',
                    capacity: 33,
                    fee: 50000,
                    description: 'Xe limousine 33 chỗ',
                    seatMap: {
                        id: 3,
                        rowNo: 6,
                        colNo: 3,
                        floorNo: 2,
                        seats: [
                            {
                                id: 72,
                                name: 'A01',
                                row: 0,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 73,
                                name: 'A02',
                                row: 0,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 74,
                                name: 'A03',
                                row: 1,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 75,
                                name: 'A04',
                                row: 1,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 76,
                                name: 'A05',
                                row: 1,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 77,
                                name: 'A06',
                                row: 2,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 78,
                                name: 'A07',
                                row: 2,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 79,
                                name: 'A08',
                                row: 2,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 80,
                                name: 'A09',
                                row: 3,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 81,
                                name: 'A10',
                                row: 3,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 82,
                                name: 'A11',
                                row: 3,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 83,
                                name: 'A12',
                                row: 4,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 84,
                                name: 'A13',
                                row: 4,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 85,
                                name: 'A14',
                                row: 4,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 86,
                                name: 'A15',
                                row: 5,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 87,
                                name: 'A16',
                                row: 5,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 88,
                                name: 'A17',
                                row: 5,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 89,
                                name: 'B02',
                                row: 0,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 90,
                                name: 'B03',
                                row: 1,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 91,
                                name: 'B04',
                                row: 1,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 92,
                                name: 'B05',
                                row: 1,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 93,
                                name: 'B06',
                                row: 2,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 94,
                                name: 'B07',
                                row: 2,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 95,
                                name: 'B08',
                                row: 2,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 96,
                                name: 'B09',
                                row: 3,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 97,
                                name: 'B10',
                                row: 3,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 98,
                                name: 'B11',
                                row: 3,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 99,
                                name: 'B12',
                                row: 4,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 100,
                                name: 'B13',
                                row: 4,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 101,
                                name: 'B14',
                                row: 4,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 102,
                                name: 'B15',
                                row: 5,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 103,
                                name: 'B16',
                                row: 5,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 104,
                                name: 'B17',
                                row: 5,
                                col: 2,
                                floor: 2
                            }
                        ]
                    }
                }
            },
            bus: {
                id: 123,
                licensePlate: '51C-78971'
            }

        },
        user: {
            id: 1232,
            name: 'Kim Lệ',
            tel: '0909090909',
            email: '123@gmail.com',
        },
        pickPoint: {
            id: 17,
            name: 'Bến xe Miền Đông'
        },
        transaction: {
            id: '12345678',
            transaction_type: 'Thanh toán',
            amount: 500000,
            paymentMethod: 'MoMo',
            paymentTime: '19:16:29 10-10-2023',
            status: 'Thành công'
        },
        tickets: [
            {
                code: '930958230583',
                seat: 'A3',
                billCode: '249873598347',
            },
            {
                code: '930958230584',
                seat: 'A5',
                billCode: '249873598348',
            },
            {
                code: '930958230585',
                seat: 'A7',
                billCode: '249873598349',
            }
        ]
    },
    {
        code: 'VOZ5UY',
        status: 'success',
        message: 'Vé được đặt thành công',
        ticketNumber: 2,
        trip: {
            id: 1,
            departDate: '20-12-2023',
            departTime: '18',
            ticketPrice: 250000,
            route: {
                id: 10,
                distance: 666,
                departure: {
                    id: 9,
                    name: "Đà Nẵng"
                },
                destination: {
                    id: 10,
                    name: "Đà Lạt"
                },
                price: 450000,
                schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
                parents: null,
                hours: 17
            },
            bus: {
                id: 123,
                licensePlate: '51C-78971'
            }

        },
        user: {
            id: 1232,
            name: 'Kim Lệ',
            tel: '0909090909',
            email: '123@gmail.com',
        },
        pickPoint: {
            id: 17,
            name: 'Bến xe Miền Đông'
        },
        transaction: {
            id: '12345678',
            transaction_type: 'Thanh toán',
            amount: 500000,
            paymentMethod: 'MoMo',
            paymentTime: '19:16:29 10-10-2023',
            status: 'Thành công'
        },
        tickets: [
            {
                code: '930958230583',
                seat: 'A3',
                billCode: '249873598347',
            },
            {
                code: '930958230584',
                seat: 'A5',
                billCode: '249873598348',
            },
            {
                code: '930958230585',
                seat: 'A7',
                billCode: '249873598349',
            }
        ]  
    },
    {
        code: 'VAZ5IY',
        status: 'success',
        message: 'Vé được đặt thành công',
        ticketNumber: 2,
        trip: {
            id: 1,
            departDate: '20-12-2023',
            departTime: '18',
            ticketPrice: 250000,
            route: {
                id: 10,
                distance: 666,
                departure: {
                    id: 9,
                    name: "Đà Nẵng"
                },
                destination: {
                    id: 10,
                    name: "Đà Lạt"
                },
                price: 450000,
                schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
                parents: null,
                hours: 17,
                busType: {
                    id: 3,
                    name: 'limousine',
                    capacity: 33,
                    fee: 50000,
                    description: 'Xe limousine 33 chỗ',
                    seatMap: {
                        id: 3,
                        rowNo: 6,
                        colNo: 3,
                        floorNo: 2,
                        seats: [
                            {
                                id: 72,
                                name: 'A01',
                                row: 0,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 73,
                                name: 'A02',
                                row: 0,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 74,
                                name: 'A03',
                                row: 1,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 75,
                                name: 'A04',
                                row: 1,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 76,
                                name: 'A05',
                                row: 1,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 77,
                                name: 'A06',
                                row: 2,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 78,
                                name: 'A07',
                                row: 2,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 79,
                                name: 'A08',
                                row: 2,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 80,
                                name: 'A09',
                                row: 3,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 81,
                                name: 'A10',
                                row: 3,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 82,
                                name: 'A11',
                                row: 3,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 83,
                                name: 'A12',
                                row: 4,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 84,
                                name: 'A13',
                                row: 4,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 85,
                                name: 'A14',
                                row: 4,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 86,
                                name: 'A15',
                                row: 5,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 87,
                                name: 'A16',
                                row: 5,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 88,
                                name: 'A17',
                                row: 5,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 89,
                                name: 'B02',
                                row: 0,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 90,
                                name: 'B03',
                                row: 1,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 91,
                                name: 'B04',
                                row: 1,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 92,
                                name: 'B05',
                                row: 1,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 93,
                                name: 'B06',
                                row: 2,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 94,
                                name: 'B07',
                                row: 2,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 95,
                                name: 'B08',
                                row: 2,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 96,
                                name: 'B09',
                                row: 3,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 97,
                                name: 'B10',
                                row: 3,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 98,
                                name: 'B11',
                                row: 3,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 99,
                                name: 'B12',
                                row: 4,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 100,
                                name: 'B13',
                                row: 4,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 101,
                                name: 'B14',
                                row: 4,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 102,
                                name: 'B15',
                                row: 5,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 103,
                                name: 'B16',
                                row: 5,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 104,
                                name: 'B17',
                                row: 5,
                                col: 2,
                                floor: 2
                            }
                        ]
                    }
                }
            },
            bus: {
                id: 123,
                licensePlate: '51C-78971'
            }
        },
        user: {
            id: 1232,
            name: 'Kim Lệ',
            tel: '0909090909',
            email: '123@gmail.com',
        },
        pickPoint: {
            id: 17,
            name: 'Bến xe Miền Đông'
        },
        transaction: {
            id: '12345678',
            transaction_type: 'Thanh toán',
            amount: 500000,
            paymentMethod: 'MoMo',
            paymentTime: '19:16:29 10-10-2023',
            status: 'Thành công'
        },
        tickets: [
            {
                code: '930958230583',
                seat: 'A3',
                billCode: '249873598347',
            },
            {
                code: '930958230584',
                seat: 'A5',
                billCode: '249873598348',
            },
            {
                code: '930958230585',
                seat: 'A7',
                billCode: '249873598349',
            }
        ]
    },
    {
        code: 'EAZ5IY',
        status: 'success',
        message: 'Vé được đặt thành công',
        ticketNumber: 2,
        trip: {
            id: 1,
            departDate: '20-12-2023',
            departTime: '18',
            ticketPrice: 250000,
            route: {
                id: 10,
                distance: 666,
                departure: {
                    id: 9,
                    name: "Đà Nẵng"
                },
                destination: {
                    id: 10,
                    name: "Đà Lạt"
                },
                price: 450000,
                schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
                parents: null,
                hours: 17,
                busType: {
                    id: 3,
                    name: 'limousine',
                    capacity: 33,
                    fee: 50000,
                    description: 'Xe limousine 33 chỗ',
                    seatMap: {
                        id: 3,
                        rowNo: 6,
                        colNo: 3,
                        floorNo: 2,
                        seats: [
                            {
                                id: 72,
                                name: 'A01',
                                row: 0,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 73,
                                name: 'A02',
                                row: 0,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 74,
                                name: 'A03',
                                row: 1,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 75,
                                name: 'A04',
                                row: 1,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 76,
                                name: 'A05',
                                row: 1,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 77,
                                name: 'A06',
                                row: 2,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 78,
                                name: 'A07',
                                row: 2,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 79,
                                name: 'A08',
                                row: 2,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 80,
                                name: 'A09',
                                row: 3,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 81,
                                name: 'A10',
                                row: 3,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 82,
                                name: 'A11',
                                row: 3,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 83,
                                name: 'A12',
                                row: 4,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 84,
                                name: 'A13',
                                row: 4,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 85,
                                name: 'A14',
                                row: 4,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 86,
                                name: 'A15',
                                row: 5,
                                col: 0,
                                floor: 1
                            },
                            {
                                id: 87,
                                name: 'A16',
                                row: 5,
                                col: 1,
                                floor: 1
                            },
                            {
                                id: 88,
                                name: 'A17',
                                row: 5,
                                col: 2,
                                floor: 1
                            },
                            {
                                id: 89,
                                name: 'B02',
                                row: 0,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 90,
                                name: 'B03',
                                row: 1,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 91,
                                name: 'B04',
                                row: 1,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 92,
                                name: 'B05',
                                row: 1,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 93,
                                name: 'B06',
                                row: 2,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 94,
                                name: 'B07',
                                row: 2,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 95,
                                name: 'B08',
                                row: 2,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 96,
                                name: 'B09',
                                row: 3,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 97,
                                name: 'B10',
                                row: 3,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 98,
                                name: 'B11',
                                row: 3,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 99,
                                name: 'B12',
                                row: 4,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 100,
                                name: 'B13',
                                row: 4,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 101,
                                name: 'B14',
                                row: 4,
                                col: 2,
                                floor: 2
                            },
                            {
                                id: 102,
                                name: 'B15',
                                row: 5,
                                col: 0,
                                floor: 2
                            },
                            {
                                id: 103,
                                name: 'B16',
                                row: 5,
                                col: 1,
                                floor: 2
                            },
                            {
                                id: 104,
                                name: 'B17',
                                row: 5,
                                col: 2,
                                floor: 2
                            }
                        ]
                    }
                }
            },
            bus: {
                id: 123,
                licensePlate: '51C-78971'
            }
        },
        user: {
            id: 1232,
            name: 'Kim Lệ',
            tel: '0909090909',
            email: '123@gmail.com',
        },
        pickPoint: {
            id: 17,
            name: 'Bến xe Miền Đông'
        },
        transaction: {
            id: '12345678',
            transaction_type: 'Thanh toán',
            amount: 500000,
            paymentMethod: 'MoMo',
            paymentTime: '19:16:29 10-10-2023',
            status: 'Thành công'
        },
        tickets: [
            {
                code: '930958230583',
                seat: 'A3',
                billCode: '249873598347',
            },
            {
                code: '930958230584',
                seat: 'A5',
                billCode: '249873598348',
            },
            {
                code: '930958230585',
                seat: 'A7',
                billCode: '249873598349',
            }
        ]
    }
]