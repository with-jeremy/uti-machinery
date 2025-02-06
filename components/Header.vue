<template>
  <header
    class="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50 transition-all duration-300"
    :class="{ 'py-2': isShrunk, 'py-4': !isShrunk }"
    @scroll="handleScroll"
  >
    <div class="container mx-auto flex items-center justify-between px-4">
      <!-- Logo Section -->
      <div class="logo_container">
        <NuxtLink to="/">
          <img
            src="https://utimachinery.com/wp-content/uploads/2017/06/Logo-1.png"
            alt="UTI Machinery Logo"
            class="h-8 md:h-10 transition-all duration-300"
            :class="{ 'h-6': isShrunk, 'h-8': !isShrunk }"
          />
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="hidden md:flex space-x-6">
        <NuxtLink to="/" class="hover:text-primary-light">Home</NuxtLink>
        <NuxtLink to="/machines" class="hover:text-primary-light">All Machines</NuxtLink>
        <NuxtLink to="tel:8775978300" class="hover:text-primary-light">(877) 597-8300</NuxtLink>
      </nav>

      <!-- Mobile Navigation -->
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-white focus:outline-none">
          <i class="i-heroicons-menu h-6 w-6"></i>
        </button>
      </div>

      <div
        v-if="showMobileMenu"
        class="fixed inset-0 bg-black bg-opacity-75 z-40 flex flex-col items-center justify-center space-y-6 md:hidden"
      >
        <button @click="toggleMobileMenu" class="absolute top-4 right-4 text-white">
          <i class="i-heroicons-x h-6 w-6"></i>
        </button>
        <NuxtLink to="/" @click="toggleMobileMenu">Home</NuxtLink>
        <NuxtLink to="/machines" @click="toggleMobileMenu">Inventory</NuxtLink>
        <NuxtLink to="tel:8775978300" @click="toggleMobileMenu">(877) 597-8300</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isShrunk = ref(false);
const showMobileMenu = ref(false);

const handleScroll = () => {
  isShrunk.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

if (process.client) {
  window.addEventListener('scroll', handleScroll);
}
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
}
.bg-primary-light {
  color: #1e90ff;
}
</style>
