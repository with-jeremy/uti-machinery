<template>
  <div class="text-white min-h-screen">
    <section class="relative pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative text-center py-8 text-gray-800">
          <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Featured Machines
          </h1>
          <p class="mt-4 text-lg">
            Explore our top-of-the-line machining solutions.
          </p>
        </div>
        
        <!-- Swiper Container for Featured Machines -->
        <div class="text-white" style="min-height: 600px;">
          <swiper-container v-if="slides.length && !loading" 
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
              <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-[1.02] p-6">
                <h2 class="text-2xl font-semibold mb-4 text-gray-100">{{ machine.manufacturer }} {{ machine.model }} <span class="text-gray-300">({{ machine.year }})</span></h2>
                <div class="mb-6">
                  <img
                    :src="`https://utimachinery.com/wp-content/uploads/2024/09/${machine.invID}_1.jpg`"
                    alt="{{ machine.title }}"
                    class="w-full h-full object-cover lazyload"
                    loading="lazy"
                  />
                </div>
                
                <h3 class="text-lg font-semibold mb-3 text-gray-100">
                  {{ machine.description }}
                </h3>


                <div class="bg-gray-700 rounded-md p-4 mb-6">
                  <p class="mb-2">
                    <span class="text-gray-400">Condition:</span> {{ machine.condition }}<br>
                    <span v-if="machine.control" class="text-gray-400">Control:</span> {{ machine.control }}
                  </p>
                  <p class="text-gray-300">
                    {{ machine.advSpec }}
                  </p>
                </div>
                <span 
                  class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out mb-4"
                  role="button"
                  tabindex="0"
                >
                  View Details
                </span>
              </div>
            </NuxtLink>
          </swiper-slide>
        </swiper-container>
      </div>
      <client-only>
        <div class="brands bg-gray-800 py-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-4 text-center border-b-2 pb-6">Browse by Brand</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li v-for="brand in brands" :key="brand" class="hover:shadow-lg transition-shadow text-center">

              <NuxtLink :to="{ path: '/machines', query: { search: sanitize(brand) } }" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold  px-6 py-2 rounded-md shadow-sm hover:underline">
                {{ brand }}
              </NuxtLink>

            </li>
          </ul>
        </div>
        <div class="types bg-gray-800 py-6 rounded-lg shadow-md my-4">
          <h3 class="text-2xl font-semibold mb-4 text-center border-b-2 pb-6">Browse by Machine Type</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> 
            <li v-for="type in types" :key="type" class=" hover:shadow-lg transition-shadow text-center">
              <NuxtLink :to="{ path: '/machines', query: { search: sanitize(type) } }" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold  px-6 py-2 rounded-md shadow-sm hover:underline">
                {{ type }}
              </NuxtLink>
            </li>
          </ul>
        </div>

      </client-only>
  </div>
    </section>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Keyboard, Pagination, Navigation } from 'swiper/modules';
import { useInventory } from '~/composables/useInventory';

const { getFeatured, getBrandNames, getMachineTypes } = useInventory();

const slides = ref([]);
const loading = ref(true);
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

nextTick(() => {
  loading.value = false;
});

const featured = getFeatured();
slides.value = featured;
const modules = [Autoplay, Keyboard, Pagination, Navigation];
const brands = getBrandNames();
const types = getMachineTypes();

const sanitize = (str) => {
  return encodeURIComponent(str);
};

</script>

<style scoped>

</style>