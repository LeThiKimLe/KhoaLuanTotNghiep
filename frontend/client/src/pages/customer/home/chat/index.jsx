import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    ConversationHeader,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState, useRef } from "react";
import chatIcon from "../../../../assets/chat_icon.png"
import mystyles from './styles.module.css'
import Button from "../../../../components/common/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faXmark } from "@fortawesome/free-solid-svg-icons";
import chatbot from "../../../../assets/chatbot.png"
import guest from "../../../../assets/guest-icon.svg"
import agent from "../../../../assets/agent.svg"
import chatThunk from "../../../../feature/chat/chat.service";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectListCompany } from "../../../../feature/bus-company/busCompany.slice";
import busCompanyThunk from "../../../../feature/bus-company/busCompany.service";


const OptionBox = ({ option, setOption, closeForm, setUserInfor, company, setCompany }) => {
    const [userOption, setUserOption] = useState(option ? option : 'chatbot')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const userInfor = useRef(null)
    const [err, setErr] = useState('')
    const dispatch = useDispatch()
    const listCompany = useSelector(selectListCompany)
    const handleStart = () => {
        if (userOption === 'chatbot') {
            setOption(userOption)
        }
        else {
            if (userInfor.current.checkValidity()) {
                if (userOption === 'company') {
                    if (company === 0) {
                        setErr('Vui lòng chọn nhà xe')
                        return
                    }
                } else setErr('')
                setUserInfor({
                    name: name,
                    email: email,
                    tel: tel
                })
                setOption(userOption)
            }
            else {
                userInfor.current.reportValidity()
            }
        }
    }
    useEffect(() => {
        if (userOption === "company")
        {
            dispatch(busCompanyThunk.getListBusCompany())
            .unwrap().then(()=>{}).catch((err)=>{console.log(err)})
        }
    }, [userOption])
    return (
        <div className={mystyles.optionBox}>
            <div className={mystyles.header}>
                <FontAwesomeIcon icon={faHeadset} size="2x" />
                <i>Hỗ trợ khách hàng</i>
                <FontAwesomeIcon icon={faXmark} size="2x" onClick={closeForm} />
            </div>
            <div className={mystyles.content}>
                <div className={mystyles.optionInput}>
                    <input
                        type="radio"
                        id="option1"
                        name="option"
                        value="chatbot"
                        checked={userOption === 'chatbot'}
                        onChange={(e) => setUserOption(e.target.value)}
                    />
                    <label for="option1">Hỗ trợ tự động</label>
                    <br></br>
                    {userOption === 'chatbot' &&
                        <i className={mystyles.tip}>
                            Giúp bạn giải đáp các thắc mắc về quy định của hãng, thao tác trên hệ thống,
                            nhanh chóng 24/7
                        </i>
                    }
                </div>
                <div className={mystyles.optionInput}>
                    <input
                        type="radio"
                        id="option2"
                        name="option"
                        value="agent"
                        checked={userOption === 'agent'}
                        onChange={(e) => setUserOption(e.target.value)}
                    />
                    <label for="option2">Chat với nhân viên hệ thống</label>
                    <br></br>
                    {userOption === 'agent' &&
                        <i className={mystyles.tip}>
                            Hỏi đáp trực tiếp với nhân viên các vấn đề về đặt vé, giá vé, khiếu nại...
                        </i>
                    }
                </div>
                <div className={mystyles.optionInput}>
                    <input
                        type="radio"
                        id="option3"
                        name="option"
                        value="company"
                        checked={userOption === 'company'}
                        onChange={(e) => setUserOption(e.target.value)}
                    />
                    <label for="option2">Chat với nhà xe</label>
                    {userOption === 'company' &&
                        <>
                            <select value={company} onChange={(e) => setCompany(parseInt(e.target.value))}>
                                <option disabled value="0">Chọn nhà xe</option>
                            {    
                                listCompany.map((company, index) => (
                                    <option key={index} value={company.busCompany.id}>
                                        {company.busCompany.name}
                                    </option>
                                ))
                            }
                            </select>
                            <br></br>
                            <i className={mystyles.tip}>
                                Hỏi đáp trực tiếp với nhân viên các vấn đề về thông tin đặt vé, hỗ trợ đặt vé, tư vấn đặt vé ...
                            </i>
                        </>
                    }
                </div>
                {
                    (userOption === 'agent' || userOption === 'company') && (
                        <div className={mystyles.chatInfor}>
                            <h2>
                                <i>
                                    Để chat với nhân viên / nhà xe, bạn vui lòng cung cấp các thông tin cá nhân sau
                                    để chúng tôi thuận tiện hỗ trợ
                                </i>
                            </h2>
                            <form ref={userInfor}>
                                <input
                                    placeholder="Họ và tên của bạn"
                                    id="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                                <br></br>
                                <input
                                    placeholder="Email của bạn"
                                    id="name"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                <br></br>
                                <input
                                    placeholder="Số điện thoại của bạn"
                                    id="tel"
                                    type="text"
                                    pattern="^(0\d{9,10}|\+\d{1,3}\s?\d{1,14})$"
                                    required
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                >
                                </input>
                            </form>
                        </div>
                    )
                }
                <i style={{color: 'red'}}>{err}</i>
            </div>
            <div className={mystyles.chatBtn}>
                <Button
                    onClick={handleStart}
                    text="Bắt đầu trò chuyện">
                </Button>
            </div>
        </div>
    )
}

const Chat = () => {
    const [openBox, setOpenBox] = useState(false);
    const listCompany = useSelector(selectListCompany)
    const [option, setOption] = useState(null);
    const [currentInput, setCurrentInput] = useState('')
    const [userInfor, setUserInfor] = useState({})
    const [company, setCompany] = useState(0)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const connection = useRef(null)
    const [enableChat, setEnableChat] = useState(true)
    const [listMessage, setlistMesssage] = useState([{
        message: 'Xin chào. Tôi có thể giúp gì cho bạn?',
        direction: 'incoming',
        sender: 'Assistant',
    }])

    const handleSendChatbotMessage = async () => {
        const newMessage = {
            message: currentInput,
            direction: 'outgoing',
            sender: 'customer',
        }
        setlistMesssage(prevArray => [...prevArray, newMessage])
        const question = "Trả lời chi tiết bằng tiếng việt câu hỏi sau: " + currentInput
        setCurrentInput('')
        setTimeout(() => setLoading(true), 500)
        dispatch(chatThunk.sendChatbotQuery(question))
            .unwrap()
            .then((ans) => {
                console.log(ans)
                if (ans.data == '')
                    ans = 'Hệ thống đang bận. Bạn vui lòng thử lại sau.'
                const repMessage = {
                    message: ans,
                    direction: 'incoming',
                    sender: 'Assistant',
                }
                setlistMesssage(prevArray => [...prevArray, repMessage])
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleSendMessageToStaff = () => {
        const newMessage = {
            message: currentInput,
            direction: 'outgoing',
            sender: 'customer',
        }
        setlistMesssage(prevArray => [...prevArray, newMessage])
        // Gửi tin nhắn tới máy chủ WebSocket
        connection.current.send(JSON.stringify({
            senderInfor: userInfor,
            message: currentInput,
            sentTime: new Date().toISOString()
        }));
        setCurrentInput('')
        setTimeout(() => setLoading(true), 1000)
    };

    const handleReceiveMessage = (data) => {
        const chatData = JSON.parse(data)
        const repMessage = {
            message: chatData.message,
            direction: 'incoming',
            sender: chatData.sender,
        }
        setlistMesssage(prevArray => [...prevArray, repMessage])
        setLoading(false)
    }

    const getAgentName = () => {
        if (option === 'chatbot') return 'Trợ lý ảo'
        if (option === 'agent') return 'Nhân viên hệ thống'
        else if (option === 'company') return listCompany.find(cpn => cpn.busCompany.id === company)?.busCompany?.name
    }

    useEffect(() => {
        setEnableChat(true)
        setlistMesssage([{
            message: 'Xin chào. Tôi có thể giúp gì cho bạn?',
            direction: 'incoming',
            sender: 'Assistant',
        }])
        const host = process.env.REACT_APP_SOCKET_URL
        const hostname = host ? host : window.location.host
        let protocol = ''
        if (window.location.protocol === 'https:') {
            protocol = 'wss'
        } else if (window.location.protocol === 'http:') {
            protocol = 'ws'
        }
        if (openBox && (option === 'agent' || option === 'company')) {
            // Tạo kết nối WebSocket khi component được mount
            let socket = null
            if (option === 'agent') 
                socket = new WebSocket(`${protocol}://${hostname}/api/socket/chat`);
            else if (option === 'company')
                socket = new WebSocket(`${protocol}://${hostname}/api/socket/company/chat?id=${company}`);
            // Listen for messages
            socket.addEventListener("message", (event) => {
                handleReceiveMessage(event.data)
            })
            //Listen for close connect
            socket.addEventListener("close", (event) => {
                setEnableChat(false)
            })
            connection.current = socket
            return () => connection.current.close()
        }
    }, [openBox, option])

    useEffect(() => {
        setEnableChat(true)
        setlistMesssage([])
    }, [])

    return (
        <div style={{ width: 'fit-content' }}>
            {
                openBox && option && (
                    <div className={mystyles.chatBox}>
                        <MainContainer>
                            <ChatContainer>
                                <ConversationHeader>
                                    <ConversationHeader.Back onClick={() => setOption(null)} />
                                    <Avatar
                                        name={getAgentName()}
                                        src={option === 'chatbot' ? chatbot : agent}
                                        status="available"
                                    />
                                    <ConversationHeader.Content
                                        info="Đang hoạt động"
                                        userName={getAgentName()}
                                    />
                                </ConversationHeader>
                                <MessageList
                                    typingIndicator={loading &&
                                        <TypingIndicator content={option === 'chatbot' ? 'Chatbot đang trả lời bạn'
                                            : 'Nhân viên đang trả lời bạn'} />}>
                                    {
                                        listMessage.map((mess) => (
                                            <Message
                                                model={{
                                                    message: mess.message,
                                                    sentTime: "just now",
                                                    sender: mess.sender,
                                                    direction: mess.direction,
                                                    position: "single",
                                                }}
                                                avatarPosition={mess.direction === "incoming" ? "tl" : "br"}
                                            >
                                                <Avatar
                                                    name={mess.sender}
                                                    src={
                                                        mess.direction === 'incoming' ? (
                                                            option === 'chatbot' ? chatbot
                                                                : agent
                                                        ) : guest
                                                    }
                                                />
                                                <Message.Header sender={mess.sender}></Message.Header>
                                            </Message>
                                        )
                                        )
                                    }
                                </MessageList>
                                <MessageInput
                                    disabled={!enableChat}
                                    value={currentInput}
                                    placeholder={enableChat ? "Nhập tin nhắn ở đây" : "Nhân viên đã kết thúc cuộc trò chuyện"}
                                    onChange={(e) => setCurrentInput(e)}
                                    onSend={option === 'chatbot' ? handleSendChatbotMessage : handleSendMessageToStaff}
                                />
                            </ChatContainer>
                        </MainContainer>
                    </div>
                )
            }
            {
                openBox && !option && (
                    <OptionBox
                        option={option}
                        setOption={setOption}
                        closeForm={() => setOpenBox(false)}
                        setUserInfor={setUserInfor}
                        company={company}
                        setCompany={setCompany}
                    >
                    </OptionBox>
                )
            }
            <div className={mystyles.chatIcon} role="button" onClick={() => setOpenBox(!openBox)}>
                <img src={chatIcon}></img>
            </div>
        </div>
    )
}

export default Chat
