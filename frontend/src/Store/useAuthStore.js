import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Error creating account", error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  checkAuth: async () => {
    try {
      const res = axiosInstance.get("/auth/check");
      set({ authUser: (await res).data });
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: false });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      console.log(res.data)
      toast.success(`User logged In successfully! Welcome ${res.data.user.name}`);
    } catch (error) {
      toast.error("Error logging in account", error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully");
    } catch (error) {
      toast.error("Error in logging out", error.message);
    }
  },
  updateProfile: async (data) => {
    set({isUpdatingProfile:false})
    try {
      const res = await axiosInstance.put("/auth/update-profile" , data)
      set({authUser: res.data})
      toast.success("Profile Updated successfully" , res.data)
    } catch (error) {
      toast.error("Error Updating profile" , error.message)
    }finally{
      set({isUpdatingProfile:false})
    }
  }
}));
