<template>
  <header class="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50 transition-all duration-300 py-4">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
      <div class="flex flex-col md:flex-row text-2xl items-center md:pr-10 pr-0 md:mx-0 mx-auto">
      <NuxtLink to="/" class="mx-auto md:mx-0">
        <img
          src="https://utimachinery.com/images/logo.png"
          alt="UTI Machinery Logo"
          class="h-8 md:h-10 transition-all duration-300"
        />
      </NuxtLink>
     </div>
      <div class="flex flex-col md:flex-row md:text-xl text-lg items-center md:mx-0 mx-auto">
        <NuxtLink to="#allMachines" class="hover:text-primary-light" @click.prevent="customScrollTo('allMachines')">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded-lg transition-colors duration-200 ease-in-out my-2 my-4 md:my-0">
          Search Machines
          </button>
        </NuxtLink>
      </div>

      <div class="social flex flex-row md:mx-0 mx-auto items-center justify-between">
        <div class="flex flex-row mx-2">

           <a href="https://www.facebook.com/utimachinery/" class="icon">
          <span>
            <img src="http://www.utimachinery.com/images/facebook.png" alt="fb link icon" height="30">
          </span>
         </a>
        </div>   
        <div class="flex flex-row mx-2">
          <a href="https://www.youtube.com/user/UTImachinery" class="icon">
            <span>
              <img src="https://utimachinery.com/images/youtube.png" alt="youtube link icon" height="30">
            </span>
          </a>
        </div>   
        <div class="flex flex-row mx-2">
          <a href="tel:8775978300" class="hover:text-primary-light">(877) 597-8300</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const headerRef = ref(null);
const headerHeight = ref(0);
const route = useRoute();
const router = useRouter();

const customScrollTo = async (id) => {
  if (route.path.startsWith('/machines')) {
    await router.push(`/#${id}`);
  } else {
    scrollToElement(id);
  }
};

const scrollToElement = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offsetPosition = element.offsetTop - headerHeight.value;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

onMounted(() => {
  // Use nextTick to ensure the header is fully rendered before getting its height
  nextTick(() => {
    headerHeight.value = headerRef.value.$el.offsetHeight;
  });
});
</script>