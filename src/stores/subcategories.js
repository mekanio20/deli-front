import api from "@/api/index.js";

export const useSubcategoriesStore = defineStore("subcategories", () => {
  // --- State ---
  const subcategories = ref([]);
  const subcategory_info = ref({});
  const loading = ref(true);
  const error = ref(null);

  // --- Actions ---

  // 1. (GET /subcategories/)
  const fetchSubcategories = async (filteredOptions = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/subcategories/", { params: filteredOptions });
      subcategories.value = data.results;
    } catch (err) {
      error.value = err.message || "Subcategory not found";
    } finally {
      loading.value = false;
    }
  };

  // 2. (GET /subcategories/{id}/)
  const fetchSubcategoryDetails = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/subcategories/${id}/`);
      subcategory_info.value = data;
    } catch (err) {
      error.value = err.message || "Subcategory not found";
    } finally {
      loading.value = false;
    }
  };

  return {
    subcategories,
    subcategory_info,
    loading,
    error,
    fetchSubcategories,
    fetchSubcategoryDetails
  };
});
