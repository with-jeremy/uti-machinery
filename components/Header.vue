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
        <NuxtLink to="#allMachines" class="hover:text-primary-light" @click.prevent="customScrollTo('allMachines')">
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