import { ref, reactive, readonly } from "vue";
import i18n from "@/i18n/index";

const toasts = ref([]);
let toastId = 0;

export const useToast = () => {
  const addToast = (toast) => {
    const id = ++toastId;
    const newToast = reactive({
      id,
      type: "info", // success, error, warning, info
      title: "",
      message: "",
      duration: 5000, // milliseconds
      autoClose: true,
      visible: true,
      ...toast,
    });

    toasts.value.push(newToast);

    // Auto remove toast after duration
    if (newToast.autoClose) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clearAllToasts = () => {
    toasts.value = [];
  };

  // Convenience methods for different toast types
  const success = (message, options = {}) => {
    return addToast({
      type: "success",
      title: i18n.global.t("success.name"),
      message,
      ...options,
    });
  };

  const error = (message, options = {}) => {
    return addToast({
      type: "error",
      title: i18n.global.t("errors.name"),
      message,
      duration: 7000, // Error toasts stay longer
      ...options,
    });
  };

  const warning = (message, options = {}) => {
    return addToast({
      type: "warning",
      title: i18n.global.t("warning.name"),
      message,
      ...options,
    });
  };

  // const info = (message, options = {}) => {
  //   return addToast({
  //     type: 'info',
  //     title: i18n.global.t('info.name'),
  //     message,
  //     ...options
  //   })
  // }

  // API response handler
  const handleApiResponse = (
    response,
    successMessage = "Proccess successful",
    errorMessage = "Proccess failed"
  ) => {
    if (response && response.status >= 200 && response.status < 300) {
      success(successMessage, response.data?.message || "");
      return true;
    } else {
      error(errorMessage, response?.data?.message || response?.message || "");
      return false;
    }
  };

  // Handle API errors
  const handleApiError = (err, customMessage = "Error occurred") => {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message || err?.toString() ||
      customMessage;
    error(message);
  };

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    // info,
    handleApiResponse,
    handleApiError,
  };
};
