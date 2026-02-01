import { defineStore } from "pinia";
import api from "@/api/index.js";

export const useFaqStore = defineStore("faqs", () => {
  // --- State ---
  const faqs = ref([]);
  const loading = ref(true);
  const error = ref(null);

  // --- Actions ---

  // 1) List faqs (GET /faq/questions/)
  const fethcFaqs = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/faq/questions/");
      faqs.value = data.results;
      return data.results;
    } catch (err) {
      error.value = err.message || "Failed to fetch likes";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // State
    faqs,
    loading,
    error,
    // Actions
    fethcFaqs,
  };
});
