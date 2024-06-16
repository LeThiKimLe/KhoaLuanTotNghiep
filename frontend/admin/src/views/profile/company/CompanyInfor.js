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
    CCardFooter,
    CButton,
} from '@coreui/react'
import { useState } from 'react'
import CustomButton from 'src/views/customButton/CustomButton'
import { convertToDisplayDate } from 'src/utils/convertUtils'
import { ContentState, EditorState, convertToRaw, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToHTML } from 'draft-convert'
import DOMPurify from 'dompurify'

const CompanyInfor = () => {
    const dispatch = useDispatch()
    const listCompany = useSelector(selectListCompany)
    const user = useSelector(selectUser)
    const [isUpdating, setIsUpdating] = useState(false)
    const companyInfo = listCompany?.find(
        (company) => company.busCompany.id === user.user.staff.busCompanyId,
    )
    const [editPolicy, setEditPolicy] = useState(false)
    const [companyPolicy, setCompanyPolicy] = useState(
        companyInfo?.busCompany.policy ? companyInfo?.busCompany.policy : '',
    )
    const blocksFromHTML = convertFromHTML(companyPolicy)
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    )
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(state))
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        }
    }
    const handleSave = () => {
        if (!editPolicy) {
            setEditPolicy(true)
        } else {
            let html = convertToHTML(editorState.getCurrentContent())
            dispatch(companyThunk.editCompanyPolicy(html))
                .unwrap()
                .then(() => {
                    dispatch(companyThunk.getCompany())
                    setEditPolicy(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    const reset = () => {
        let blocksFromHTML = convertFromHTML(companyPolicy)
        let state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        )
        setEditorState(() => EditorState.createWithContent(state))
        setEditPolicy(false)
    }
    useEffect(() => {
        // let html = convertToHTML(editorState.getCurrentContent())
        // setCompanyPolicy(createMarkup(html))
    }, [editorState])
    useEffect(() => {
        if (listCompany.length === 0) {
            dispatch(companyThunk.getCompany())
        }
    }, [])
    useEffect(() => {
        setCompanyPolicy(companyInfo?.busCompany.policy ? companyInfo?.busCompany.policy : '')
    }, [companyInfo])
    useEffect(() => {
        if (companyPolicy) {
            let blocksFromHTML = convertFromHTML(companyPolicy)
            let state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            )
            setEditorState(() => EditorState.createWithContent(state))
        }
    }, [companyPolicy])
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
                                                                defaultValue={
                                                                    companyInfo.busCompany.name
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
                                                            Số GPKD
                                                        </CFormLabel>
                                                        <CCol sm={8}>
                                                            <CFormInput
                                                                type="text"
                                                                id="staticEmail"
                                                                defaultValue={
                                                                    companyInfo.busCompany
                                                                        .businessLicense
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
                                                                    companyInfo.busCompany.coopDay,
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
                                                                    companyInfo?.admin?.name
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
                                                                    companyInfo?.admin?.tel
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
                                                                    companyInfo?.admin?.email
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
                    <CRow className="justify-content-center my-2">
                        <CCol md={10}>
                            <CCard>
                                <CCardHeader>
                                    <h4>Chính sách nhà xe</h4>
                                </CCardHeader>
                                <CCardBody className="bg-white">
                                    {editPolicy ? (
                                        <Editor
                                            editorState={editorState}
                                            onEditorStateChange={setEditorState}
                                        />
                                    ) : (
                                        <div
                                            className="preview"
                                            dangerouslySetInnerHTML={
                                                companyPolicy != '' && companyPolicy != '<p></p>'
                                                    ? createMarkup(companyPolicy)
                                                    : { __html: 'Không có thông tin chính sách' }
                                            }
                                        ></div>
                                    )}
                                </CCardBody>
                                <CCardFooter>
                                    <CButton variant="outline" onClick={handleSave} color="success">
                                        {editPolicy ? 'Lưu' : 'Cập nhật chính sách'}
                                    </CButton>
                                    {editPolicy && (
                                        <CButton
                                            variant="outline"
                                            onClick={reset}
                                            className="mx-2"
                                            color="danger"
                                        >
                                            Hủy
                                        </CButton>
                                    )}
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            )}
        </>
    )
}

export default CompanyInfor
