import { Bubble, GiftedChat, IMessage, InputToolbar, Send, SystemMessage } from 'react-native-gifted-chat'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react';

import ChatMessageBox from '@/components/ChatMessageBox';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ReplyMessageBar from '@/components/ReplyMessageBar';
import { Swipeable } from 'react-native-gesture-handler';
import messageData from '@/model/messages.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
    const [ msg, setMsg ] = useState<IMessage[]>([])
    const [ text, setText ] = useState('')
    const insets = useSafeAreaInsets()
    
    const [replyMessage, setReplyMessage] = useState<IMessage | null>(null)
    const swipeableRowRef = useRef<Swipeable | null>(null)


    useEffect(() => {
        setMsg([
            ...messageData.map((message) => {
                return {
                    _id: message.id,
                    text: message.msg,
                    createdAt: new Date(message.date),
                    user: {
                        _id: message.from,
                        name: message.from ? 'You' : 'Bob',
                    }
                }
            })
        ])
    }, [])

    const onSend = useCallback((msg = []) => {
        setMsg((previousMessages: any[]) => 
            GiftedChat.append(previousMessages, msg),
        )
    }, [])


const  renderInputToolbar = (props: any) => {
    return (
        <InputToolbar 
        {...props}
        containerStyle={{ backgroundColor: Colors.light.background, marginBottom: -20, alignItems: 'center' }}
        renderActions={() => (
            <View style={{height: 44, justifyContent: 'center', alignItems: 'center', left: 5}}>
                <Ionicons name='add' color={Colors.light.icon} size={28} />
            </View>
        )}
        />
    )}

    const updateRowRef = useCallback(
        (ref: any) => {
            if (
                ref &&
                replyMessage &&
                ref.props.children.props.currentMessage?._id === replyMessage._id
            ) {
                swipeableRowRef.current = ref;
            }
        },
        [replyMessage]
    )

    useEffect(() => {
        if (replyMessage && swipeableRowRef.current) {
            swipeableRowRef.current.close()
            swipeableRowRef.current = null
        }
    }, [replyMessage])

    return (
        <ImageBackground
        source={require('@/assets/images/react-logo.png')}
        style={{
          flex: 1,
          backgroundColor: Colors.light.background,
          marginBottom: insets.bottom,
        }}
        >
        <GiftedChat 
            messages={msg}
            onSend={(msg: any) => onSend(msg)}
            user={{
                _id: 1,
            }}
            renderSystemMessage={(props) => (
                <SystemMessage {...props} textStyle={{ color: Colors.dark.text}} />
            )}
            bottomOffset={insets.bottom}
            renderAvatar={null}
            maxComposerHeight={100}
            textInputProps={styles.composer}
            renderBubble={(props) => {
                return (
                    <Bubble 
                        {...props}
                        textStyle={{
                            right: {
                                color: '#000'
                            },
                        }}
                        wrapperStyle={{
                            left: {
                                backgroundColor: '#fff'
                            },
                        }}
                    />
                )
            }}
            renderSend={(props) => (
                <View
                    style={{
                        height: 44,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 14,
                        paddingHorizontal: 14,
                    }}
                >
                    {text === '' && (
                        <>
                            <Ionicons name="camera-outline" color={Colors.dark.background} size={28} />
                            <Ionicons name="mic-outline" color={Colors.dark.background} size={28} />
                        </>
                    )}
                    {text !== '' && (
                        <Send
                        {...props}
                        containerStyle={{
                            justifyContent: 'center',
                            
                        }}
                        >
                        <Ionicons name="send" color={Colors.dark.background} size={82} />
                        </Send>
                    )}
                </View>
            )}
            renderInputToolbar={renderInputToolbar}
            renderChatFooter={() => (
                <ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage}/>
            )}
            onLongPress={(context, message) => setReplyMessage(message)}
            renderMessage={(props) => (
                <ChatMessageBox {...props} setReplyOnSwipeOpen={setReplyMessage} updateRowRef={updateRowRef}/>
            )}
        />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    composer: {
        backgroundColor: '#fff',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.dark.background,
        paddingHorizontal: 10,
        paddingTop: 8,
        fontSize: 16,
        marginVertical: 4,
    }
})


export default Page;