import { defineStore } from "pinia";
import api from "@/api/index.js";

export const useClientStore = defineStore("client", () => {
  // --- State ---
  const account = ref({});
  const loading = ref(true);
  const loyalty_card = ref({})
  const error = ref(null);

  // --- Actions ---

  // (GET /clients/me/)
  const fetchAccount = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/clients/me/");
      account.value = data;
      loyalty_card.value = data?.loyalty_card
      return data;
    } catch (err) {
      error.value = err.message || "Account fetch failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  // (PUT /clients/:id/)
  const updateAccount = async (id, updateData) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.patch(`/clients/${id}/`, updateData);
      account.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Account update failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };


  return {
    // state
    account,
    loyalty_card,
    loading,
    error,
    // actions
    fetchAccount,
    updateAccount
  };
});