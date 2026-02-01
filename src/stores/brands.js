import api from "@/api/index.js";

export const useBrandsStore = defineStore("brands", () => {
  // --- State ---
  const brands = ref([]);
  const brand_info = ref({});
  const loading = ref(true);
  const error = ref(null);

  // --- Actions ---

  // (GET /brands/)
  const fetchBrands = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/brands/", { params: queryParams });
      brands.value = data.results;
    } catch (err) {
      error.value = err.message || "Brands fetch failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (GET /brands/:id)
  const fetchBrand = async (id) => {
    error.value = null;
    try {
      const { data } = await api.get(`/brands/${id}`);
      brand_info.value = data;
    } catch (err) {
      error.value = err.message || "Brand not found";
      throw err;
    }
  };
  return {
    // state
    brands,
    brand_info,
    loading,
    error,
    // actions
    fetchBrands,
    fetchBrand,
  };
});


