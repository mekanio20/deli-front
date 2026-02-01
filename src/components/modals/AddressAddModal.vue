<template>
    <!-- Modal Overlay -->
    <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="show"
            class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center"
            @click="$emit('close')">
            <!-- Modal Container -->
            <Transition enter-active-class="transition-transform duration-300 ease-out"
                enter-from-class="translate-y-full sm:scale-95" enter-to-class="translate-y-0 sm:scale-100"
                leave-active-class="transition-transform duration-200 ease-in"
                leave-from-class="translate-y-0 sm:scale-100" leave-to-class="translate-y-full sm:scale-95">
                <div v-show="show"
                    class="bg-white w-[770px] max-h-[90vh] overflow-y-auto mx-4 px-8 py-4 rounded-[14px] flex flex-col relative"
                    @click.stop>
                    <!-- Header -->
                    <div class="flex items-center justify-center pt-4 pb-5">
                        <h2 class="text-[22px] text-center font-medium text-[#0C1A30]">
                            {{ isEdit ? $t('forms.update_address') : $t('forms.add_address') }}
                        </h2>
                        <button @click="$emit('close')"
                            class="absolute top-8 right-5 flex items-center justify-center bg-[#F6F7F9] rounded-full hover:bg-gray-100">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Content -->
                    <FormSection @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-2">
                        <!-- Region Selector -->
                        <FormGroup>
                            <FormTitle :id="'region'" :title="$t('forms.select_street')" />
                            <CustomSelect v-model="formData.region" :options="regions" :placeholder="$t('names.select')"
                                :isSearch="true" :searchPlaceholder="$t('names.search_with_street')"
                                :noResultsText="$t('names.no_results')" />
                        </FormGroup>

                        <!-- Street -->
                        <FormGroup>
                            <FormTitle :id="'street'" :title="$t('forms.street')" />
                            <FormInput v-model="formData.street" :label="'street'"
                                :icon="{ name: 'map_pin-icon', size: 14, color: '#DF3DFF' }" />
                        </FormGroup>

                        <!-- Building Number -->
                        <FormGroup>
                            <FormTitle :id="'building_number'" :title="$t('forms.buildingNumber')" />
                            <FormInput v-model="formData.building_number" :label="'building_number'"
                                :icon="{ name: 'home-icon', size: 14, color: '#FF3A44' }" />
                        </FormGroup>

                        <!-- House Number -->
                        <FormGroup>
                            <FormTitle :id="'house_number'" :title="$t('forms.houseNumber')" />
                            <FormInput v-model="formData.house_number" :label="'house_number'"
                                :icon="{ name: 'door-icon', size: 14 }" />
                        </FormGroup>

                        <!-- Floor -->
                        <FormGroup>
                            <FormTitle :id="'floor'" :title="$t('forms.floor')" />
                            <FormInput v-model="formData.floor" :label="'floor'"
                                :icon="{ name: 'home-icon', size: 14 }" />
                        </FormGroup>

                        <!-- Note -->
                        <FormGroup>
                            <FormTitle :id="'note'" :title="$t('forms.note')" />
                            <FormInput v-model="formData.note" :label="'note'" />
                        </FormGroup>

                        <!-- Is Primary -->
                        <FormGroup class="col-span-2">
                            <CustomCheckbox class="!-mx-4" v-model="formData.is_primary"
                                :text="$t('descriptions.address1')" />
                        </FormGroup>

                        <!-- Map -->
                        <FormGroup class="col-span-2">
                            <div id="map" ref="mapContainer" class="w-full h-[200px] rounded-2xl shadow-lg"></div>
                        </FormGroup>
                    </FormSection>

                    <!-- Footer Button -->
                    <div class="p-4 mx-auto sm:w-fit w-full">
                        <button @click="handleSubmit"
                            class="sm:w-[390px] w-full bg-[#FEB918] text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-500 transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                            {{ isEdit ? $t('buttons.update') : $t('buttons.add') }}
                        </button>
                    </div>
                </div>
            </Transition>

            <div class="fixed sm:top-4 top-0 sm:right-4 right-0 z-50 space-y-2">
                <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="removeToast(toast.id)" />
            </div>
        </div>
    </Transition>
</template>

<script setup>
const { toasts, removeToast } = useToast()
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const mapContainer = ref(null);
let mapInstance = null;
let markerInstance = null;

const regionsStore = useRegionsStore();
const { regions } = storeToRefs(regionsStore);
const { fetchRegions } = regionsStore;

const createDefaultForm = () => ({
    address: '',
    street: '',
    building_number: '',
    house_number: '',
    floor: '',
    region: '',
    note: '',
    longitude: '',
    latitude: '',
    is_primary: true
});

const formData = ref(createDefaultForm());
const selectedCoords = ref(null);

const props = defineProps({
    show: Boolean,
    editingAddress: Object
});

const emit = defineEmits(['close', 'submit']);

const isEdit = computed(() => !!props.editingAddress);

const handleSubmit = () => {
    emit('submit', formData.value);
};

const fetchAddress = async (lat, lng) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await res.json();

        formData.value = {
            ...formData.value,
            address: data.display_name || '',
            street: data.address.road || data.address.street || '',
            building_number: data.address.building || data.address.house_number || '',
            house_number: data.address.house_number || '',
            floor: data.address.floor || '',
            note: data.address.note || '',
            longitude: lng.toString(),
            latitude: lat.toString()
        };
    } catch (err) {
        console.error("Error fetching address:", err);
    }
};

const mergeFormDataValues = (data) => {
    return Object.values(data)
        .filter(val => val !== null && val !== undefined && val !== '')
        .join(' ');
};

const initializeMap = async () => {
    // Cleanup existing map
    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }
    if (markerInstance) {
        markerInstance.remove();
        markerInstance = null;
    }

    // Wait for DOM
    await nextTick();

    // Check if container exists
    const container = document.getElementById('map');
    if (!container) {
        console.error('Map container not found');
        return;
    }

    const center = [58.38, 37.95];

    // Create map
    mapInstance = new maplibregl.Map({
        container: "map",
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: center,
        zoom: 10,
    });

    // Handle edit mode with coordinates
    const trySetEditCoords = () => {
        const lng = Number(props?.editingAddress?.longitude);
        const lat = Number(props?.editingAddress?.latitude);

        if (!isNaN(lng) && !isNaN(lat) && lng !== 0 && lat !== 0) {
            markerInstance = new maplibregl.Marker({ color: "#037D84" })
                .setLngLat([lng, lat])
                .addTo(mapInstance);

            mapInstance.flyTo({ center: [lng, lat], zoom: 14 });
            selectedCoords.value = { lng, lat };
            return true;
        }
        return false;
    };

    // Set initial position
    if (isEdit.value && trySetEditCoords()) {
        // Edit mode with valid coords - done
    } else if (navigator.geolocation) {
        // Try to get user location
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lng = pos.coords.longitude;
                const lat = pos.coords.latitude;

                markerInstance = new maplibregl.Marker({ color: "#037D84" })
                    .setLngLat([lng, lat])
                    .addTo(mapInstance);

                mapInstance.flyTo({ center: [lng, lat], zoom: 14 });
                selectedCoords.value = { lng, lat };

                if (!isEdit.value) {
                    await fetchAddress(lat, lng);
                }
            },
            (error) => {
                console.warn('Geolocation error:', error);
            }
        );
    }

    // Map click handler
    mapInstance.on("click", async (e) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;

        if (markerInstance) {
            markerInstance.remove();
        }

        markerInstance = new maplibregl.Marker({ color: "#037D84" })
            .setLngLat([lng, lat])
            .addTo(mapInstance);

        selectedCoords.value = { lng, lat };
        await fetchAddress(lat, lng);
    });

    // Force resize after map loads
    mapInstance.on('load', () => {
        setTimeout(() => {
            mapInstance.resize();
        }, 100);
    });
};

const loadFormData = () => {
    if (isEdit.value) {
        const a = props.editingAddress || {};
        formData.value = {
            ...createDefaultForm(),
            address: a.address || '',
            street: a.street || '',
            building_number: a.building_number || '',
            house_number: a.house_number || '',
            floor: a.floor || '',
            region: a.region || '',
            note: a.note || '',
            longitude: a.longitude || '',
            latitude: a.latitude || '',
            is_primary: a.is_primary !== undefined ? a.is_primary : true
        };
    } else {
        formData.value = createDefaultForm();
    }
};

// Watch for modal open/close
watch(() => props.show, async (isShowing) => {
    if (isShowing) {
        loadFormData();
        await nextTick();
        await initializeMap();
    } else {
        // Cleanup when modal closes
        if (mapInstance) {
            mapInstance.remove();
            mapInstance = null;
        }
        if (markerInstance) {
            markerInstance.remove();
            markerInstance = null;
        }
    }
}, { immediate: false });

// Initial load
onMounted(async () => {
    await fetchRegions();
});

// Cleanup on unmount
onUnmounted(() => {
    if (mapInstance) {
        mapInstance.remove();
    }
    if (markerInstance) {
        markerInstance.remove();
    }
});
</script>

<style scoped>
#map {
    position: relative;
    min-height: 200px;
    width: 100%;
}

/* Ensure map renders properly */
:deep(.maplibregl-canvas) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>