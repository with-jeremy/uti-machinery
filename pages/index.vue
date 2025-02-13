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
                    :src="`/images/${machine.invID}_1.jpg`"
                    alt="{{ machine.title }}"
                    class="w-full h-full object-cover lazyload"
                    loading="lazy"
                    @error="
                      $event.target.src = '/images/noImg.png';
                      $event.target.onerror = null;
                    "
                  />
                </div>
                
                <h3 class="text-lg font-semibold mb-3 text-gray-100">
                  {{ machine.description }}
                </h3>


                <div class="bg-gray-700 rounded-md p-4 mb-6">
                  <p class="mb-2">
                    <span v-if="machine.invID" class="text-gray-200">ID#:</span> {{ machine.invID }}<br>
                    <span v-if="machine.control" class="text-gray-200">Control:</span> {{ machine.control }}
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
    
<h2 id="allMachines" class="text-3xl font-extrabold tracking-tight text-center text-gray-900 my-8">All Machines</h2>
       <!-- brands and types lists -->
      <client-only>
        <div class="brands bg-gray-800 py-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-4 text-center border-b-2 pb-6">Browse by Brand</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li v-for="brand in brands" :key="brand" class="hover:shadow-lg transition-shadow text-center">
              <label
                :class="['inline-block font-bold px-6 py-2 rounded-md shadow-sm cursor-pointer', { 'bg-blue-700 text-white': isActiveFilter(brand), 'bg-blue-600 text-white': !isActiveFilter(brand) }]"
              >
                <input type="checkbox" :value="brand" v-model="selectedBrands" class="hidden" />
                <span class="mr-2">{{ brand }}</span>
                <span v-if="isActiveFilter(brand)" class="text-white">✗</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="types bg-gray-800 py-6 rounded-lg shadow-md my-4">
          <h3 class="text-2xl font-semibold mb-4 text-center border-b-2 pb-6">Browse by Machine Type</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> 
            <li v-for="type in types" :key="type" class=" hover:shadow-lg transition-shadow text-center">
              <label
                :class="['inline-block font-bold px-6 py-2 rounded-md shadow-sm cursor-pointer', { 'bg-blue-700 text-white': isActiveFilter(type), 'bg-blue-600 text-white': !isActiveFilter(type) }]"
              >
                <input type="checkbox" :value="type" v-model="selectedTypes" class="hidden" />
                <span class="mr-2">{{ type }}</span>
                <span v-if="isActiveFilter(type)" class="text-white">✗</span>
              </label>
            </li>
          </ul>
        </div>

        <div class="mb-6 relative">
          <div v-if="activeFilters.length" class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="filter in activeFilters"
              :key="filter"
              @click="removeFilter(filter)"
              class="bg-blue-600 text-white font-bold py-1 px-3 rounded-full flex items-center cursor-pointer"
            >
              {{ filter }}
              <span class="ml-2">&times;</span>
            </span>
          </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search machines..."
              class="w-full p-4 border border-gray-300 text-gray-900 rounded-lg"
            />
            <span
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              &times;
            </span>
        </div>

      </client-only>
      

      <!-- all machines list -->
      <div class="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <NuxtLink
          v-for="machine in filteredMachines"
          :key="machine.invID"
          :to="'/machines/' + machine.invID"
          class="group relative"
          :aria-label="`View details for ${machine.manufacturer} ${machine.model}`"
        >
          <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-200 ease-in-out hover:scale-[1.02] p-6">
            <h2 class="text-2xl font-semibold text-gray-100 mb-4">{{ machine.manufacturer }} {{ machine.model }} ({{ machine.year }})</h2>
            <div class="mb-6">              
              <img
                :src="`/images/${machine.invID}_1.jpg`"
                alt="{{ machine.title }}"
                class="w-full h-64 object-cover lazyload"
                loading="lazy"
                @error="
                  $event.target.src = '/images/noImg.png';
                  $event.target.onerror = null;
                "
              />
            </div>

            <h3 class="text-lg font-semibold mb-3 text-gray-100">
              {{ machine.description }}
            </h3>
              
            <div class="bg-gray-700 rounded-md p-4 mb-6">
              <p class="mb-2">
                <span v-if="machine.invID" class="text-gray-200">ID#:</span> {{ machine.invID }}<br>
                <span v-if="machine.control" class="text-gray-200">Control:</span> {{ machine.control }}
              </p>
              <p class="text-gray-300">
                {{ machine.advSpec }}
              </p>
            </div>
            <p class="mb-2">
                <span
                  class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out mb-4"
                role="button"
                tabindex="0"
              >
                View Details
              </span>
            </p>
          </div>
        </NuxtLink>
      </div>
      
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Keyboard, Pagination, Navigation } from 'swiper/modules';
import { useInventory } from '~/composables/useInventory';

const { getAllMachines, getBrandNames, getFeatured, getMachineTypes } = useInventory();

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

const allMachines = getAllMachines();
const brands = getBrandNames();
const featured = getFeatured();
const types = getMachineTypes();


slides.value = featured;
const modules = [Autoplay, Keyboard, Pagination, Navigation];


const sanitize = (str) => {
  return encodeURIComponent(str);
};

const searchQuery = ref('');
const router = useRouter();
const route = useRoute()

const selectedBrands = ref([]);
const selectedTypes = ref([]);
const activeFilters = computed(() => [...selectedBrands.value, ...selectedTypes.value]);

const isActiveFilter = (filter) => {
  return selectedBrands.value.includes(filter) || selectedTypes.value.includes(filter);
};

const removeFilter = (filter) => {
  selectedBrands.value = selectedBrands.value.filter((brand) => brand !== filter);
  selectedTypes.value = selectedTypes.value.filter((type) => type !== filter);
};

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = decodeURIComponent(route.query.search)
  }
})
// Watch for changes in the route.query.search parameter
watch(() => route.query.search, (newSearch) => {
  if (!newSearch) {
    searchQuery.value = ''
  }
})

const clearSearch = () => {
  searchQuery.value = ''
}

const filteredMachines = computed(() => {
  return allMachines.filter(machine => {
    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch = (
      machine.manufacturer.toLowerCase().includes(searchLower) ||
      machine.model.toLowerCase().includes(searchLower) ||
      machine.description.toLowerCase().includes(searchLower) ||
      machine.webDesc.toLowerCase().includes(searchLower) ||
      machine.advSpec.toLowerCase().includes(searchLower) ||
      machine.condition.toLowerCase().includes(searchLower) ||
      machine.control.toLowerCase().includes(searchLower) ||
      machine.year.toString().includes(searchLower) ||
      machine.invID.toString().includes(searchLower)
    );
    const matchesBrand = selectedBrands.value.length === 0 || selectedBrands.value.includes(machine.manufacturer);
    const matchesType = selectedTypes.value.length === 0 || selectedTypes.value.includes(machine.webDesc);
    return matchesSearch && matchesBrand && matchesType;
  });
})
</script>

<style scoped>  

</style>
