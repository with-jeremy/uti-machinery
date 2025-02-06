<!-- ~/pages/machines/[slug].vue -->
<template>
  <div class="min-h-screen px-4">
    <div class="max-w-[800px] mx-auto bg-gray-800 rounded-lg shadow-xl p-6 text-gray-100">
      <h1 class="text-3xl font-bold mb-4 text-gray-100">{{ machine.manufacturer }} {{ machine.model }} <span class="text-gray-300">({{ machine.year }})</span></h1>

      <div class="mb-6">
        <img
          v-if="featuredImage"
          :src="featuredImage"
          alt="Machine image"
          class="w-full rounded-lg shadow-lg"
        />
      </div>

      <h2 class="text-xl font-semibold mb-3 text-gray-100">
        {{ machine.description }}
      </h2>
      <div class="bg-gray-700 rounded-md p-4 mb-6">
        <p class="mb-2">
          <span class="text-gray-400">Condition:</span> {{ machine.condition }}<br>
          <span class="text-gray-400">Control:</span> {{ machine.control }}
        </p>
        <p class="text-gray-300">
          {{ machine.advSpec }}
        </p>
      </div>

      <!-- Specs Table -->
      <div class="specs-list mb-8">
        <h3 class="text-xl font-bold mb-4 text-gray-300">Specifications</h3>
        <div class="bg-gray-700 rounded-md p-4">
          <table class="w-full">
            <colgroup>
              <col class="w-[100px]" />
              <col class="w-[300px]" />
              <col class="w-[150px]" />
            </colgroup>
            <tbody>
              <tr v-for="(spec) in filteredSpecsGroup" :key="spec.specid" class="border-b border-gray-600 last:border-0">
                <td class="py-2 pr-4 text-gray-100">
                  {{ spec.groupnames }}
                </td>
                <td class="py-2 pr-4">
                  {{ spec.description }}
                </td>
                <td class="py-2 text-blue-100">
                  {{ spec.specvalues }}
                </td>
              </tr>
              <tr v-for="(spec) in filteredSpecsEw" :key="spec.specid" class="border-b border-gray-600 last:border-0">
                <td class="py-2 pr-4 text-gray-100">
                  {{ spec.groupnameew }}
                </td>
                <td class="py-2 pr-4">
                  {{ spec.equippedwith }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="bg-gray-900 rounded-md p-6 mt-8">
        <h2 class="text-xl font-bold mb-3 text-blue-100">Request for Proposal</h2>
        <div class="rfi-form">
          <form name="rfi" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="rfi" />
            <input type="hidden" name="invID" :value="route.params.slug" />
            <div class="mb-4">
              <label for="name" class="block text-gray-300 mb-2">Name</label>
              <input type="text" id="name" name="name" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" required />
            </div>
            <div class="mb-4">
              <label for="company" class="block text-gray-300 mb-2">Company Name (optional)</label>
              <input type="text" id="company" name="company" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" />
            </div>
            <div class="mb-4">
              <label for="comments" class="block text-gray-300 mb-2">Comments</label>
              <textarea id="comments" name="comments" rows="4" class="w-full p-2 rounded-md bg-gray-800 text-gray-100"></textarea>
            </div>
            <div>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useInventory } from '~/composables/useInventory'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const { getMachineById, getSpecsForMachine } = useInventory()

const invID = route.params.slug
const machine = getMachineById(invID)
const machineSpecs = getSpecsForMachine(invID)

const filteredSpecsGroup = computed(() => 
  machineSpecs.filter(spec => spec.description)
)

const filteredSpecsEw = computed(() => 
  machineSpecs.filter(spec => spec.ewid)
)

// Redirect if machine not found
if (!machine) {
  router.push('/machines')
}

const featuredImage = `https://utimachinery.com/wp-content/uploads/2024/09/${invID}_1.jpg`
</script>
