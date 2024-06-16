import { useDispatch, useSelector } from "react-redux"

export const CompanyPolicy = ({policy}) => {
    return (
        <div>
            <h4>Chính sách của nhà xe</h4>
            <div
                className="preview"
                dangerouslySetInnerHTML={
                    policy != '' && policy != '<p></p>'
                        ? {__html: policy}
                        : { __html: 'Chưa có thông tin chính sách' }
                }
            ></div>
        </div>
    )
}