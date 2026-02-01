import { defineStore } from "pinia";
import api from "@/api/index";

export const useAppStore = defineStore("app", {
  state: () => ({
    cities: [],
    activeModal: "", // 'login' | 'register' | 'reset' | 'password' | 'otp'
    loading: false,
    error: null
  }),
  actions: {
    toggleModal(modal) {
      this.activeModal = this.activeModal === modal ? null : modal;
    },
    closeModal() {
      this.activeModal = null;
    },

    // --- Actions ---
    async fetchCities() {
      this.loading = true;
      try {
        const { data } = await api.get("/cities/");
        this.cities = data;
        return data
      } catch (err) {
        throw err;
      } finally {
        this.loading = false;
      }
    }
  },
});