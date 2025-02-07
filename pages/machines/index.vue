<!-- ~/pages/machines/index.vue -->
<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Added container -->
      <div class="relative text-center py-8 text-gray-900">
                    <h1 class="text-4xl font-extrabold sm:text-5xl">
                        All Machines
                    </h1>
                    <p class="mt-4 text-lg">
                        Explore our top-of-the-line machining solutions.
                    </p>
                </div>
      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search machines..."
          class="w-full p-4 border border-gray-300 rounded-lg"
        />
      </div>
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
                :src="`https://utimachinery.com/wp-content/uploads/2024/09/${machine.invID}_1.jpg`"
                alt="{{ machine.title }}"
                class="w-full h-64 object-cover lazyload"
                loading="lazy"
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useInventory } from '~/composables/useInventory'

// Access data at build time, so it's statically rendered
const { getAllMachines } = useInventory()
const allMachines = getAllMachines()

const searchQuery = ref('')
const route = useRoute()

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = decodeURIComponent(route.query.search)
  }
})

const filteredMachines = computed(() => {
  return allMachines.filter(machine => {
    const searchLower = searchQuery.value.toLowerCase()
    return (
      machine.manufacturer.toLowerCase().includes(searchLower) ||
      machine.model.toLowerCase().includes(searchLower) ||
      machine.description.toLowerCase().includes(searchLower) ||
      machine.webDesc.toLowerCase().includes(searchLower) ||
      machine.advSpec.toLowerCase().includes(searchLower) ||
      machine.condition.toLowerCase().includes(searchLower) ||
      machine.control.toLowerCase().includes(searchLower) ||
      machine.year.toString().includes(searchLower) ||
      machine.invID.toString().includes(searchLower)
    )
  })
})
</script>
