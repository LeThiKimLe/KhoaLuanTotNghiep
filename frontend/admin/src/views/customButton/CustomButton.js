import React from 'react'
import { CButton, CSpinner } from '@coreui/react'

const CustomButton = (props) => {
    const { loading, text, children, ...exprops } = props
    if (loading === true)
        return (
            <CButton disabled {...exprops}>
                <CSpinner component="span" size="sm" aria-hidden="true" data-testid="spinner" />
                {` ${text ? text : ''}...`}
                {children}
            </CButton>
        )
    else {
        return (
            <CButton {...exprops}>
                {text ? text : ''} {children}
            </CButton>
        )
    }
}

export default CustomButton
