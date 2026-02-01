import { defineStore } from "pinia";
import api from "@/api/index.js";

export const useContactStore = defineStore("contact", () => {
  // --- State ---
  const loading = ref(false);
  const error = ref(null);

  // --- Actions ---

  // 1) Post contact (POST /contact_us/)
  const createContact = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/contact_us/", payload);
      return data;
    } catch (err) {
      error.value = err.message || "Message could not be sent";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 2) GET contact (GET /contact_us/)
  const fetchContact = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/faq/contact-info/");
      return data;
    } catch (err) {
      error.value = err.message || "Message could not be sent";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // State
    loading,
    error,
    // Actions
    createContact,
    fetchContact
  };
});
