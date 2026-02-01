import { useLikesStore } from "@/stores/likes";
import { useRoute } from "vue-router";

export function useFavorites(fetchProductDetail, product_info) {
    const likesStore = useLikesStore();
    const route = useRoute();
  
    const { createLike, deleteLike, fetchLikes } = likesStore;
  
    const toggleFavorite = async (id) => {
      try {
        if (!product_info.value.is_liked) {
          await createLike(id);
          return;
        } else {
          const likes = await fetchLikes({ product: id });
          if (likes?.length) {
            await deleteLike(likes[0].id);
          }
        }
      } catch (error) {
        console.error("toggleFavorite error:", error);
      } finally {
        fetchProductDetail(route.params.id);
      }
    };
  
    return { toggleFavorite };
  }