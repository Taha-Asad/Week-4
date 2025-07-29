import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore'
import { Camera, Mail, User, Pencil, Eye, EyeOff, Lock, Save } from "lucide-react"

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newEmail, setNewEmail] = useState(authUser?.user.email || '')
  const [newPassword, setNewPassword] = useState(authUser?.user.password || '')
  const [selectedImage, setSelectedImage] = useState(null)
  const handleUpdateData = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image })
    }
  }

  const handleEmailSave = async () => {
    if (!newEmail) return;
    await updateProfile({ email: newEmail });
    setIsEditingEmail(false);
  }

  const handlePasswordSave = async () => {
    if (!newPassword) return;
    await updateProfile({ password: newPassword });
    setNewPassword('');
    setIsEditingPassword(false);
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl py-8 p-4 mx-auto">
        <div className="rounded-xl bg-base-300 p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img src={selectedImage || authUser.user.profilePic || "/avatar.png"} alt=""
                className="size-32 rounded-full object-cover border-4" />
              <label htmlFor="avatar-upload" className={`absolute bottom-4 right-0 bg-base-content hover:scale-105 p-2 cursor-pointer rounded-full transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                <Camera className="w-5 h-5 text-base-200" />
                <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={handleUpdateData} disabled={isUpdatingProfile} />
              </label>
            </div>
            <p className="text-sm text-zinc-400">{isUpdatingProfile ? "Uploading..." : "Click camera icon to upload your photo"}</p>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </div>
              <div className="relative">
                <p className="px-4 py-2.5 rounded-lg border w-full">{authUser?.user.name || "John Doe"} </p>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <div className="relative">
                {isEditingEmail ? (
                  <>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="px-4 py-2.5 rounded-lg border w-full pr-10 bg-base-100"
                    />
                    <Save
                      className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 cursor-pointer hover:text-green-600"
                      onClick={handleEmailSave}
                    />
                  </>
                ) : (
                  <>
                    <p className="px-4 py-2.5 rounded-lg border w-full pr-10">{authUser.user.email}</p>
                    <Pencil
                      className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-zinc-500 cursor-pointer hover:text-zinc-700"
                      onClick={() => setIsEditingEmail(true)}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Password
              </div>
              <div className="relative">
                {isEditingPassword ? (
                  <>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="px-4 py-2.5 rounded-lg border w-full pr-20 bg-base-100 tracking-widest"
                    />
                    {/* Show/Hide toggle */}
                    <div className="absolute top-1/2 right-10 transform -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-zinc-700">
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" onClick={() => setShowPassword(false)} />
                      ) : (
                        <Eye className="w-4 h-4" onClick={() => setShowPassword(true)} />
                      )}
                    </div>
                    {/* Save icon */}
                    <Save
                      className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 cursor-pointer hover:text-green-600"
                      onClick={handlePasswordSave}
                    />
                  </>
                ) : (
                  <>
                    {/* Placeholder dots only */}
                    <p className="px-4 py-2.5 rounded-lg border w-full pr-20 tracking-widest select-none">
                      {"••••••••"}
                    </p>
                    <div className="absolute top-1/2 right-10 transform -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-zinc-700">
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" onClick={() => setShowPassword(false)} />
                      ) : (
                        <Eye className="w-4 h-4" onClick={() => setShowPassword(true)} />
                      )}
                    </div>
                    {/* Edit icon */}
                    <Pencil
                      className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-zinc-500 cursor-pointer hover:text-zinc-700"
                      onClick={() => setIsEditingPassword(true)}
                    />
                  </>
                )}
              </div>
            </div>


            {/* Account Info */}
            <div className="mt-6 p-6 rounded-xl bg-base-300">
              <h1 className="text-lg font-medium mb-4">Account Information</h1>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser.user.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center py-2 justify-between">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
