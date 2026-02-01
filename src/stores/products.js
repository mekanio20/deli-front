import api from "@/api/index.js";

export const useProductsStore = defineStore("products", () => {
  // --- State ---
  const products = ref([]);
  const product_info = ref({});
  const productsCount = ref(0);
  const loading = ref(false);
  const loadingMore = ref(false);
  const hasNextPage = ref(false);
  const currentPage = ref(1);
  const error = ref(null);

  // --- Actions ---

  // 1. (GET /catalog/client/)
  const fetchProducts = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    currentPage.value = 1;
    try {
      const { data } = await api.get("/catalog/client/", {
        params: { ...queryParams, is_available: true, page: 1 },
      });
      productsCount.value = data.count;
      products.value = data.results;
      hasNextPage.value = !!data.next;
      return data.results;
    } catch (err) {
      error.value = err.message || "Product not found";
    } finally {
      loading.value = false;
    }
  };

  // 2. (GET /catalog/client/) Load more products for pagination
  const loadMoreProducts = async (queryParams = {}) => {
    if (loadingMore.value || !hasNextPage.value) return;

    loadingMore.value = true;
    error.value = null;
    try {
      const nextPage = currentPage.value + 1;
      const { data } = await api.get("/catalog/client/", {
        params: {
          ...queryParams,
          is_available: true,
          page: nextPage,
          page_size: 20,
        },
      });

      products.value = [...products.value, ...data.results];
      hasNextPage.value = !!data.next;
      currentPage.value = nextPage;
      return data.results;
    } catch (err) {
      error.value = err.message || "Failed to load more products";
    } finally {
      loadingMore.value = false;
    }
  };
  
  // 4. (GET /catalog/client/:id/)
  const fetchProductDetail = async (id) => {
    try {
      const { data } = await api.get(`/catalog/client/${id}/`);
      product_info.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Product not found";
      throw err;
    }
  };

  // 5. (GET /catalog/client/available_cities/)
  const fetchAvailableCities = async () => {
    try {
      const { data } = await api.get("/catalog/client/available_cities/");
      return data.cities;
    } catch (err) {
      error.value = err.message || "Product not found";
      throw err;
    }
  };

  return {
    products,
    product_info,
    productsCount,
    loading,
    loadingMore,
    hasNextPage,
    currentPage,
    error,
    fetchProducts,
    loadMoreProducts,
    fetchProductDetail,
    fetchAvailableCities,
  };
});
