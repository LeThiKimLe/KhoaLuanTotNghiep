import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faStar } from '@fortawesome/free-solid-svg-icons'
import Button from '../../../../../components/common/button'
import { useState } from 'react'
import { getTripJourney } from '../../../../../utils/tripUtils'
import { convertToDisplayDate } from '../../../../../utils/unitUtils'
import { useDispatch, useSelector } from 'react-redux'
import reviewThunk from '../../../../../feature/review/review.service'
import { selectUserReview } from '../../../../../feature/review/review.slice'
const ReviewForm = ({closeForm, trip, updateList}) => {
    const dispatch = useDispatch()
    const listReview = useSelector(selectUserReview)
    const thisReview = listReview.find((item) => item.schedule.id === trip.tickets[0]?.schedule.id)
    const [starNumber, setStarNumber] = useState(thisReview?.rate || 0)
    const [review, setReview] = useState(0)
    const [comment, setComment] = useState(thisReview?.comment || '')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const preventClose = (e) => {
        e.stopPropagation()
    }
    const handleSendReview =  () => {
        if (review === 0){
            setError('Vui lòng chọn số sao')
        }
        else {
            setLoading(true)
            dispatch(reviewThunk.sendReview({
                rate: review,
                comment: comment,
                scheduleId: trip.tickets[0]?.schedule.id,
            }))
            .unwrap()
            .then(() => {
                setLoading(false)
                setSuccessMessage('Gửi đánh giá thành công')
                updateList()
                setTimeout(() => {
                    closeForm()
                }, 2000)
            })
            .catch((error) => {
                setLoading(false)
                setError(error.toString())
            })
        }
    }
    return (
        <div className={styles.container} onClick={closeForm}>
            <div className={styles.mask}></div>
            <div className={styles.content} onClick={preventClose}>
                <div className={styles.directBtn}>
                    <div>FORM ĐÁNH GIÁ</div>
                    <div onClick={closeForm}>
                        <FontAwesomeIcon icon={faXmark} color='grey' size={'2x'} />
                    </div>
                </div>
                <div className={styles.action_content}>
                    <div className={styles.review_content}>
                        <b><i className={styles.action_title}>Chuyến xe:</i></b>
                        <span>{getTripJourney(trip.trip)}</span>
                        <br></br>
                        <b><i className={styles.action_title}>Khởi hành:</i></b>
                        <span>{`${convertToDisplayDate(trip.tickets[0]?.schedule.departDate)} - ${trip.tickets[0]?.schedule.departTime.slice(0, -3)}`}</span>
                        <span style={{paddingRight:'20px'}}></span>
                        <b><i className={styles.action_title}>Ghế:</i></b>
                        <span>{trip.tickets[0]?.seat}</span>
                        <div className={styles.split}></div>
                        <b className={styles.action_title}><i>Chất lượng chuyến đi:</i></b>
                        <span className={styles.action_rating}>
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 1 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={!!thisReview === false ? () => setStarNumber(1) : null}
                                onMouseLeave={!!thisReview === false ? ()=> setStarNumber(review): null}
                                onClick={!!thisReview === false ? () => setReview(1) : null}
                            />
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 2 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={!!thisReview === false ? () => setStarNumber(2) : null}
                                onMouseLeave={!!thisReview === false ? ()=> setStarNumber(review): null}
                                onClick={!!thisReview === false ? () => setReview(2) : null}
                            />
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 3 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={!!thisReview === false ? () => setStarNumber(3) : null}
                                onMouseLeave={!!thisReview === false ? ()=> setStarNumber(review): null}
                                onClick={!!thisReview === false ? () => setReview(3) : null}
                            />
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 4 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={!!thisReview === false ? () => setStarNumber(4) : null}
                                onMouseLeave={!!thisReview === false ? ()=> setStarNumber(review): null}
                                onClick={!!thisReview === false ? () => setReview(4) : null}
                            />
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 5 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={!!thisReview === false ? () => setStarNumber(5) : null}
                                onMouseLeave={!!thisReview === false ? ()=> setStarNumber(review): null}
                                onClick={!!thisReview === false ? () => setReview(5) : null}
                            />
                        </span>
                        <div className={styles.action_title}><b>Đánh giá của bạn</b></div>
                        <textarea 
                            className={styles.review_input} 
                            placeholder='Viết đánh giá' 
                            value={comment}
                            readOnly={!!thisReview} 
                            onChange={(e) => setComment(e.target.value)}>
                        </textarea>
                    </div>
                    <i style={{color: 'red', margin: '5px 0'}}>{error !== '' ? error: ''}</i>
                    <i style={{color: 'green', margin: '5px 0'}}>{successMessage !== '' ? successMessage: ''}</i>
                    <br></br>
                    {
                        !!thisReview === false && (
                            <Button text="Gửi đánh giá" onClick={() => handleSendReview()} loading={loading}></Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ReviewForm