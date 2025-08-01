import React from 'react'
import { useChatStore } from '../Store/useChatStore'
import { useAuthStore } from '../Store/useAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    return (
        <div className="p-2 5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.name} />
                        </div>
                    </div>
                    {/* user info */}
                    <div className="">
                        <div className="font-medium">{selectedUser.name}</div>
                        <p className="text-sm text-base-content/70">{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
                    </div>
                </div>
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader