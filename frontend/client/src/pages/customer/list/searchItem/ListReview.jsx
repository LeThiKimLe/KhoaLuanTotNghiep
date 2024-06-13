import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectListReview } from "../../../../feature/review/review.slice"
import styles from './styles.module.css'
import { convertToDisplayDate } from "../../../../utils/unitUtils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import male from '../../../../assets/male.svg'
import female from '../../../../assets/female.svg'
import { format } from 'date-fns'
import { getRouteJourney } from '../../../../utils/tripUtils'
import reviewThunk from "../../../../feature/review/review.service"

const Comment = ({comment}) => {
    return (
        <div key={comment.id} className={styles.commentWrapper}>
            <div className={styles.commentInner}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <img src={comment.reviewer.gender === true ? female : male} alt="" style={{ width: '50px' }} />
                    <div >
                        <span style={{ fontWeight: '600' }}>{comment.reviewer.name}</span>
                        <div>
                            {Array.from({ length: 5 }, (_, index) => index + 1).map((item, index) => (
                                <FontAwesomeIcon key={index} icon={faStar} color={item <= comment.rate ? 'yellow' : 'gray'} />
                            ))}
                            <div><i style={{ fontSize: '13px' }}>
                                {` Đăng ngày ${format(new Date(comment.sendDate), 'dd/MM/yyyy')}`}
                            </i>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{ margin: '10px 0', height: '70%', width: '100%', overflow: 'auto' }}>{comment.comment}</p>
                <div style={{ textAlign: 'right' }}>
                    <i style={{ fontSize: '13px' }}>
                        {` Chuyến: ${getRouteJourney(comment.scheduleTrip.route,)} - Khởi hành:
                    ${comment.schedule.departTime.slice(0, -3)} ngày ${convertToDisplayDate(comment.schedule.departDate)}`}
                    </i>
                </div>
            </div>
        </div>
    )
}

export const ListReview = ({trip}) => {
    const dispatch = useDispatch()
    const listComment = useSelector(selectListReview)
    const listShow = listComment.filter((item) => item?.scheduleTrip?.busCompany?.id === trip.busCompany.id  && item?.scheduleTrip?.id === trip.id)
    useEffect(() => {
        if (listComment.length === 0)
        {
            dispatch(reviewThunk.getListReview())
            .unwrap()
            .then(() => {
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [])
    return ( 
        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
            {
                listShow.map((comment) => (
                    <Comment key={comment.id} comment={comment}></Comment>
                ))
            }
            {
                listShow.length === 0 && <div>Chưa có đánh giá nào</div>
            }
        </div>
    )
}