<template>
    <div class=" text-white min-h-screen">
        <section class="relative">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="relative text-center py-8">
                    <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Featured Machines
                    </h1>
                    <p class="mt-4 text-lg text-gray-100">
                        Explore our top-of-the-line machining solutions.
                    </p>
                </div>
                
                <!-- Horizontal Scroll View for Featured Machines -->
                <div class="relative overflow-x-auto whitespace-nowrap flex gap-4 py-4">
                    <NuxtLink
                      v-for="machine in featuredMachines"
                      :key="machine.invID"
                      :to="`/machines/${machine.invID}`"
                      class="group relative inline-block"
                      :aria-label="`View details for ${machine.manufacturer} ${machine.model}`"
                    >
                      <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-[85vw] sm:w-[45vw] md:w-[33vw] flex-shrink-0 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
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
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useInventory } from '~/composables/useInventory'

const { getAllMachines } = useInventory()


// Let's filter for special machines (e.g., machine.special === "1")
const featuredMachines = getAllMachines().filter(m => m.special === '1')
</script>

<style scoped>
.bg-primary {
    background-color: #1e90ff;
}
.bg-primary-dark {
    background-color: #1c7ed6;
}
</style>