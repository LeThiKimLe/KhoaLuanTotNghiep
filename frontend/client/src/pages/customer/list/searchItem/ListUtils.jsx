import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faBottleWater, faBoxTissue, faHammer, faLightbulb, faMattressPillow, faPersonBooth, faRug, faSnowflake, faToilet, faTv, faWifi } from "@fortawesome/free-solid-svg-icons"

export const ListUtils = ({ trip }) => {
    const busUtils = {
        wifi: trip.busType.wifi,
        water: trip.busType.water,
        coolTissue: trip.busType.coolTissue,
        phoneCharge: trip.busType.phoneCharge,
        blanket: trip.busType.blanket,
        pillow: trip.busType.pillow,
        breakingHammer: trip.busType.breakingHammer,
        conditioner: trip.busType.conditioner,
        toilet: trip.busType.toilet,
        readingLight: trip.busType.readingLight,
        curtain: trip.busType.curtain,
        tiviLed: trip.busType.tiviLed,
    }
    return (
        <div className="row justify-content-center my-2 gap-2">
            {
                busUtils.wifi && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faWifi} />
                        <i className="px-2">Wifi</i>
                    </div>
                )
            }
            {
                busUtils.water && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faBottleWater} />
                        <i className="px-2">Nước uống</i>
                    </div>
                )
            }
            {
                busUtils.coolTissue && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faBoxTissue} />
                        <i className="px-2">Khăn lạnh</i>
                    </div>
                )
            }
            {
                busUtils.phoneCharge && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faBolt} />
                        <i className="px-2">Cổng sạc</i>
                    </div>
                )
            }
            {
                busUtils.blanket && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faRug} />
                        <i className="px-2">Chăn đắp</i>
                    </div>
                )
            }
            {
                busUtils.pillow && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faMattressPillow} />
                        <i className="px-2">Gối nằm</i>
                    </div>
                )
            }
            {
                busUtils.breakingHammer && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faHammer} />
                        <i className="px-2">Búa thoát hiểm</i>
                    </div>
                )
            }
            {
                busUtils.conditioner && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faSnowflake} />
                        <i className="px-2">Điều hòa</i>
                    </div>
                )
            }
            {
                busUtils.toilet && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faToilet} />
                        <i className="px-2">Toilet</i>
                    </div>
                )
            }
            {
                busUtils.readingLight && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faLightbulb} />
                        <i className="px-2">Đèn đọc sách</i>
                    </div>
                )
            }
            {
                busUtils.curtain && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faPersonBooth} />
                        <i className="px-2">Rèm cửa</i>
                    </div>
                )
            }
            {
                busUtils.tiviLed && (
                    <div className="col-3 my-2">
                        <FontAwesomeIcon icon={faTv} />
                        <i className="px-2">Tivi</i>
                    </div>
                )
            }
            {
                Object.values(busUtils).every((item) => !item) && (
                    <div>Chưa có thông tin về tiện ích của chuyến xe này</div>
                )
            }
        </div>
    )
}