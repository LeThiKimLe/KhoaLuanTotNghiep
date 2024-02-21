import styles from './styles.module.css'
import CancelTicket from './CancelTicket'
import ChangeTicket from './ChangeTicket'
import EditTicket from './EditTicket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { ticketAction } from '../../../../../feature/ticket/ticket.slice'
import { useSelector } from 'react-redux'
import { selectProcess, selectFinishedState } from '../../../../../feature/ticket/ticket.slice'
import { useRef, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';

const zoomInAnimation = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`

const zoomAnimation = (size) => keyframes`
    from {
        transform: scale(${size.oldWidth/size.newWidth}, ${size.oldHeight/size.newHeight});
    }
    to {
      transform: scale(1);

    }
`
const DialogDiv = styled.div`

    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 800px;
    max-height: 700px;
    z-index: 2;
    animation: ${zoomInAnimation} 0.5s forwards;
    overflow: auto;
    position: relative;
    transition: all 0.3s ease-in-out;
  &.changeSize {
    animation: ${props => zoomAnimation(props.size)} 0.3s forwards
  }
`;

const TicketAction = ({ type, close }) => {

    const finishedState = useSelector(selectFinishedState)
    const process = useSelector(selectProcess)
    const dispatch = useDispatch()
    const [dialogSize, setDialogSize] = useState({
        newWidth: 0,
        newHeight: 0,
        oldWidth: 0,
        oldHeight: 0
    })
    const closeForm = () => {
        dispatch(ticketAction.reset())
        close()
    }
    const preventClose = (e) => {
        e.stopPropagation()
    }
    const moveForward = () => {
        dispatch(ticketAction.comeBackward())
    }
    const previousSize = useRef({
        width: 0,
        height: 0
    });
    const dialog = useRef(null);
    useEffect(() => {
        const divElement = dialog.current
        if (divElement) {
            const currentWidth = divElement.offsetWidth
            const currentHeight = divElement.offsetHeight
            setDialogSize({
                newWidth: currentWidth,
                newHeight: currentHeight,
                oldWidth: previousSize.current.width,
                oldHeight: previousSize.current.height
            })
            previousSize.current = {
                width: currentWidth,
                height: currentHeight
            }
        }
    }, [process]);
    return (
        <div className={styles.container} onClick={closeForm}>
            <div className={styles.mask}></div>
            <DialogDiv size={dialogSize} className={process !== 1 ? 'changeSize' : ''} onClick={preventClose} ref={dialog}>
                <div className={styles.directBtn} style={{ display: finishedState === true ? 'none' : 'flex' }}>
                    <div onClick={moveForward} style={{ visibility: process === 1 ? 'hidden' : 'visible' }}>
                        <FontAwesomeIcon icon={faArrowLeft} color='grey' size={'2x'} />
                    </div>
                    <div onClick={closeForm}>
                        <FontAwesomeIcon icon={faXmark} color='grey' size={'2x'} />
                    </div>
                </div>
                <div className={styles.action_content}>
                    {type === 'cancel' && <CancelTicket close={closeForm}></CancelTicket>}
                    {type === 'change' && <ChangeTicket close={closeForm}></ChangeTicket>}
                    {type === 'edit' && <EditTicket close={closeForm}></EditTicket>}
                </div>
            </DialogDiv>
        </div>
    )
}

export default TicketAction