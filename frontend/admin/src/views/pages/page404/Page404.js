import React from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page404 = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <div className="clearfix">
                            <h1 className="float-start display-3 me-4">Dịch vụ bị hạn chế</h1>
                            <h4 className="pt-3">Oops! Không thể truy cập dịch vụ</h4>
                            <p> Bạn có thể gặp vấn đề với việc đóng phí duy trì hệ thống</p>
                            <p className="text-medium-emphasis float-start">
                                Liên hệ với quản trị viên để biết thêm chi tiết.
                            </p>
                        </div>
                        <CInputGroup className="input-prepend">
                            <CInputGroupText>
                                <CIcon icon={cilMagnifyingGlass} />
                            </CInputGroupText>
                            <CFormInput type="text" placeholder="What are you looking for?" />
                            <CButton color="info">Search</CButton>
                        </CInputGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Page404
