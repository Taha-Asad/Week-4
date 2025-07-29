import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChatStore'
import SidebarSkeletion from './skeletons/SidebarSkeletion';
import { Users } from 'lucide-react';
import { useAuthStore } from '../Store/useAuthStore';

const Sidebar = () => {
    const { users, getUser, isUserLoading, selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    useEffect(() => { getUser() }, [getUser])
    if (isUserLoading) return <SidebarSkeletion />
    return (
        <>
            <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
                <div className="border-b border-base-300 p-5 w-full">
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        <span className="font-medium hidden lg:block">
                            Contacts
                        </span>
                    </div>
                    {/* Online filter toggle */}
                </div>
                <div className="overflow-y-auto py-3 w-full">
                    {users.map((user) => {
                        return (
                            <>
                                <button key={user._id} onClick={() => setSelectedUser(user)}
                                    className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>
                                    <div className="relative mx-auto lg:mx-0">
                                        <img src={user.profilePic || "/avatar.png"} alt={user.name} className="size-12 object-cover rounded-full" />
                                        {onlineUsers.includes(user._id) && (
                                            <span className="absolute bottom-0 right-0 size-3  bg-green-500 rounded-full ring-2 ring-zinc-900" />
                                        )}
                                    </div>
                                    {/* user info */}
                                    <div className="hidden lg:block text-left min-w-0">
                                        <div className="font-medium truncate">{user.name}</div>
                                        <div className="text-sm text-zinc-500">{
                                            onlineUsers.includes(user._id) ? "Online" : "Offline"
                                        }
                                        </div>
                                    </div>
                                </button>
                            </>
                        )
                    })}
                </div>
            </aside>
        </>
    )
}

export default Sidebar