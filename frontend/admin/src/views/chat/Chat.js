import React, { useEffect, useRef } from 'react'
import { CCol, CRow, CButton } from '@coreui/react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    ConversationHeader,
    TypingIndicator,
    Sidebar,
    Search,
    ConversationList,
    Conversation,
    ExpansionPanel,
} from '@chatscope/chat-ui-kit-react'
import chatbot from '../../assets/images/avatars/chatbot.png'
import guest from '../../assets/images/avatars/guest-icon.svg'
import guest_icon from '../../assets/images/avatars/user.png'
import { useState } from 'react'
import { selectUser } from 'src/feature/auth/auth.slice'
import { useSelector } from 'react-redux'
import avt1 from '../../assets/images/avatars/avt1.svg'
import avt2 from '../../assets/images/avatars/avt2.svg'
import avt3 from '../../assets/images/avatars/avt3.svg'
import avt4 from '../../assets/images/avatars/avt4.svg'
import noMessage from '../../assets/images/no_message.png'

const ChatBox = ({ chatData, handleSendMessage, avt }) => {
    const user = useSelector(selectUser)
    const [currentInput, setCurrentInput] = useState('')
    const isRepStaff = (mess) => {
        if (mess.senderId === user?.user?.id && mess.sender.includes('NV')) return 'outgoing'
        else if (mess.sender.includes('NV')) return 'staff-incoming'
        else return 'guest-incoming'
    }
    const [listMessage, setListMessage] = useState(chatData ? chatData.listMessage : [])
    const getMessageAvt = (mess) => {
        const messState = isRepStaff(mess)
        if (messState === 'outgoing') return user?.user?.staff?.img
        else if (messState === 'staff-incoming') return chatbot
        else return avt
    }
    const convertToDisplayTime = (time) => {
        let date = new Date(time)
        let formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')} Lúc ${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`
        return formattedDate
    }
    useEffect(() => {
        if (chatData) setListMessage(chatData.listMessage)
    }, [chatData])
    return (
        <>
            {chatData ? (
                <ChatContainer style={{ flex: 1, flexDirection: 'column' }}>
                    <ConversationHeader>
                        <ConversationHeader.Back />
                        <Avatar name={chatData?.customerInfor?.name} src={avt} status="available" />
                        <ConversationHeader.Content userName={chatData?.customerInfor?.name} />
                    </ConversationHeader>
                    <MessageList style={{ flex: 1 }}>
                        {listMessage.map((mess) => (
                            <Message
                                key={mess.sentTime}
                                model={{
                                    message: mess.message,
                                    sentTime: mess.sentTime,
                                    sender: mess.sender,
                                    direction:
                                        isRepStaff(mess) === 'outgoing' ? 'outgoing' : 'incoming',
                                    position: 'single',
                                }}
                                avatarPosition={isRepStaff(mess) === 'outgoing' ? 'br' : 'tl'}
                            >
                                <Message.Header
                                    sender={mess.sender}
                                    sentTime={convertToDisplayTime(mess.sentTime)}
                                />
                                <Avatar name={mess.sender} src={getMessageAvt(mess)} />
                            </Message>
                        ))}
                    </MessageList>
                    <MessageInput
                        value={currentInput}
                        placeholder="Nhập tin nhắn ở đây"
                        style={{ maxHeight: '100px', overflow: 'auto' }}
                        onChange={(e) => setCurrentInput(e)}
                        onSend={() => {
                            handleSendMessage(currentInput, chatData.customerInfor.id)
                            setCurrentInput('')
                        }}
                    />
                </ChatContainer>
            ) : (
                <div style={{ flex: 1, flexDirection: 'column' }}>
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                        <img src={noMessage} className="w-75 h-75"></img>
                    </div>
                </div>
            )}
        </>
    )
}

const CustomerConversation = ({ chatData, active, onClick, setActiveAVT }) => {
    const [lastMess, setLastMess] = useState(chatData.listMessage[chatData.listMessage.length - 1])
    const isActive = chatData?.customerInfor?.id === active?.customerInfor?.id
    const user = useSelector(selectUser)
    const listAVT = [avt1, avt2, avt3, avt4]
    const getRandomAvt = () => {
        return listAVT[Math.floor(Math.random() * listAVT.length)]
    }
    const [avt, setAvt] = useState(getRandomAvt())
    const lastRepder = () => {
        if (lastMess.senderId === user?.user?.id && lastMess.sender.includes('NV')) return 'Bạn: '
        else if (
            lastMess.senderId === chatData?.customerInfor?.id &&
            !lastMess.sender.includes('NV')
        )
            return ''
        else return lastMess.sender + ': '
    }
    useEffect(() => {
        setLastMess(chatData.listMessage[chatData.listMessage.length - 1])
        if (isActive) {
            onClick(chatData)
            setActiveAVT(avt)
        }
    }, [chatData, active])
    return (
        <Conversation
            // lastSenderName={lastMess.sender}
            // name={chatData?.customerInfor?.name}
            className="justify-content-center"
            active={isActive}
            onClick={() => {
                onClick(chatData)
                setActiveAVT(avt)
            }}
            unreadDot={lastMess.sender.includes('NV.') ? false : true}
        >
            <Avatar
                name={chatData?.customerInfor?.name}
                src={avt}
                status="available"
                className="d-flex margin-auto"
            />
            <Conversation.Content className="justify-content-center">
                <div style={{ fontWeight: '700' }}>{chatData?.customerInfor?.name}</div>
                <span
                    style={
                        !lastMess.sender.includes('NV.')
                            ? { fontWeight: '600', fontSize: '14px' }
                            : { fontWeight: '300', fontSize: '14px' }
                    }
                >
                    <span>{lastRepder()}</span>
                    <span>{lastMess.message}</span>
                </span>
            </Conversation.Content>
        </Conversation>
    )
}

const Chat = () => {
    const [listChatData, setListChatData] = useState([])
    const user = useSelector(selectUser)
    const [activeChat, setActiveChat] = useState(listChatData[0] ? listChatData[0] : null)
    const [activeAVT, setActiveAVT] = useState(avt1)
    const connection = useRef(null)
    const sendMessage = (message, receiver) => {
        const newMessage = {
            rep: receiver,
            senderInfor: {
                sender: 'NV. ' + user?.user?.name,
                senderId: user?.user?.id,
            },
            message: message,
            sentTime: new Date().toISOString(),
        }

        try {
            // Gửi tin nhắn tới máy chủ WebSocket
            connection.current.send(JSON.stringify(newMessage))
        } catch (error) {
            console.log(error)
        }
        // Cập nhật tin nhắn vào danh sách cuộc trò chuyện
        const newArray = [...listChatData]
        const chatDataIndex = newArray.findIndex((chat) => chat.customerInfor.id === receiver)
        const newChatMessage = {
            message: message,
            sender: 'NV. ' + user?.user?.name,
            senderId: user?.user?.id,
            sentTime: new Date().toISOString(),
        }
        const newChatData = { ...newArray[chatDataIndex] }
        newChatData.listMessage = [...newChatData.listMessage, newChatMessage]
        const updateArray = [...newArray]
        updateArray[chatDataIndex] = newChatData
        setListChatData(updateArray)
    }
    const getData = (data) => {
        // Lấy mã số
        const colonIndex = data.indexOf(':')
        const id = data.substring(0, colonIndex)

        // Lấy các thành phần
        const jsonStr = data.substring(colonIndex + 1)
        const obj = JSON.parse(jsonStr)
        const senderInfor = obj.senderInfor
        const message = obj.message
        const time = obj.sentTime
        const rep = obj.rep

        return {
            id: id,
            rep: rep,
            senderInfor: senderInfor,
            message: message,
            sentTime: time,
        }
    }
    const handleReceiveMessage = (data) => {
        const newArray = [...listChatData]
        const newData = getData(data)
        //Nếu tin nhắn là từ khách hàng
        if (newData.id.length === 36) {
            const chatDataIndex = newArray.findIndex((chat) => chat.customerInfor.id === newData.id)
            // Nếu đã có cuộc trò chuyện, thêm tin nhắn vào cuộc trò chuyện đó
            if (chatDataIndex != -1) {
                const newMessage = {
                    message: newData.message,
                    sender: newArray[chatDataIndex].customerInfor.name,
                    senderId: newArray[chatDataIndex].customerInfor.id,
                    sentTime: newData.sentTime,
                }
                const newChatData = { ...newArray[chatDataIndex] }
                newChatData.listMessage = [...newChatData.listMessage, newMessage]
                const updateArray = [...newArray]
                updateArray[chatDataIndex] = newChatData
                setListChatData(updateArray)
            } else {
                // Nếu chưa có cuộc trò chuyện, tạo cuộc trò chuyện mới
                const newChatData = {
                    customerInfor: {
                        id: newData.id,
                        ...newData.senderInfor,
                    },
                    listMessage: [
                        {
                            message: newData.message,
                            sender: newData.senderInfor.name,
                            senderId: newData.id,
                            sentTime: newData.sentTime,
                        },
                    ],
                }
                newArray.push(newChatData)
                setListChatData(newArray)
            }
        } else {
            // Nếu tin nhắn là từ nhân viên
            const chatDataIndex = newArray.findIndex(
                (chat) => chat.customerInfor.id === newData.rep,
            )
            if (chatDataIndex != -1) {
                const newMessage = {
                    message: newData.message,
                    sender: newData.senderInfor.sender,
                    senderId: newData.senderInfor.senderId,
                    sentTime: newData.sentTime,
                }
                const newChatData = { ...newArray[chatDataIndex] }
                newChatData.listMessage = [...newChatData.listMessage, newMessage]
                const updateArray = [...newArray]
                updateArray[chatDataIndex] = newChatData
                setListChatData(updateArray)
            } else {
                // Nếu chưa có cuộc trò chuyện,
                // tạo cuộc trò chuyện mới khi có tin nhắn mới từ khách hàng chứ ko phải
                // từ nhân viên khác
            }
        }
    }
    const handleReceiveMessageRef = useRef(handleReceiveMessage)

    const handleConnectError = (error) => {
        //Refresh lại trang hiện tại
        // window.location.reload()
    }

    const handleAddMessage = (listData) => {
        const newArray = []
        listData.forEach((jsonString) => {
            const newData = getData(jsonString)
            //Nếu tin nhắn là từ khách hàng
            if (newData.id.length === 36) {
                const chatDataIndex = newArray.findIndex(
                    (chat) => chat.customerInfor.id === newData.id,
                )
                // Nếu đã có cuộc trò chuyện, thêm tin nhắn vào cuộc trò chuyện đó
                if (chatDataIndex != -1) {
                    const newMessage = {
                        message: newData.message,
                        sender: newArray[chatDataIndex].customerInfor.name,
                        senderId: newArray[chatDataIndex].customerInfor.id,
                        sentTime: newData.sentTime,
                    }
                    newArray[chatDataIndex].listMessage.push(newMessage)
                } else {
                    // Nếu chưa có cuộc trò chuyện, tạo cuộc trò chuyện mới
                    const newChatData = {
                        customerInfor: {
                            id: newData.id,
                            ...newData.senderInfor,
                        },
                        listMessage: [
                            {
                                message: newData.message,
                                sender: newData.senderInfor.name,
                                senderId: newData.id,
                                sentTime: newData.sentTime,
                            },
                        ],
                    }
                    newArray.push(newChatData)
                }
            } else {
                // Nếu tin nhắn là từ nhân viên
                const chatDataIndex = newArray.findIndex(
                    (chat) => chat.customerInfor.id === newData.rep,
                )
                if (chatDataIndex != -1) {
                    const newMessage = {
                        message: newData.message,
                        sender: newData.senderInfor.sender,
                        senderId: newData.senderInfor.senderId,
                        sentTime: newData.sentTime,
                    }
                    newArray[chatDataIndex].listMessage.push(newMessage)
                } else {
                    // Nếu chưa có cuộc trò chuyện,
                    // tạo cuộc trò chuyện mới khi có tin nhắn mới từ khách hàng chứ ko phải
                    // từ nhân viên khác
                }
            }
        })
        return newArray[0] ? newArray[0] : null
    }

    const handleBackupMessage = (data) => {
        //substring để lấy dữ liệu từ sau chuỗi "Backup: "
        const jsonStr = data.substring(7)
        //Chuyển chuỗi json thành object
        const backupData = JSON.parse(jsonStr)
        //Lấy mảng hiện tại
        const listData = []
        let tempData = null
        // Loop through all keys in backupData
        for (let key in backupData) {
            if (backupData.hasOwnProperty(key)) {
                // Each value is an array of JSON strings, so we need to parse each one
                tempData = handleAddMessage(backupData[key])
                if (tempData) listData.push(tempData)
            }
        }
        setListChatData(listData)
    }

    const handleCloseClientChat = (sessionId) => {
        try {
            connection.current.send('Close: ' + sessionId)
            //remove chat has sessionId from listChatData
            const newChatData = listChatData.filter((chat) => chat.customerInfor.id !== sessionId)
            setListChatData(newChatData)
            if (newChatData.length > 0) setActiveChat(newChatData[0])
            else setActiveChat(null)
        } catch (error) {
            console.log(error)
        }
    }

    // Cập nhật ref mỗi khi handleReceiveMessage thay đổi
    useEffect(() => {
        handleReceiveMessageRef.current = handleReceiveMessage
    }, [handleReceiveMessage])

    useEffect(() => {
        // Kết nối tới máy chủ WebSocket
        const host = process.env.REACT_APP_SOCKET_URL
        console.log(host)
        const hostname = host ? host : window.location.host
        let protocol = ''
        if (window.location.protocol === 'https:') {
            protocol = 'wss'
        } else if (window.location.protocol === 'http:') {
            protocol = 'ws'
        }
        let authorizationString = ''
        if (user && user.accessToken) authorizationString = user.accessToken
        let connectionString =
            authorizationString == ''
                ? `${protocol}://${hostname}/api/socket/chat`
                : `${protocol}://${hostname}/api/socket/chat?authorization=Bearer%20` +
                  user.accessToken
        const newSocket = new WebSocket(connectionString)
        connection.current = newSocket

        // Listen for messages
        connection.current.addEventListener('message', (event) => {
            if (event.data.startsWith('Backup')) {
                handleBackupMessage(event.data)
            } else handleReceiveMessageRef.current(event.data)
        })
        //Listen for errors
        connection.current.addEventListener('error', (event) => {
            handleConnectError(event.error)
        })
        // Cleanup: Đóng kết nối khi component unmount
        return () => connection.current.close()
    }, [])

    useEffect(() => {
        if (listChatData.length === 1) setActiveChat(listChatData[0])
    }, [listChatData])
    return (
        <MainContainer style={{ height: '535px', alignItems: 'stretch' }}>
            <Sidebar
                style={{
                    width: '300px',
                    overflow: 'auto',
                    backgroundColor: '#f4f4f4',
                    flex: 1,
                }}
                position="left"
                scrollable={true}
            >
                <ConversationHeader>
                    <Avatar
                        name={'NV. ' + user?.user?.name}
                        src={user?.user?.staff?.img}
                        status="available"
                    />
                    <ConversationHeader.Content userName={'NV. ' + user?.user?.name} />
                </ConversationHeader>
                <Search placeholder="Tìm kiếm..." />
                <ConversationList>
                    {listChatData.map((chatData) => (
                        <CustomerConversation
                            key={chatData.customerInfor.id}
                            chatData={chatData}
                            active={activeChat}
                            onClick={setActiveChat}
                            setActiveAVT={setActiveAVT}
                        ></CustomerConversation>
                    ))}
                </ConversationList>
            </Sidebar>
            <ChatBox
                chatData={activeChat}
                handleSendMessage={sendMessage}
                avt={activeAVT}
            ></ChatBox>
            <Sidebar
                style={{
                    width: '300px',
                    overflow: 'hidden',
                    backgroundColor: '#f4f4f4',
                    position: 'relative',
                    flex: 1,
                }}
                position="right"
            >
                <ConversationHeader>
                    <Avatar name={'NV. ' + user?.user?.name} src={guest_icon} />
                    <ConversationHeader.Content>
                        <span style={{ fontWeight: 500 }}>Thông tin khách hàng</span>
                    </ConversationHeader.Content>
                </ConversationHeader>
                {activeChat && (
                    <ExpansionPanel open title="Thông tin liên hệ">
                        <p>
                            <i className="">{'Tên: '}</i>
                            <b>{activeChat.customerInfor.name}</b>
                        </p>
                        <p>
                            <i>{'SĐT: '}</i>
                            <b>{activeChat.customerInfor.tel}</b>
                        </p>
                        <p>
                            <i>{'Email: '}</i>
                            <b>{activeChat.customerInfor.email}</b>
                        </p>
                    </ExpansionPanel>
                )}
                {activeChat && (
                    <CButton
                        className="position-absolute bottom-0 start-50 translate-middle-x mb-3 p-2"
                        onClick={() => handleCloseClientChat(activeChat.customerInfor.id)}
                    >
                        Đóng đoạn chat
                    </CButton>
                )}
            </Sidebar>
        </MainContainer>
    )
}

export default Chat
