import React, { useEffect } from 'react'
import busImg from '../../../assets/brand/bus-img.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { selectListCompany } from 'src/feature/bus-company/busCompany.slice'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { selectUser } from 'src/feature/auth/auth.slice'
import styles from './styles.module.css'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm,
    CRow,
    CImage,
    CFormInput,
    CFormLabel,
} from '@coreui/react'
import { useState } from 'react'
import CustomButton from 'src/views/customButton/CustomButton'
import { convertToDisplayDate } from 'src/utils/convertUtils'
const CompanyInfor = () => {
    const dispatch = useDispatch()
    const listCompany = useSelector(selectListCompany)
    const user = useSelector(selectUser)
    const [isUpdating, setIsUpdating] = useState(false)
    const companyInfo = listCompany?.find((company) => company.id === user.user.staff.busCompanyId)
    useEffect(() => {
        if (listCompany.length === 0) {
            dispatch(companyThunk.getCompany())
        }
    }, [])
    return (
        <>
            {companyInfo && (
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={10}>
                            <CCard>
                                <CCardHeader>
                                    <h4>Thông tin nhà xe</h4>
                                </CCardHeader>
                                <CCardBody>
                                    <CForm>
                                        <CRow>
                                            <CCol md={6}>
                                                <div className={styles.userIcon}>
                                                    <CImage
                                                        rounded
                                                        thumbnail
                                                        src={busImg}
                                                        width={400}
                                                        height={400}
                                                    />
                                                    {isUpdating && (
                                                        <input
                                                            type="file"
                                                            // onChange={handleUpImage}
                                                            name="myImage"
                                                            style={{ width: '100%' }}
                                                        ></input>
                                                    )}
                                                </div>
                                                <div className={styles.btnGroup}>
                                                    <CustomButton
                                                        className={styles.updateBtn}
                                                        // onClick={() => handleUpdate()}
                                                        text={
                                                            isUpdating
                                                                ? 'Lưu thông tin'
                                                                : 'Cập nhật ảnh nhà xe'
                                                        }
                                                    ></CustomButton>
                                                    {isUpdating && (
                                                        <CustomButton
                                                            // onClick={handleResetInfor}
                                                            className={styles.updateBtn}
                                                            variant="outline"
                                                            text="Hủy"
                                                        ></CustomButton>
                                                    )}
                                                </div>
                                            </CCol>
                                            <CCol md={6}>
                                                <form action="" className={styles.inforForm}>
                                                    <CRow className="mb-3">
                                                        <CFormLabel
                                                            htmlFor="staticEmail"
                                                            className="col-sm-4 col-form-label"
                                                        >
                                                            Tên nhà xe
                                                        </CFormLabel>
                                                        <CCol sm={8}>
                                                            <CFormInput
                                                                type="text"
                                                                id="staticEmail"
                                                                defaultValue={companyInfo.name}
                                                                readOnly
                                                                plainText
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className="mb-3">
                                                        <CFormLabel
                                                            htmlFor="staticEmail"
                                                            className="col-sm-4 col-form-label"
                                                        >
                                                            Số GPKD
                                                        </CFormLabel>
                                                        <CCol sm={8}>
                                                            <CFormInput
                                                                type="text"
                                                                id="staticEmail"
                                                                defaultValue={
                                                                    companyInfo.businessLicense
                                                                }
                                                                readOnly
                                                                plainText
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className="mb-3">
                                                        <CFormLabel
                                                            htmlFor="staticEmail"
                                                            className="col-sm-4 col-form-label"
                                                        >
                                                            Số hợp tác
                                                        </CFormLabel>
                                                        <CCol sm={8}>
                                                            <CFormInput
                                                                type="text"
                                                                id="staticEmail"
                                                                defaultValue={convertToDisplayDate(
                                                                    companyInfo.coopDay,
                                                                )}
                                                                readOnly
                                                                plainText
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className="mb-3">
                                                        <CFormLabel
                                                            htmlFor="staticEmail"
                                                            className="col-sm-4 col-form-label"
                                                        >
                                                            Đại diện nhà xe
                                                        </CFormLabel>
                                                        <CCol sm={8}>
                                                            <CFormInput
                                                                type="text"
                                                                id="staticEmail"
                                                                defaultValue={
                                                                    companyInfo.admin.staffUser.name
                                                                }
                                                                readOnly
                                                                plainText
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className="mb-3">
                                                        <CFormLabel
                                                            htmlFor="staticEmail"
                                                            className="col-sm-4 col-form-label"
                                                        >
                                                            Số điện thoại
                                                        </CFormLabel>
                                                        <CCol sm={8}>
                                                            <CFormInput
                                                                type="text"
                                                                id="staticEmail"
                                                                defaultValue={
                                                                    companyInfo.admin.staffUser.tel
                                                                }
                                                                readOnly
                                                                plainText
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className="mb-3">
                                                        <CFormLabel
                                                            htmlFor="staticEmail"
                                                            className="col-sm-4 col-form-label"
                                                        >
                                                            Email
                                                        </CFormLabel>
                                                        <CCol sm={8}>
                                                            <CFormInput
                                                                type="text"
                                                                id="staticEmail"
                                                                defaultValue={
                                                                    companyInfo.admin.staffUser
                                                                        .email
                                                                }
                                                                readOnly
                                                                plainText
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                </form>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            )}
        </>
    )
}

export default CompanyInfor
