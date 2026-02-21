import api from "@/api/index.js";

export const useClientAddressesStore = defineStore("client_addresses", () => {
  // --- State ---
  const addresses = ref([]);
  const address_info = ref({});
  const addressesCount = ref(0);
  const loading = ref(true);
  const error = ref(null);

  // --- Actions ---

  // (GET /client_addresses/)
  const fetchAddresses = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/client_addresses/", { params: queryParams });
      addressesCount.value = data?.count ?? 0;
      addresses.value = data?.results ?? data ?? [];
      return addresses.value;
    } catch (err) {
      error.value = err.message || "Addresses fetch failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (GET /client_addresses/:id/)
  const fetchAddress = async (id) => {
    error.value = null;
    try {
      const { data } = await api.get(`/client_addresses/${id}/`);
      address_info.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Address not found";
      throw err;
    }
  };

  // (POST /client_addresses/)
  const createAddress = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/client_addresses/", payload);
      if (data.is_primary) {
        address_info.value = data;
        const isPrimaryAddress = addresses.value.find((a) => a.is_primary);
        if (isPrimaryAddress) isPrimaryAddress.is_primary = false
      }
      addresses.value.push(data);
      return data;
    } catch (err) {
      error.value = err.message || "Address create failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (PATCH /client_addresses/:id/)
  const updateAddress = async (id, updateData) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.patch(`/client_addresses/${id}/`, updateData);
      address_info.value = data;
      // Sync in list if present
      const idx = Array.isArray(addresses.value)
        ? addresses.value.findIndex((a) => a.id === id)
        : -1;
      if (idx > -1) {
        addresses.value.splice(idx, 1, data);
      }
      return data;
    } catch (err) {
      error.value = err.message || "Address update failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (DELETE /client_addresses/:id/)
  const deleteAddress = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/client_addresses/${id}/`);
      // Remove from list if present
      const idx = Array.isArray(addresses.value)
        ? addresses.value.findIndex((a) => a.id === id)
        : -1;
      if (idx > -1) {
        addresses.value.splice(idx, 1);
        addressesCount.value = Math.max(0, (addressesCount.value || 1) - 1);
      }
      // If currently viewing this address, clear it
      if (address_info.value?.id === id) {
        address_info.value = {};
      }
      return true;
    } catch (err) {
      error.value = err.message || "Address delete failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // state
    addresses,
    address_info,
    addressesCount,
    loading,
    error,
    // actions
    fetchAddresses,
    fetchAddress,
    createAddress,
    updateAddress,
    deleteAddress,
  };
});
