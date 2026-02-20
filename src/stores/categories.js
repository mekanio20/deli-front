import api from "@/api/index.js";

export const useCategoriesStore = defineStore("categories", () => {
  // --- State ---
  const categories = ref([]);
  const category_info = ref({});
  const loading = ref(true);
  const error = ref(null);

  // --- Actions ---

  // 1. (GET /categories)
  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/categories/with_children/");
      categories.value = data
      return data
    } catch (err) {
      error.value = err.message || "Category not found";
    } finally {
      loading.value = false;
    }
  };

  // 2. (GET /categories/{id}/)
  const fetchCategoryDetails = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/categories/${id}/`);
      category_info.value = data;
    } catch (err) {
      error.value = err.message || "Category not found";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 3. (GET /catalog/client/?category={id})
  const fetchCategoryProducts = async (categoryId) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/catalog/client/", {
        params: { category: categoryId, is_available: true }
      });
      return data.results;
    } catch (err) {
      error.value = err.message || "Category products not found";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    category_info,
    loading,
    error,
    fetchCategories,
    fetchCategoryDetails,
    fetchCategoryProducts
  };
});
