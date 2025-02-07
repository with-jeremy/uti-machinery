<!-- ~/layouts/default.vue -->
<template>
    <main>
        <Header />
        <!-- Add pt-24 to account for fixed header height plus some breathing room -->
        <div class="pt-20 bg-gray-200">
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
</style>
