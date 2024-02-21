import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from "react-redux";
import { selectBookingSessionTime } from "../../../feature/booking/booking.slice";
import { selectBookingCode } from './../../../feature/booking/booking.slice';
const CountDown = ({onTimeout}) => {

	const bookingTime = useSelector(selectBookingSessionTime)
	const [timer, setTimer] = useState('10:00');
	const bookingCode = useSelector(selectBookingCode)
	const Ref = useRef(null)

	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		return {
			total, minutes, seconds
		};
	}

	const startTimer = (e) => {
		let { total, minutes, seconds } 
					= getTimeRemaining(e);
		if ( total >= 10000) {
			setTimer(
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
		else{
			clearInterval(Ref.current)
			onTimeout()
		}
	}

	const clearTimer = (e) => {
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000)
		Ref.current = id;
	}

	const getDeadTime = () => {
        return  new Date(((new Date(bookingTime)).getTime() + 10 * 60000)); 
        // return  new Date(((new Date()).getTime() + 3 * 60000)); 
	}

	useEffect(() => {
		if (bookingCode !=='')
			clearTimer(getDeadTime())
	}, [bookingCode]);

	return (
		<i>{timer}</i>
	)
}
export default CountDown;