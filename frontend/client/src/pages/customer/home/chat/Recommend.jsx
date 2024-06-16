import { useDispatch, useSelector } from 'react-redux'
import routeThunk from '../../../../feature/route/route.service'
import { useEffect } from 'react'
import axios from 'axios'
import { selectListReview } from '../../../../feature/review/review.slice'
import { getTripJourney } from '../../../../utils/tripUtils'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import styles from './styles.module.css'
import { selectListCompany } from '../../../../feature/bus-company/busCompany.slice'
import busCompanyThunk from '../../../../feature/bus-company/busCompany.service'
import { OptionButton } from '../../../../components/common/button'
import Select from 'react-select'

const Recommend = ({ show, setShow, handleSearch }) => {
    const [startPoint, setStartPoint] = useState({ detail: '', province: 'TP. Hồ Chí Minh' })
    const [endPoint, setEndPoint] = useState({ detail: '', province: 'Khánh Hòa' })
    const dispatch = useDispatch()
    const [listRoute, setListRoute] = useState([])
    const listReview = useSelector(selectListReview)
    const listCompany = useSelector(selectListCompany)
    const [listProvince, setListProvince] = useState([])
    const [startProvince, setStartProvince] = useState(null)
    const [endProvince, setEndProvince] = useState(null)
    const [loading, setLoading] = useState(false)
    //get latitude, long of address
    const handleSearchPosition = async (point) => {
        //split address by comma
        const addressArray = point.detail.split(',')
        addressArray.push(point.province)
        let address = ''
        let result = null
        for (let i = 0; i < addressArray.length; i++) {
            //combine address from i to end
            if (result != null)
                break
            address = addressArray.slice(i).join(',')
            //get location from address
            await axios
                .get(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                        address,
                    )}&format=json`,
                )
                .then((response) => {
                    if (response.data && response.data.length > 0) {
                        const { lat, lon, name } = response.data[0]
                        result = { latitude: lat, longitude: lon, address: point.detail, name: name }
                    }
                })
                .catch((error) => {
                    console.log('Error retrieving coordinates:', error)
                })
        }
        return result
    }
    const calculateDistance = (coord1, coord2) => {
        const deltaX = coord1.latitude - coord2.latitude;
        const deltaY = coord2.longitude - coord2.longitude;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        return distance;
    }

    const getCompanyRate = (companyId) => {
        const reviewList = listReview.filter((item) => item?.scheduleTrip?.busCompany?.id === companyId)
        const rate = reviewList.reduce((total, review) => total + review.rate, 0) / (reviewList.length + 1)
        return rate
    }

    const evaluateTrip = (trip, start, end) => {
        const listPickStationPoint = []
        const listDropStationPoint = []
        let point = null

        // Đánh giá điểm xuất phát dựa trên khoảng cách
        for (let i = 0; i < trip.stopStations.length; i++) {
            point = { latitude: trip.stopStations[i].station.latitude, longitude: trip.stopStations[i].station.longitude }
            if (trip.stopStations[i].stationType === 'pick') {
                listPickStationPoint.push({
                    stopStation: trip.stopStations[i].station.name,
                    point: 1 / (calculateDistance(point, start) + 1)
                })
            } else if (trip.stopStations[i].stationType === 'drop') {
                listDropStationPoint.push({
                    stopStation: trip.stopStations[i].station.name,
                    point: 1 / (calculateDistance(point, end) + 1)
                })
            }
        }

        // Đánh giá nhà xe dựa trên đánh giá
        const ratingEvaluation = getCompanyRate(trip.busCompanyId);

        // Tổng hợp các đánh giá thành một điểm tổng quan
        const totalEvaluation =
            listPickStationPoint.reduce((max, point) => max.point > point.point ? max : point).point +
            listDropStationPoint.reduce((max, point) => max.point > point.point ? max : point).point
            ;
        return {
            'Tuyến': `${trip.startStation.location.name} - ${trip.endStation.location.name}`,
            'Chuyến': getTripJourney(trip),
            'Giá vé': trip.price,
            'Khoảng cách': trip.distance,
            'Lộ trình di chuyển': trip.schedule,
            'Thời gian di chuyển': trip.hours,
            'Nhà xe': listCompany.find(company => company.busCompany.id === trip.busCompanyId).busCompany.name,
            totalEvaluation: totalEvaluation,
            //item with highest point in listPickStationPoint
            'Trạm đón gần nhất': listPickStationPoint.reduce((max, point) => max.point > point.point ? max : point),
            //item with highest point in listDropStationPoint
            'Trạm trả gần nhất': listDropStationPoint.reduce((max, point) => max.point > point.point ? max : point),
            'Đánh giá nhà xe': ratingEvaluation
        };
    }

    const makeComparision = (listTrip) => {
        //add index to listTrip
        listTrip.forEach((trip, index) => {
            trip.index = index
        })
        const bestPrice = listTrip.reduce((max, trip) => max['Giá vé'] < trip['Giá vé'] ? max : trip)
        const bestDistance = listTrip.reduce((max, trip) => max['Khoảng cách'] < trip['Khoảng cách'] ? max : trip)
        const bestTime = listTrip.reduce((max, trip) => max['Thời gian di chuyển'] < trip['Thời gian di chuyển'] ? max : trip)
        const bestPickStation = listTrip.reduce((max, trip) => max['Trạm đón gần nhất'].point > trip['Trạm đón gần nhất'].point ? max : trip)
        const bestDropStation = listTrip.reduce((max, trip) => max['Trạm trả gần nhất'].point > trip['Trạm trả gần nhất'].point ? max : trip)
        const bestCompany = listTrip.reduce((max, trip) => max['Đánh giá nhà xe'] > trip['Đánh giá nhà xe'] ? max : trip)
        return {
            'Giá vé': `Chuyến thứ ${listTrip.findIndex(trip => trip.index === bestPrice.index) + 1} có giá rẻ hơn`,
            'Khoảng cách': `Chuyến thứ ${listTrip.findIndex(trip => trip.index === bestDistance.index) + 1} có quãng đường di chuyển ngắn hơn`,
            'Thời gian di chuyển': `Chuyến thứ ${listTrip.findIndex(trip => trip.index === bestTime.index) + 1} có thời gian di chuyển ngắn hơn`,
            'Trạm đón gần nhất': `Chuyến thứ ${listTrip.findIndex(trip => trip.index === bestPickStation.index) + 1} có trạm đón gần nhất với bạn`,
            'Trạm trả gần nhất': `Chuyến thứ ${listTrip.findIndex(trip => trip.index === bestDropStation.index) + 1} có trạm trả gần nhất với bạn`,
            'Đánh giá nhà xe': `Chuyến thứ ${listTrip.findIndex(trip => trip.index === bestCompany.index) + 1} có nhà xe được đánh giá tốt nhất`
        }
    }

    const handleEvaluate = async () => {
        const listTripPoint = []
        const targetRoute = listRoute.find(route => route.departure.name.includes(startPoint.province) && route.destination.name.includes(endPoint.province) || route.departure.name.includes(endPoint.province) && route.destination.name.includes(startPoint.province))
        if (targetRoute) {
            const turn = targetRoute.departure.name.includes(startPoint.province) ? true : false
            const startPosition = await handleSearchPosition(startPoint)
            const endPosition = await handleSearchPosition(endPoint)
            const listTurn = targetRoute.trips.filter((trip) => trip.turn == turn)
            for (let i = 0; i < listTurn.length; i++) {
                listTripPoint.push(evaluateTrip(listTurn[i], startPosition, endPosition))
            }
            if (listTripPoint.length === 0)
                return 'Hiện chưa có chuyến nào phù hợp'
            else {
                return listTripPoint
            }
        }
        else {
            return 'Hiện chưa có chuyến nào phù hợp'
        }
    }
    const findBestTrip = async (e) => {
        setLoading(true)
        e.preventDefault()
        const result = await handleEvaluate()
        //check if result is object or string
        let bestTrip = result
        if (typeof result !== 'string') {
            bestTrip = result.reduce((max, trip) => max.totalEvaluation > trip.totalEvaluation ? max : trip)
        }
        const question = 'Tôi đang ở ' + startPoint.detail + ', ' + startPoint.province + ' và muốn đến ' + endPoint.detail + ', ' + endPoint.province + ' thì chuyến xe nào là tốt nhất? Sử dụng kết quả phân tích từ hệ thống như sau: ' + JSON.stringify(bestTrip)
        const displayQuestion = 'Tôi đang ở ' + startPoint.detail + ', ' + startPoint.province + ' và muốn đến ' + endPoint.detail + ', ' + endPoint.province + ' thì chuyến xe nào là tốt nhất?'
        setLoading(false)
        setShow(false)
        handleSearch(question, displayQuestion)
    }
    const compareTrip = async (e) => {
        e.preventDefault()
        setLoading(true)
        const result = await handleEvaluate()
        let query = result
        if (typeof result !== 'string' && result.length === 1)
        {
            query = 'Hiện chỉ có một đơn vị cung cấp chuyến đi này đó là: ' + JSON.stringify(result[0])
        } else {
            let count = 0
            query = 'Hiện có ' + result.length + ' đơn vị cung cấp chuyến đi này. Sau đây là dữ liệu: '
            for (let i = 0; i < result.length; i++) {
                count = i + 1
                query += "Chuyến thứ " + count + ": " + JSON.stringify(result[i]) + "\n"
            }
            query += "Kết quả so sánh: " + JSON.stringify(makeComparision(result))
        }
        const question = 'Hãy nêu thông tin và so sánh các chuyến xe đi từ ' + startPoint.detail + ', ' + startPoint.province + ' và đến ' + endPoint.detail + ', ' + endPoint.province + '. Sử dụng kết quả phân tích từ hệ thống như sau: ' + query
        const displayQuestion = 'Hãy so sánh các chuyến xe đi từ ' + startPoint.detail + ', ' + startPoint.province + ' và đến ' + endPoint.detail + ', ' + endPoint.province
        setShow(false)
        setLoading(false)
        handleSearch(question, displayQuestion)
    }
    useEffect(() => {
        dispatch(routeThunk.getRoute())
            .unwrap()
            .then((res) => {
                setListRoute(res)
            })
        if (listCompany.length == 0) {
            dispatch(busCompanyThunk.getListBusCompany())
        }
        //call api get province
        axios
            .get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => {
                setListProvince(response.data.data)
            })
            .catch((error) => {
                console.log('Error retrieving provinces:', error)
            })
    }, [])
    
    return (
        <div className={styles.recommendContainer}>
            <button onClick={() => setShow(true)} className={styles.recommend}>
                <FontAwesomeIcon icon={faCircleQuestion} />
            </button>
            {
                show && (
                    <form className={styles['form-input']}>
                        <div className={styles.formGroup}>
                            <label htmlFor="startPoint">
                                <i>Điểm đi</i>
                            </label>
                            <Select options={listProvince.map((province) => ({ value: province.name, label: province.name }))}
                                    value={startProvince}
                                    name ={startPoint.province}
                                    onChange={(e) => {
                                        setStartPoint({ detail: startPoint.detail, province: e.value })
                                        setStartProvince(e)
                                    }}
                                    placeholder="Tỉnh đi"
                                    >
                            </Select>
                            <input
                                type="text"
                                id="startPoint"
                                name="startPoint"
                                value={startPoint.detail}
                                placeholder='Điểm đi cụ thể'
                                onChange={(e) => setStartPoint({ ...startPoint, detail: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="endPoint">
                                <i>Điểm đến</i>
                            </label>
                            <Select options={listProvince.map((province) => ({ value: province.name, label: province.name }))}
                                    value={endProvince}
                                    name={endPoint.province}
                                    onChange={(e) => {
                                        setEndPoint({ ...endPoint, province: e.value })
                                        setEndProvince(e)
                                    }}
                                    placeholder="Tỉnh đến"
                                    >
                            </Select>
                            <input
                                type="text"
                                id="endPoint"
                                name="endPoint"
                                value={endPoint.detail}
                                placeholder='Điểm đến cụ thể'
                                onChange={(e) => setEndPoint({ ...endPoint, detail: e.target.value })}
                            />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <OptionButton onClick={(e) => findBestTrip(e)} text={loading ? 'Đang phân tích...' : 'Chuyến tốt nhất'} disabled={loading}>
                            </OptionButton>
                            <OptionButton onClick={(e) => compareTrip(e)} text={loading ? 'Đang phân tích...' : 'So sánh các chuyến'} disabled={loading}>
                            </OptionButton>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <a href='#'
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShow(false)
                                }}>
                                <i>Đóng</i>
                            </a>
                        </div>
                    </form>
                )
            }

        </div>
    )
}

export default Recommend