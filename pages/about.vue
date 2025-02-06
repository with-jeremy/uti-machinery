<template>
  <div v-if="slides.length" class="text-white min-h-screen">
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
            <p class="text-sm p-2">Condition: {{ machine.condition }}</p>
            <p class="text-sm text-gray-300 px-4 py-2 h-28 overflow-y-auto whitespace-normal overflow-x-hidden">{{ machine.advSpec }}</p>
            <p class="mb-2">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Keyboard, Pagination, Navigation } from 'swiper/modules';
import { useInventory } from '~/composables/useInventory';

const { getAllMachines } = useInventory();

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
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}
</style>