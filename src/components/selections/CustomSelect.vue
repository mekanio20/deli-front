<template>
  <div class="relative">
    <!-- Select Trigger -->
    <button type="button" @click="toggleDropdown" :disabled="disabled"
      class="w-full sm:text-base text-sm px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 flex items-center justify-between"
      :class="{
      'cursor-not-allowed opacity-50': disabled,
      'ring-1 ring-[#FEB918] bg-white': isOpen,
      'h-[55px]': !selectedOption
    }">
      <div class="flex items-center space-x-3">
        <!-- Icon -->
        <component v-if="icon" :is="icons[icon?.name]" :size="icon.size" :color="icon.color" />

        <!-- Selected Value or Placeholder -->
        <span class="text-left" :class="{
      'text-[#0C1A30]': selectedOption,
      'text-[#A3A4A3]': !selectedOption
    }">
          {{ selectedOption ? getDisplayValue(selectedOption) : placeholder }}
        </span>
      </div>

      <!-- Dropdown Arrow -->
      <chevron_right-icon :size="12" color="#949494" class="transition-transform duration-200 rotate-90"
        :class="{ '-rotate-90': isOpen }" />
    </button>

    <!-- Dropdown Options -->
    <Transition enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 transform scale-95 -translate-y-2"
      enter-to-class="opacity-100 transform scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 transform scale-100 translate-y-0"
      leave-to-class="opacity-0 transform scale-95 -translate-y-2">
      <div v-if="isOpen"
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-[#F0F1F3] rounded-[10px] shadow-lg z-50 max-h-60 overflow-auto no-scrollbar">
        <!-- Search Input (if isSearch) -->
        <div v-if="isSearch" class="p-3 border-b border-[#F0F1F3]">
          <div class="relative">
            <search-icon :size="16" color="#949494" class="absolute left-3 top-1/2 -translate-y-1/2" />
            <input v-model="searchQuery" type="text" :placeholder="searchPlaceholder"
              class="w-full pl-10 pr-4 py-2 text-sm bg-[#F6F7F9] border-0 rounded-[6px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200"
              @click.stop @input="emit('search', searchQuery)" />
          </div>
        </div>

        <!-- Options List -->
        <div class="py-2">
          <!-- No Results -->
          <div v-if="filteredOptions.length === 0" class="px-4 py-3 text-center text-[#A3A4A3] text-sm">
            {{ noResultsText }}
          </div>

          <!-- Options -->
          <button v-for="option in filteredOptions" :key="getOptionValue(option)" @click="selectOption(option)"
            class="w-full px-4 py-3 text-left hover:bg-[#F6F7F9] transition-colors duration-200 flex items-center space-x-3"
            :class="{
      'bg-[#F6F7F9] text-[#037D84]': isSelected(option),
      'text-[#0C1A30]': !isSelected(option)
    }">
            <!-- Option Icon -->
            <component v-if="option.icon" :is="icons[option.icon.name]" :size="option.icon.size || 16"
              :color="option.icon.color || '#949494'" />

            <!-- Option Text -->
            <span class="flex-1">{{ getDisplayValue(option) }}</span>

            <!-- Selected Indicator -->
            <check-icon v-if="isSelected(option)" :size="16" color="#037D84" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="closeDropdown" />
  </div>
</template>

<script setup>
const { icons, loadIcons } = useIcons()

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: null
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isSearch: {
    type: Boolean,
    default: false
  },
  searchPlaceholder: {
    type: String
  },
  noResultsText: {
    type: String
  },
  icon: {
    type: Object,
    default: null
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  labelKey: {
    type: String,
    default: 'name'
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change', 'open', 'close', 'search'])

// Reactive data
const isOpen = ref(false)
const searchQuery = ref('')

// Computed
const selectedOption = computed(() => {
  if (!props.modelValue) return null
  return props.options.find(option => getOptionValue(option) === props.modelValue)
})

const filteredOptions = computed(() => {
  if (!props.isSearch || !searchQuery.value) {
    return props.options
  }
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option => {
    const displayValue = getDisplayValue(option).toLowerCase()
    return displayValue.includes(query)
  })
})

// Methods
const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
    emit('open')
  } else {
    emit('close')
  }
}

const closeDropdown = () => {
  isOpen.value = false
  searchQuery.value = ''
  emit('close')
}

const selectOption = (option) => {
  const value = getOptionValue(option)
  emit('update:modelValue', value)
  emit('change', option)
  closeDropdown()
}

const getOptionValue = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option
  }
  return option[props.valueKey] || option.id || option.value
}

const getDisplayValue = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option
  }
  return option[props.labelKey] || option.name
}

const isSelected = (option) => {
  return getOptionValue(option) === props.modelValue
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeDropdown()
  }
}

// Close dropdown on escape key
onMounted(() => {
  loadIcons()
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>
