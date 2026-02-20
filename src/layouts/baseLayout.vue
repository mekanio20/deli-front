<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <Navbar />
        <MenuBar @hovered="(e) => hoveredItem = e" />
        <div class="flex-1" :class="{'blur-sm bg-black/50' : hoveredItem}">
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>

<script setup>
const hoveredItem = ref(false)
</script>