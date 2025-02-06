<template>
  <div class="text-white min-h-screen">
    <section class="relative pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative text-center py-8">
          <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Featured Machines
          </h1>
          <p class="mt-4 text-lg text-gray-100">
            Explore our top-of-the-line machining solutions.
          </p>
        </div>
        
        <!-- Swiper Container for Featured Machines -->
        <div v-if="slides.length" class="text-white">
          <swiper-container
            :slides-per-view="1"
            :space-between="10"
            :breakpoints="breakpoints"
            :pagination="{
              clickable: true,
            }"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :keyboard="{
              enabled: true,
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper py-4"
          >
          <swiper-slide v-for="machine in slides" :key="machine.invID">
            <NuxtLink
              :to="`/machines/${machine.invID}`"
              class="group relative inline-block"
              :aria-label="`View details for ${machine.manufacturer} ${machine.model}`"
              >
              <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                <h2 class="text-xl font-semibold text-gray-100 p-4">{{ machine.manufacturer }} {{ machine.model }} ({{ machine.year }})</h2>
                <div class="bg-gradient-to-br from-gray-700 to-black flex items-center justify-center">
                  <img
                  :src="`https://utimachinery.com/wp-content/uploads/2024/09/${machine.invID}_1.jpg`"
                  alt="{{ machine.title }}"
                  class="w-full h-full object-cover lazyload"
                  loading="lazy"
                  />
                </div>
                <p class="text-sm p-4">Condition: {{ machine.condition }}</p>
                <p class="text-sm text-gray-300 px-4 py-2 h-28 overflow-y-auto whitespace-normal overflow-x-hidden bg-gray-700 rounded-md mx-4">{{ machine.advSpec }}</p>
                <p class="my-2">
                  <span 
                    class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out mx-4 mb-4"
                    role="button"
                    tabindex="0"
                    >
                    View Details
                  </span>
                </p>
              </div>
            </NuxtLink>
          </swiper-slide>
        </swiper-container>
      </div>
      <div class="brands bg-gray-800 py-6 rounded-lg shadow-md">
        <h3 class="text-2xl font-semibold mb-4 text-center border-b-2 pb-6">Browse by Brand</h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li v-for="brand in brands" :key="brand" class="hover:shadow-lg transition-shadow text-center">
            <NuxtLink :to="`#`" class="inline-block bg-white px-6 py-2 rounded-md shadow-sm text-blue-500 hover:underline">
              {{ brand }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="types bg-gray-800 py-6 rounded-lg shadow-md my-4">
        <h3 class="text-2xl font-semibold mb-4 text-center border-b-2 pb-6">Browse by Machine Type</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> 
            <li v-for="type in types" :key="type" class=" hover:shadow-lg transition-shadow text-center">
              <NuxtLink :to="`#`" class="inline-block bg-white px-6 py-2 rounded-md shadow-sm text-blue-500 hover:underline">
                {{ type }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Keyboard, Pagination, Navigation } from 'swiper/modules';
import { useInventory } from '~/composables/useInventory';

const { getAllMachines, getBrandNames, getMachineTypes } = useInventory();

const slides = ref([]);
const breakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

onMounted(() => {
  const featured = getAllMachines().filter(m => m.special === '1');
  slides.value = featured;
});

const modules = [Autoplay, Keyboard, Pagination, Navigation];
const brands = getBrandNames();
const types = getMachineTypes();
</script>

<style scoped>
.bg-primary {
  background-color: #1e90ff;
}
.bg-primary-dark {
  background-color: #1c7ed6;
}
</style>