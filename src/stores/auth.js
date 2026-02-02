import { defineStore } from "pinia";
import router from '@/router/index';
import api from "@/api/index";
import { useToast } from "@/composables/useToast";
import {
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "@/composables/useTokens";

const { handleApiError } = useToast();

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
        const response = await api.post("auth/client/login/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        this.access_token = response.data.access
        this.refresh_token = response.data.refresh
        return response
      } catch (error) {
        console.log('POST Login: ', error);
        handleApiError(error.response.data.message || error.response.data.detail);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async register(data) {
      this.loading = true;
      try {
        const response = await api.post("auth/client/register/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        return response
      } catch (error) {
        console.log('POST Register: ', error);
        handleApiError(error.response.data.message || error.response.data.detail);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async resetPassword(data) {
      this.loading = true;
      try {
        const response = await api.post("auth/client/reset-password/", data);
        setAccessToken(response.data.data.access);
        setRefreshToken(response.data.data.refresh);
        return response
      } catch (error) {
        console.log('POST Reset Password: ', error);
        handleApiError(error.response.data.message || error.response.data.detail);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async sendOtp(data) {
      this.loading = true;
      try {
        const otp = await api.post("auth/client/otp/", data);
        return otp
      } catch (error) {
        handleApiError(error.response.data.message || error.response.data.detail);
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