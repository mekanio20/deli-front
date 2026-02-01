import { defineStore } from "pinia";
import router from '@/router/index';
import api from "@/api/index";
import {
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "@/composables/useTokens";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    access_token: localStorage.getItem("deli_access"),
    refresh_token: localStorage.getItem("deli_refresh"),
    error: null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.access_token,
  },
  actions: {
    // SET
    setError(message) {
      this.error = message;
    },
    clearError() {
      this.error = "";
    },
    // API
    async login(data) {
      this.loading = true;
      try {
        const response = await api.post("token/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        this.access_token = response.data.access
        this.refresh_token = response.data.refresh
        return response
      } catch (error) {
        console.log('POST Login: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async register(data) {
      this.loading = true;
      try {
        const response = await api.post("register/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        return response
      } catch (error) {
        console.log('POST Register: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async sendOtp(data) {
      this.loading = true;
      try {
        const otp = await api.post("otp/", data);
        return otp
      } catch (error) {
        console.log('Send OTP: ', error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      clearTokens();
      this.access_token = null;
      this.refresh_token = null;
      router.push({ name: "Home" });
    },
  },
});