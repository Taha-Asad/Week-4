import React, { useEffect } from 'react';
import { useChatStore } from '../Store/useChatStore';
import MessagesSkeleton from './skeletons/MessagesSkeleton';
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import { useAuthStore } from '../Store/useAuthStore';

const ChatContainer = () => {
    const { messages, selectedUser, isMessageLoading, getMessages, subscribeToMessages, unSubscribeToMessages } = useChatStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
        }
        subscribeToMessages();

        return () => unSubscribeToMessages();
    }, [getMessages, selectedUser?._id, subscribeToMessages, unSubscribeToMessages]);

    if (isMessageLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessagesSkeleton />
                <MessagesInput />
            </div>
        );
    }
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {messages.map((message) => {
                    const isSender = message.senderId?.toString() === authUser?.user?._id?.toString();

                    const profilePic = isSender
                        ? authUser?.user.profilePic || "/avatar.png"
                        : selectedUser?.profilePic || "/avatar.png";

                    const timestamp = message.createdAt
                        ? new Date(message.createdAt).toLocaleTimeString()
                        : "Unknown";

                    return (
                        <div key={message._id} className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full border">
                                    <img src={profilePic} alt="profile" />
                                </div>
                            </div>
                            <div className="chat-header mb-1">
                                <time className="text-xs opacity-50 ml-1">{timestamp}</time>
                            </div>
                            <div className="chat-bubble flex flex-col">
                                {message.image && (
                                    <img src={message.image} alt="attachment" className="rounded-md mb-2 sm:max-w-[200px]" />
                                )} {" "}
                                {message.text && (<p>{message.text}</p>)}
                            </div>
                        </div>
                    );
                })}
            </div>
            <MessagesInput />
        </div>

    );
};

export default ChatContainer;
