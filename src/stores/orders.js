import api from "@/api/index.js";

export const useOrdersStore = defineStore("orders", () => {
  // --- State ---
  const orders = ref([]);
  const order_info = ref({});
  const ordersCount = ref(0);
  const isOrderExists = ref(false);
  const loading = ref(true);
  const error = ref(null);

  // --- Actions ---

  // (GET /orders/)
  const fetchOrders = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const url = '/orders/';
      const { data } = await api.get(url, { params: queryParams });
      ordersCount.value = data?.count ?? 0;
      isOrderExists.value = ordersCount.value > 0;
      orders.value = data?.results ?? data ?? [];
      return orders.value;
    } catch (err) {
      error.value = err.message || "Orders fetch failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (GET /receipt/:id/)
  const fetchReceipt = async (id) => {
    error.value = null;
    try {
      const url = `/receipt/${id}/`
      const { data } = await api.get(url);
      return data;
    } catch (err) {
      error.value = err.message || "Receipt not found";
      throw err;
    }
  };

  // (GET /orders/:id/)
  const fetchOrder = async (id) => {
    error.value = null;
    try {
      const url = `/orders/${id}/`
      const { data } = await api.get(url);
      order_info.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Order not found";
      throw err;
    }
  };

  // (POST /orders/)
  const createOrder = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/orders/", payload);
      order_info.value = data;
      // Optimistically add to list if list exists
      orders.value = Array.isArray(orders.value) ? [data, ...orders.value] : [data];
      ordersCount.value = (ordersCount.value || 0) + 1;
      return data;
    } catch (err) {
      error.value = err.message || "Order create failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (PATCH /orders/:id/)
  const updateOrder = async (id, updateData) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.patch(`/orders/${id}/`, updateData);
      order_info.value = data;
      // Sync in list if present
      const idx = Array.isArray(orders.value)
        ? orders.value.findIndex((o) => o.id === id)
        : -1;
      if (idx > -1) {
        orders.value.splice(idx, 1, data);
      }
      return data;
    } catch (err) {
      error.value = err.message || "Order update failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // POST /orders/:id/cancel)
  const cancelOrder = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const url = `/orders/${id}/cancel/`;
      const { data } = await api.post(url);
      return data;
    } catch (err) {
      error.value = err.message || "Order cancel failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (DELETE /orders/:id/)
  const deleteOrder = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/orders/${id}/`);
      // Remove from list if present
      const idx = Array.isArray(orders.value)
        ? orders.value.findIndex((o) => o.id === id)
        : -1;
      if (idx > -1) {
        orders.value.splice(idx, 1);
        ordersCount.value = Math.max(0, (ordersCount.value || 1) - 1);
      }
      // If currently viewing this order, clear it
      if (order_info.value?.id === id) {
        order_info.value = {};
      }
      return true;
    } catch (err) {
      error.value = err.message || "Order delete failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // state
    orders,
    order_info,
    ordersCount,
    isOrderExists,
    loading,
    error,
    // actions
    fetchOrders,
    fetchReceipt,
    fetchOrder,
    createOrder,
    updateOrder,
    cancelOrder,
    deleteOrder,
  };
});


