import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from "react-redux"
import { selectOTPTime } from '../../../feature/auth/auth.slice'

const CountDownOTP = ({onTimeout}) => {

	const [timer, setTimer] = useState('02:00');
	const otpTime = useSelector(selectOTPTime)
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
		if ( total >= 0) {
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
        return new Date(((new Date(otpTime).getTime() + 2 * 60000))); 
	}

	useEffect(() => {
		if (otpTime)
			clearTimer(getDeadTime())
	}, [otpTime]);

	return (
		<i><b>{timer}</b></i>
	)
}
export default CountDownOTP;