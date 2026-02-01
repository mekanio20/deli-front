export default () => {
  const icons = ref({});
  const loading = ref(true);

  async function loadIcons() {
    loading.value = true;
    const iconModules = import.meta.glob("@/components/icons/*-icon.vue");
    const loadedIcons = {};

    for (const path in iconModules) {
      const module = await iconModules[path]();
      const componentName = path.split("/").pop().replace(".vue", "");
      loadedIcons[componentName] = module.default;
    }

    icons.value = markRaw(loadedIcons);
    loading.value = false;
  }

  return {
    icons,
    loadIcons,
    loading
  };
}