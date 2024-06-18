import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { CCol, CRow, CButton, CCollapse, CCardBody, CCard } from '@coreui/react'
import { SCHEDULE_STATE } from 'src/utils/constants'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilCircle } from '@coreui/icons'
import travelingImg from 'src/assets/images/loadingdots2.gif'
import { convertToDisplayTimeStamp } from 'src/utils/convertUtils'

const ScheduleStatus = ({ data }) => {
    return (
        <CCol md="2" className="d-flex flex-column align-items-center my-2" role="button">
            <CIcon
                icon={data.achived ? cilCheckCircle : cilCircle}
                size="xl"
                style={data.achived ? { color: 'green' } : { color: '#ccc' }}
            ></CIcon>
            <b
                style={data.achived ? { color: '#000' } : { color: '#8f938f' }}
            >{`${data.stationData.arrivalTime}. ${data.state?.label}`}</b>
            <small>{data.stationData?.station?.name}</small>
        </CCol>
    )
}

const ScheduleStatusTracker = ({ schedule }) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState([])
    const scheduleStatus = SCHEDULE_STATE.find((st) => st.data === schedule.state)
    const currenStation = schedule.currentStation
    const updateTime = schedule.updateTime
    const [nextAction, setNextAction] = useState(null)
    const getStationType = (station) => {
        if (station.stationType === 'pick')
            if (station.station.id == schedule.tripInfor.startStation.id)
                return {
                    name: 'Trạm đi',
                    state: SCHEDULE_STATE.find((st) => st.label === 'Đến bến đi'),
                }
            else
                return {
                    name: 'Trạm đón',
                    state: SCHEDULE_STATE.find((st) => st.label === 'Đến trạm đón'),
                }
        else if (station.stationType === 'drop')
            if (station.station.id == schedule.tripInfor.endStation.id)
                return {
                    name: 'Trạm đến',
                    state: SCHEDULE_STATE.find((st) => st.label === 'Đến bến đến'),
                }
            else
                return {
                    name: 'Trạm trả',
                    state: SCHEDULE_STATE.find((st) => st.label === 'Đến trạm trả'),
                }
        else if (station.stationType === 'stop')
            return {
                name: 'Trạm dừng nghỉ',
                state: SCHEDULE_STATE.find((st) => st.label === 'Đến trạm dừng chân'),
            }
        else if (station.stationType === 'park-start')
            return {
                name: 'Bãi đỗ đầu',
                state: SCHEDULE_STATE.find((st) => st.label === 'Rời bãi đỗ'),
            }
        else
            return {
                name: 'Bãi đỗ cuối',
                state: SCHEDULE_STATE.find((st) => st.label === 'Về bãi đỗ'),
            }
    }
    useEffect(() => {
        const trip = schedule.tripInfor
        const listState = [...trip.stopStations]
            .sort((a, b) => a.arrivalTime - b.arrivalTime)
            .map((st) => {
                return {
                    stationData: st,
                    stationType: getStationType(st).name,
                    state: getStationType(st).state,
                    achived: false,
                }
            })
        const currentStopStation = trip.stopStations.find((st) => st.id == currenStation)
        let currentIndex = currentStopStation ? currentStopStation.arrivalTime : 0
        for (let i = 0; i < listState.length; i++) {
            if (listState[i].stationData.arrivalTime <= currentIndex) {
                listState[i].achived = true
            }
        }
        listState.push({
            stationData: {
                ...listState[listState.length - 1].stationData,
                arrivalTime: listState[listState.length - 1].stationData.arrivalTime + 1,
            },
            stationType: 'Bãi đỗ cuối',
            state: SCHEDULE_STATE.find((st) => st.label === 'Hoàn thành'),
            achived: scheduleStatus?.data === 'Hoàn thành' ? true : false,
        })
        setStatus(listState)
    }, [schedule])
    useEffect(() => {
        if (status.length > 0) {
            const currentStopStation = schedule.tripInfor.stopStations.find(
                (st) => st.id == currenStation,
            )
            if (scheduleStatus)
                if (
                    scheduleStatus.data === 'Đang đi' ||
                    scheduleStatus.data === 'Về bãi đỗ' ||
                    scheduleStatus.data === 'Hoàn thành'
                )
                    setNextAction(
                        status.find(
                            (st) =>
                                st.stationData.arrivalTime === currentStopStation?.arrivalTime + 1,
                        ),
                    )
                else {
                    const newState = {
                        stationData: currentStopStation,
                        stationStatus: '',
                        state: SCHEDULE_STATE.find((st) => st.label === 'Tiếp tục hành trình'),
                        achived: false,
                    }
                    setNextAction(newState)
                }
            else setNextAction(status[0])
        }
    }, [status])
    return (
        <>
            <CRow className="gap-2 justify-content-center">
                {status.map((status, index) => (
                    <>
                        {scheduleStatus &&
                            scheduleStatus.data == 'Đang đi' &&
                            nextAction &&
                            status.state.label === nextAction.state.label && (
                                <img
                                    src={travelingImg}
                                    style={{ width: '90px', height: '55px' }}
                                ></img>
                            )}
                        <ScheduleStatus data={status} key={index}></ScheduleStatus>
                    </>
                ))}
                <i>{`Cập nhật mới nhất: ${convertToDisplayTimeStamp(updateTime)}`}</i>
            </CRow>
        </>
    )
}

const ScheduleState = ({ schedule }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <CButton color="info" onClick={() => setVisible(!visible)}>
                Trạng thái chuyến xe
            </CButton>
            <CCollapse visible={visible}>
                <CCard className="mt-3">
                    <CCardBody>
                        {schedule && (
                            <ScheduleStatusTracker schedule={schedule}></ScheduleStatusTracker>
                        )}
                    </CCardBody>
                </CCard>
            </CCollapse>
        </>
    )
}

export default ScheduleState
