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
import { useState } from "react";
import chatIcon from "../../../../assets/chat_icon.png"
import mystyles from './styles.module.css'
import Button from "../../../../components/common/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faXmark } from "@fortawesome/free-solid-svg-icons";
import chatbot from "../../../../assets/chatbot.png"
import guest from "../../../../assets/guest-icon.svg"
import chatThunk from "../../../../feature/chat/chat.service";
import { useDispatch } from "react-redux";
import axios from "axios";

const OptionBox = ({ option, setOption, closeForm }) => {
    const [userOption, setUserOption] = useState(option ? option : 'chatbot')
    return (
        <div className={mystyles.optionBox}>
            <div className={mystyles.header}>
                <FontAwesomeIcon icon={faHeadset} size="2x"/>
                <i>Hỗ trợ khách hàng</i>
                <FontAwesomeIcon icon={faXmark} size="2x" onClick={closeForm}/>
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
                    <label for="option2">Chat với nhân viên</label>
                    <br></br>
                    {userOption === 'agent' &&
                        <i className={mystyles.tip}>
                            Hỏi đáp trực tiếp với nhân viên các vấn đề về đặt vé, giá vé, ...
                        </i>
                    }
                </div>
                {
                    userOption === 'agent' && (
                        <div className={mystyles.chatInfor}>
                            <h2>
                                <i>
                                    Để chat với nhân viên, bạn vui lòng cung cấp các thông tin cá nhân sau
                                    để chúng tôi thuận tiện hỗ trợ
                                </i>
                            </h2>
                            <form>
                                <input placeholder="Họ và tên của bạn" id="name" type="text"></input>
                                <br></br>
                                <input placeholder="Email của bạn" id="name" type="email"></input>
                                <br></br>
                                <input
                                    placeholder="Số điện thoại của bạn"
                                    id="tel"
                                    type="text"
                                    pattern="^0[0-9]{9,10}$">
                                </input>
                            </form>
                        </div>
                    )
                }
            </div>
            <div className={mystyles.chatBtn}>
                <Button
                    onClick={() => setOption(userOption)}
                    text="Bắt đầu trò chuyện">
                </Button>
            </div>
        </div>
    )
}

const Chat = () => {
    const [openBox, setOpenBox] = useState(false);
    const [option, setOption] = useState(null);
    const [currentInput, setCurrentInput] = useState('')
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [listMessage, setlistMesssage] = useState([{
            message: 'Xin chào. Tôi có thể giúp gì cho bạn?',
            direction: 'incoming',
            sender: 'assistant',
        }])

    const handleSendMessage = async () => {
        const newMessage = {
            message: currentInput,
            direction: 'outgoing',
            sender: 'customer',
        }
        setlistMesssage(prevArray => [...prevArray, newMessage])
        const question = "Trả lời chi tiết bằng tiếng việt câu hỏi sau: " + currentInput
        setCurrentInput('')
        dispatch(chatThunk.sendChatbotQuery(question))
        .unwrap()
        .then((ans) => {
            const repMessage = {
                message: ans,
                direction: 'incoming',
                sender: 'assistant',
            }
            setlistMesssage(prevArray => [...prevArray, repMessage])
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

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
                                        name={option === 'chatbot' ? 'Trợ lý ảo' : 'Nhân viên tư vấn'}
                                        src={option === 'chatbot' ? chatbot : 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg'}
                                        status="available"
                                    />
                                    <ConversationHeader.Content
                                        info="Đang hoạt động"
                                        userName={option === 'chatbot' ? 'Trợ lý ảo' : 'Nhân viên tư vấn'}
                                    />
                                </ConversationHeader>
                                <MessageList 
                                    typingIndicator={ loading && 
                                        <TypingIndicator content={option === 'chatbot' ? 'Chatbot đang trả lời bạn' 
                                    :'Nhân viên đang trả lời bạn'} />}>
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
                                                avatarPosition = {mess.direction === "incoming" ? "tl" : "br"}
                                            >
                                                <Avatar
                                                    name={mess.sender}
                                                    src={
                                                        mess.direction === 'incoming' ? (
                                                            option === 'chatbot' ? chatbot 
                                                            : 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg'
                                                        ) : guest
                                                    }
                                                />
                                            </Message>
                                        )
                                        )
                                    }
                                </MessageList>
                                <MessageInput 
                                    value={currentInput} 
                                    placeholder="Nhập tin nhắn ở đây" 
                                    onChange={(e) => setCurrentInput(e)} 
                                    onSend={handleSendMessage}
                                />
                            </ChatContainer>
                        </MainContainer>
                    </div>
                )
            }
            {
                openBox && !option && (
                    <OptionBox option={option} setOption={setOption} closeForm={() => setOpenBox(false)}></OptionBox>
                )
            }
            <div className={mystyles.chatIcon} role="button" onClick={() => setOpenBox(!openBox)}>
                <img src={chatIcon}></img>
            </div>
        </div>
    )
}

export default Chat
