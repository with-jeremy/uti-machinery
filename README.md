# UTI Machinery Main Website (demo)

## Todos
- add social media icons and links
- convert data import to use xml or csv
- setup images to pull from /assets/images or /public/images
- demo process for updates through GitHub Desktop

<template>
  <header class="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50 transition-all duration-300 py-4">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between lg:px-48">
      <NuxtLink to="/" class="mx-auto md:mx-0">
        <img
          src="https://utimachinery.com/images/logo.png"
          alt="UTI Machinery Logo"
          class="h-8 md:h-10 transition-all duration-300"
        />
      </NuxtLink>
     
      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4 items-center md:mx-auto">
        <NuxtLink to="#allMachines" class="hover:text-primary-light">
         Search Machines
        </NuxtLink>
      </div>

      <div class="flex space-x-6">
        <a href="https://www.facebook.com/utimachinery/" class="icon">
          <span>
            <img src="http://www.utimachinery.com/images/facebook.png" alt="fb link icon" height="30">
          </span>
        </a>
        <a href="https://www.youtube.com/user/UTImachinery" class="icon">
          <span>
            <img src="https://utimachinery.com/images/youtube.png" alt="youtube link icon" height="30">
          </span>
        </a>
        <a href="tel:8775978300" class="hover:text-primary-light">(877) 597-8300</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isHomePage = route.path === '/';
</script>