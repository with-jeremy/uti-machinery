<!-- ~/layouts/default.vue -->
<template>
    <main class="bg-gray-200">
        <Header />
        <!-- Use clearfix to ensure content is not overlapped by the header -->
        <div class="pt-32 md:pt-24">
            <slot />
        </div>
        <Footer />
    </main>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
/* Minimal styling. Tailwind would override if you add that. */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
</style>
