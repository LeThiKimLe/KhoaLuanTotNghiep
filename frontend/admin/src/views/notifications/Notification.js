import React from 'react'
import { useState } from 'react'
import { CListGroupItem } from '@coreui/react'

const Notification = ({ title, onClick, children }) => {
    const [onHover, setOnHover] = useState(false)
    const handleMouseEnter = () => {
        setOnHover(true)
    }

    const handleMouseLeave = () => {
        setOnHover(false)
    }

    return (
        <CListGroupItem
            className="wrapper-component"
            onClick={onClick}
            role="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ backgroundColor: onHover ? '#f0f0f0' : '' }}
        >
            <b className="mb-1">{title}</b>
            <br></br>
            {children}
        </CListGroupItem>
    )
}

export default Notification
