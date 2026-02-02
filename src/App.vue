<template>
  <component :is="layout"></component>

  <!-- Toast Container -->
  <div class="fixed sm:top-4 top-0 sm:right-4 right-0 z-50 space-y-2">
    <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="removeToast(toast.id)" />
  </div>

  <!-- Auth Modals -->
  <RegisterModal :modelValue="appStore.activeModal === 'register'" @close="appStore.toggleModal('register')"
    @redirect="redirectModal" />
  <LoginModal :modelValue="appStore.activeModal === 'login'" @close="appStore.toggleModal('login')"
    @redirect="redirectModal" />
  <OtpModal :modelValue="appStore.activeModal === 'otp'" @close="appStore.toggleModal('otp')"
    @redirect="redirectModal" />
  <ResetPasswordModal :modelValue="appStore.activeModal === 'password'" @close="appStore.toggleModal('password')"
    @redirect="redirectModal" />

</template>

<script setup>
import baseLayout from '@/layouts/baseLayout.vue';
import blankLayout from '@/layouts/blankLayout.vue';
const route = useRoute()

const { toasts, removeToast } = useToast()
const appStore = useAppStore()

const layouts = {
  'base-layout': baseLayout,
  'blank-layout': blankLayout,
}
const layout = computed(() => { return layouts[route.meta.layout] || layouts['base-layout'] })

const redirectModal = (modal) => appStore.toggleModal(modal)
</script>