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
            :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }"
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
          <swiper-slide v-for="machine in slides" :key="machine.InvID">
            <NuxtLink
              :to="`/machines/${machine.InvID}`"
              class="group relative inline-block"
              :aria-label="`View details for ${machine.Manufacturer} ${machine.Model}`"
              >
              <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-[1.02] p-6">
                <h2 class="text-2xl font-semibold mb-4 text-gray-100">{{ machine.Manufacturer }} {{ machine.Model }} <span class="text-gray-300">({{ machine.Year }})</span></h2>
                <div class="mb-6">
                  <img
                    :src="`/images/${machine.InvID}_1.jpg`"
                    alt="{{ machine.Description }}"
                    class="w-full h-full object-cover lazyload"
                    loading="lazy"
                    @error="
                      $event.target.src = '/images/noImg.png';
                      $event.target.onerror = null;
                    "
                  />
                </div>
                
                <h3 class="text-lg font-semibold mb-3 text-gray-100">
                  {{ machine.Description }}
                </h3>


                <div class="bg-gray-700 rounded-md p-4 mb-6">
                  <p class="mb-2">
                    <span v-if="machine.InvID" class="text-gray-200">ID#:</span> {{ machine.InvID }}<br>
                    <span v-if="machine.Control" class="text-gray-200">Control:</span> {{ machine.Control }}
                  </p>
                  <p class="text-gray-300">
                    {{ machine.AdvSpec }}
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
    
<h2 id="allMachines" class="all-machines text-2xl font-extrabold tracking-tight text-center text-gray-900 my-4">All Machines</h2>
       <!-- brands and types lists -->
      <client-only>
        <div class="brands bg-gray-800 py-3 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2 text-center border-b-2 pb-3">Browse by Brand</h3>
          <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            <li v-for="brand in brands" :key="brand" class="hover:shadow-lg transition-shadow text-center">
              <label
                :class="['inline-block font-bold px-4 py-1 rounded-md shadow-sm cursor-pointer text-sm', { 'bg-blue-700 text-white': isActiveFilter(brand), 'bg-blue-600 text-white': !isActiveFilter(brand) }]"
              >
                <input type="checkbox" :value="brand" v-model="selectedBrands" class="hidden" />
                <span class="mr-2">{{ brand }}</span>
                <span v-if="isActiveFilter(brand)" class="text-white">✗</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="types bg-gray-800 py-3 rounded-lg shadow-md my-2">
          <h3 class="text-xl font-semibold mb-2 text-center border-b-2 pb-3">Browse by Machine Type</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"> 
            <li v-for="type in types" :key="type" class=" hover:shadow-lg transition-shadow text-center">
              <label
                :class="['inline-block font-bold px-4 py-1 rounded-md shadow-sm cursor-pointer text-sm', { 'bg-blue-700 text-white': isActiveFilter(type), 'bg-blue-600 text-white': !isActiveFilter(type) }]"
              >
                <input type="checkbox" :value="type" v-model="selectedTypes" class="hidden" />
                <span class="mr-2">{{ type }}</span>
                <span v-if="isActiveFilter(type)" class="text-white">✗</span>
              </label>
            </li>
          </ul>
        </div>

        <div  id="filteredMachines" class="mb-3 relative filter-pills">   
          <div v-if="activeFilters.length" class="flex flex-wrap gap-1 mb-2">
            <span
              v-for="filter in activeFilters"
              :key="filter"
              @click="removeFilter(filter)"
              class="bg-blue-600 text-white font-bold py-0.5 px-2 rounded-full flex items-center cursor-pointer text-xs"
            >
              {{ filter }}
              <span class="ml-1">&times;</span>
            </span>
            <button
              @click="clearAllFilters"
              class="bg-red-600 text-white font-bold py-0.5 px-2 rounded-full cursor-pointer text-xs"
            >
              Clear All Filters
            </button>
          </div>
           
        </div>

      </client-only>
      

      <!-- all machines list -->
      <div class="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <NuxtLink
          v-for="machine in filteredMachines"
          :key="machine.InvID"
          :to="'/machines/' + machine.InvID"
          class="group relative"
          :aria-label="`View details for ${machine.Manufacturer} ${machine.Model}`"
        >
          <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-200 ease-in-out hover:scale-[1.02] p-6">
            <h2 class="text-2xl font-semibold text-gray-100 mb-4">{{ machine.Manufacturer }} {{ machine.Model }} ({{ machine.Year }})</h2>
            <div class="mb-6">              
              <img
                :src="`/images/${machine.InvID}_1.jpg`"
                alt="{{ machine.Description }}"
                class="w-full h-64 object-cover lazyload"
                loading="lazy"
                @error="
                  $event.target.src = '/images/noImg.png';
                  $event.target.onerror = null;
                "
              />
            </div>

            <h3 class="text-lg font-semibold mb-3 text-gray-100">
              {{ machine.Description }}
            </h3>
              
            <div class="bg-gray-700 rounded-md p-4 mb-6">
              <p class="mb-2">
                <span v-if="machine.InvID" class="text-gray-200">ID#:</span> {{ machine.InvID }}<br>
                <span v-if="machine.Control" class="text-gray-200">Control:</span> {{ machine.Control }}
              </p>
              <p class="text-gray-300">
                {{ machine.AdvSpec }}
              </p>
            
            </div>
            <p class="mb-2 flex justify-between items-center">
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
import { Autoplay, Keyboard, Pagination, Navigation } from 'swiper/modules';
import { useInventory } from '~/composables/useInventory';

const headerRef = ref(null);
const headerHeight = ref(0);

const { getAllMachines, getBrandNames, getFeatured, getMachineTypes } = useInventory();

const slides = ref([]);
const loading = ref(true);

nextTick(() => {
  loading.value = false;
});

const allMachines = getAllMachines();
const brands = getBrandNames();
const featured = getFeatured();
const types = getMachineTypes();


slides.value = featured;
const modules = [Autoplay, Keyboard, Pagination, Navigation];

const selectedBrands = ref([]);
const selectedTypes = ref([]);
const activeFilters = computed(() => [...selectedBrands.value, ...selectedTypes.value]);

const isActiveFilter = (filter) => {
  return selectedBrands.value.includes(filter) || selectedTypes.value.includes(filter);
};

const removeFilter = (filter) => {
  selectedBrands.value = selectedBrands.value.filter((brand) => brand !== filter);
  selectedTypes.value = selectedTypes.value.filter((type) => type !== filter);
 customScrollTo('allMachines');
};

const clearAllFilters = () => {
  selectedBrands.value = [];
  selectedTypes.value = [];
 customScrollTo('allMachines');
};

const customScrollTo = (id) => {
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

watch(activeFilters, () => {
  if (activeFilters.value.length > 0) {
    customScrollTo('filteredMachines');
  }
});

const filteredMachines = computed(() => {
  return allMachines.filter(machine => {
    const matchesBrand = selectedBrands.value.length === 0 || selectedBrands.value.includes(machine.Manufacturer);
    const matchesType = selectedTypes.value.length === 0 || selectedTypes.value.includes(machine.WebDesc);
    return matchesBrand && matchesType;
  });
})


</script>

<style scoped>  
</style>
