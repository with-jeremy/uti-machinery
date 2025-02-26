<!-- ~/layouts/default.vue -->
<template>
    <main class="bg-gray-200 flex flex-col min-h-screen">
        <Header ref="headerRef" />
        <!-- Use clearfix to ensure content is not overlapped by the header -->
        <div class="flex-grow" :style="{ marginTop: headerHeight + 'px' }">
            <slot />
        </div>
        <Footer />
    </main>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { ref, onMounted, nextTick } from 'vue';
const headerRef = ref(null);
const headerHeight = ref(0);

onMounted(() => {
  // Use nextTick to ensure the header is fully rendered before getting its height
  nextTick(() => {
    headerHeight.value = headerRef.value.$el.offsetHeight;
  });
});
</script>

<style scoped>
/* Minimal styling. Tailwind would override if you add that. */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
</style>
