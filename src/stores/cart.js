import { defineStore } from "pinia";
import { useToast } from "@/composables/useToast.js";
import { useAuthStore } from "./auth"
import api from "@/api/index.js";
import i18n from '@/i18n/index'

export const useCartStore = defineStore("cart", () => {
  // --- State ---
  const cartInfo = ref({});
  const cartItems = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const giftCard = ref(null);
  const loyaltyCard = ref(null);
  const subtotal = ref(0);
  const total = ref(0);
  const currentLoyalty = ref({});
  const key = ref(localStorage.getItem("session_key"));

  // Toast composable
  const { success, handleApiError } = useToast();

  const buildOrdersQuery = (url) => {
    return key?.value ? `${url}?session_key=${key.value}` : `${url}`;
  };

  const setTotal = (price) => {
    total.value = Number(subtotal.value) + Number(price);
  }

  // --- Actions ---

  // 1) Get cart (GET /cart/)
  const fetchCart = async () => {
    loading.value = true;
    error.value = null;
    try {
      isSessionKeyValid(key.value);
      const url = buildOrdersQuery('/cart/');
      const response = await api.get(url);
      isSessionKeyValid(response.data.session_key);
      cartInfo.value = response.data;
      cartItems.value = response.data.items || [];
      subtotal.value = response.data.subtotal_amount || 0;
      total.value = response.data.total_amount || 0;
      giftCard.value = response.data.gift_card_amount_used || null;
      loyaltyCard.value = response.data.loyalty_card_info || null;

      return response.data;
    } catch (err) {
      error.value = err.message || "Failed to fetch cart";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 2) Add item to cart (POST /cart/add_item/)
  const addItem = async (productId, quantity = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const url = buildOrdersQuery('/cart/add_item/');
      const { data } = await api.post(
        url,
        {
          product_id: productId,
          city: localStorage.getItem("city"),
          quantity: quantity,
        }
      );
      await fetchCart(); // Refresh cart data
      success(i18n.global.t('success.product_add'))
      return data;
    } catch (err) {
      error.value = err.message || "Failed to add item to cart";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 3) Remove item from cart (DELETE /cart/{id}/remove_item/)
  const removeItem = async (itemId) => {
    loading.value = true;
    error.value = null;
    try {
      const url = buildOrdersQuery(`/cart/${itemId}/remove_item/`);
      await api.delete(url);
      await fetchCart(); // Refresh cart data
      success(i18n.global.t('success.product_remove'));
      return true;
    } catch (err) {
      error.value = err.message || "Failed to remove item from cart";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 4) Update item quantity (PATCH /cart/{id}/update_item/)
  const updateItemQuantity = async (itemId, quantity) => {
    loading.value = true;
    error.value = null;
    try {
      const url = buildOrdersQuery(`/cart/${itemId}/update_item/`);
      const { data } = await api.patch(
       url,
        {
          quantity: quantity,
        }
      );
      await fetchCart(); // Refresh cart data
      return data;
    } catch (err) {
      error.value = err.message || "Failed to update item quantity";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // /cards/loyalty-cards/
  const fetchLoyaltyCards = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/cards/loyalty-cards/");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch loyalty cards";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 5) Apply gift card (POST /cart/apply_gift_card/)
  const applyGiftCard = async (giftCardNumber) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/cart/apply_gift_card/", {
        gift_card_number: giftCardNumber,
      });
      await fetchCart(); // Refresh cart data
      success(i18n.global.t('success.add_gift'));
      return data;
    } catch (err) {
      error.value = err.message || "Failed to apply gift card";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 6) Apply loyalty card (POST /cart/apply_loyalty_card/)
  const applyLoyaltyCard = async (loyaltyCardId, action) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/cart/apply_loyalty_card/", {
        loyalty_card_id: loyaltyCardId,
        action: action,
      });
      loyaltyCard.value = data;
      await fetchCart(); // Refresh cart data
      success(i18n.global.t('success.add_loyalty'));
      return data;
    } catch (err) {
      error.value = err.message || "Failed to apply loyalty card";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 7) Checkout (POST /cart/checkout/)
  const checkout = async (checkoutData) => {
    loading.value = true;
    error.value = null;
    try {
      const url = buildOrdersQuery('/cart/checkout/');
      const { data } = await api.post(
        url,
        checkoutData
      );
      await fetchCart(); // Refresh cart data
      success(i18n.global.t('success.order'));
      return data;
    } catch (err) {
      error.value = err.message || "Failed to checkout";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 8) Clear cart (DELETE /cart/clear/)
  const clearCart = async () => {
    loading.value = true;
    error.value = null;
    try {
      const url = buildOrdersQuery('/cart/clear/');
      await api.delete(url);
      cartItems.value = [];
      subtotal.value = 0;
      total.value = 0;
      giftCard.value = null;
      loyaltyCard.value = null;
      success(i18n.global.t('success.cart_clear'));
      return true;
    } catch (err) {
      error.value = err.message || "Failed to clear cart";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 9) Remove gift card (DELETE /cart/remove-gift-card/)
  const removeGiftCard = async () => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete("/cart/remove-gift-card/");
      await fetchCart(); // Refresh cart data
      success(i18n.global.t('success.gift_remove'));
      return true;
    } catch (err) {
      error.value = err.message || "Failed to remove gift card";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 10) Remove loyalty card (DELETE /cart/remove-loyalty-card/)
  const removeLoyaltyCard = async () => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete("/cart/remove-loyalty-card/");
      await fetchCart(); // Refresh cart data
      success(i18n.global.t('success.loyalty_remove'));
      return true;
    } catch (err) {
      error.value = err.message || "Failed to remove loyalty card";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 11) Loyalty detail card (GET /loyalty/{id}/)
  const fetchLoyaltyDetail = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/cards/customer-cards/${id}/`);
      currentLoyalty.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch loyalty detail";
      handleApiError();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Helper methods
  const increaseQuantity = async (itemId) => {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      await updateItemQuantity(itemId, item.quantity + 1);
    }
  };

  const decreaseQuantity = async (itemId) => {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      await updateItemQuantity(itemId, item.quantity - 1);
    }
  };

  const isSessionKeyValid = (session_key) => {
    const auth = useAuthStore()
    if (session_key !== key.value && !auth.isAuthenticated) {
      localStorage.setItem("session_key", session_key);
      key.value = session_key;
    }
  };

  const removeSessionKey = () => {
    localStorage.removeItem("session_key");
    key.value = null;
  };

  const isInCart = (productId) => {
    return cartItems.value.some((item) => item.product === productId);
  };

  const getCartItem = (productId) => {
    return cartItems.value.find((item) => item.product === productId);
  };

  return {
    // State
    key,
    cartInfo,
    cartItems,
    loading,
    error,
    giftCard,
    loyaltyCard,
    currentLoyalty,
    subtotal,
    total,
    // Getters
    setTotal,
    // Actions
    fetchCart,
    addItem,
    removeItem,
    updateItemQuantity,
    applyGiftCard,
    applyLoyaltyCard,
    checkout,
    clearCart,
    removeGiftCard,
    removeLoyaltyCard,
    fetchLoyaltyCards,
    fetchLoyaltyDetail,
    // Helpers
    increaseQuantity,
    decreaseQuantity,
    isInCart,
    getCartItem,
    removeSessionKey
  };
});
