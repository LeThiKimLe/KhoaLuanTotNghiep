import styles from './styles.module.css'
import Slider from 'react-slick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import male from '../../../../assets/male.svg'
import female from '../../../../assets/female.svg'
import SectionTitle from '../../../../components/common/sectionTitle'
import { useTranslation } from 'react-i18next';
import { convertToDisplayDate } from '../../../../utils/unitUtils'
import { format } from 'date-fns'
import { getRouteJourney } from '../../../../utils/tripUtils'
const Comment = ({listComment}) => {

    const {t, i18n} = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll:1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 3,
                infinite: true,
                dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2,
                arrows: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
    }

    return(
        <div className={styles.container}>
            <SectionTitle title={t("comment.title")}
                    subtitle={t("comment.slogan")}></SectionTitle>
             <div>       
             <Slider {...settings} >
                {listComment.map((comment) => (
                
                <div key={comment.id} className={styles.commentWrapper}>
                  <div className={styles.commentInner}>
                    <div style={{display: 'flex', gap: '15px'}}>
                        <img src={comment.reviewer.gender=== true? female : male} alt="" style={{width: '50px'}}/>
                        <div >
                            <span style={{fontWeight:'600'}}>{comment.reviewer.name}</span>
                            <div>
                            {Array.from({ length: 5 }, (_, index) => index + 1).map((item, index)=> (
                                <FontAwesomeIcon key={index} icon={faStar} color={item<=comment.rate ? 'yellow' : 'gray'}/>
                            ))}
                            <div><i style={{fontSize:'13px'}}>
                              {` Đăng ngày ${format(new Date(comment.sendDate), 'dd/MM/yyyy')}`}
                              </i>
                            </div>
                        </div>
                        </div>
                    </div>
                    <p style={{margin:'10px 0', height:'130px', width:'100%', overflow:'auto'}}>{comment.comment}</p>
                    <div style={{ textAlign:'right' }}>
                    <i style={{fontSize:'13px'}}>
                    {` Chuyến: ${getRouteJourney(comment.scheduleTrip.route,)} - Khởi hành:
                     ${comment.schedule.departTime.slice(0,-3)} ngày ${convertToDisplayDate(comment.schedule.departDate)}`}
                    </i>
                    </div>
                    </div>
                </div>
              
                ) )}
             </Slider>
             </div>
        </div>
    )
}

export default Comment