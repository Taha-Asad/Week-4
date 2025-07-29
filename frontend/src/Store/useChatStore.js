import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUser: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/user");
      console.log("Fetched users:", res.data);
      set({ users: res.data.filteredUser || [] });
    } catch (error) {
      toast.error(`Error loading users: ${error.message}`);
    } finally {
      set({ isUserLoading: false });
    }
  },

getMessages: async (userId) => {
  set({ isMessageLoading: true });
  try {
    const res = await axiosInstance.get(`/message/${userId}`);
    console.log("Fetched messages:", res.data);
    set({
      messages: Array.isArray(res.data.messages) ? res.data.messages : [],
    });
  } catch (error) {
    toast.error(`Error loading messages: ${error.message}`);
  } finally {
    set({ isMessageLoading: false });
  }
},

sendMessages: async (messageData) => {
  const { selectedUser, messages } = get();
  try {
    const res = await axiosInstance.post(
      `/message/send/${selectedUser._id}`,
      messageData
    );
    const sentMessage = res.data;

    // Optional: fallback for senderId
    if (!sentMessage.senderId) {
      sentMessage.senderId = JSON.parse(localStorage.getItem("authUser"))?._id;
    }

    set({ messages: [...messages, sentMessage] });
  } catch (error) {
    toast.error(`Error sending messages: ${error.message}`);
  }
},

  setSelectedUser: (selectedUser) => set({ selectedUser, messages: [] }),
}));
