import api from "@/api/index.js";

export const useBannerStore = defineStore("banner", () => {
  // --- State ---
  const banners = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const bgColors = ["#10E593", "#57DFEE", "#FF5F4C", "#FFC6C0"];

  // --- Actions ---
  const fetchBanners = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/banners/active_banners/", { params: queryParams });
      banners.value = await data.map((cat, index) => {
        const colorIndex = index % 4;
        return {
          ...cat,
          bg_color: bgColors[colorIndex],
        };
      });
      return data
    } catch (err) {
      error.value = err.message || "Banners fetch failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { banners, loading, error, fetchBanners };
});