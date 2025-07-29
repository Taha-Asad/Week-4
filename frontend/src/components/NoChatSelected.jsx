import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChatSelected = () => {
    return (
        <>
            <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
                <div className="max-w-md space-y-8 text-center">
                    {/* Icon display */}
                    <div className="flex justify-center mb-4 gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                                <MessageSquare className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold">Welcome to RTCA!</h2>
                    <p className="text-base-content/60">
                        Select A chat from Side bar to start chatting
                    </p>
                </div>
            </div>
        </>
    )
}

export default NoChatSelected