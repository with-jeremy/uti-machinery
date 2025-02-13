<!-- ~/pages/machines/[slug].vue -->
<template>
  <div class="min-h-screen px-4">
    <div class="max-w-[800px] mx-auto bg-gray-800 rounded-lg shadow-xl p-6 text-gray-100">
      <h1 class="text-3xl font-bold mb-4 text-gray-100">
        <span v-if="machine.manufacturer">{{ machine.manufacturer }} </span>
        <span v-if="machine.model"> {{ machine.model }} </span>
        <span v-if="machine.year" class="text-gray-300"> ({{ machine.year }})</span>
      </h1>

      <div class="mb-6">
        <img
          :src="`/images/${invID}_1.jpg`"
          alt="Machine image"
          class="w-full rounded-lg shadow-lg"
          @error="
            $event.target.src = '/images/noImg.png';
          "
        />
      </div>

      <h2 v-if="machine.description" class="text-xl font-semibold mb-3 text-gray-100">
        {{ machine.description }}
      </h2>
      <div class="bg-gray-700 rounded-md p-4 mb-6">
        <p class="mb-2">
          <span v-if="machine.invID" class="text-gray-200">ID#:</span> {{ machine.invID }}<br>
          <span v-if="machine.control" class="text-gray-200">Control:</span> {{ machine.control }}
        </p>
        <p v-if="machine.advSpec" class="text-gray-300">
          {{ machine.advSpec }}
        </p>
      </div>

      <!-- Additional Images -->
      <div class="additional-images mb-8">
        <button @click="openGallery" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Additional Images ({{ existingImages.length }})
        </button>
      </div>

      <!-- Lightbox Overlay -->
      <div
        v-if="openImage"
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50"
        @click="closeLightbox"
      >
        <button @click.stop="prevImage" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">&lt;</button>

        <img
          :src="`/images/${openImage}`"
          :alt="imageSlug"
          class="max-w-4/5 max-h-4/5 rounded-lg shadow-lg transform transition-transform duration-300"
          @click.stop
        />

        <button @click.stop="nextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">&gt;</button>

        <div class="absolute bottom-4 bg-blue-600 text-white rounded px-4 py-2">
          {{ imageSlug }}
        </div>
      </div>

      <!-- Specs Table -->
      <div v-if="filteredSpecsGroup.length || filteredSpecsEw.length" class="specs-list mb-8">
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
        <h2 class="text-xl font-bold mb-3 text-blue-100">Request for Information</h2>
        <div class="rfi-form">
          <form name="rfi" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="rfi" />
            <input type="hidden" name="invID" :value="route.params.slug" />
            <input type="hidden" name="manufacturer" :value="machine.manufacturer" />
            <input type="hidden" name="model" :value="machine.model" />

            <div class="mb-4">
              <label for="email" class="block text-gray-300 mb-2">Email*</label>
              <input type="email" id="email" name="email" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" required />
            </div>
            <div class="mb-4">
              <label for="contactName" class="block text-gray-300 mb-2">Contact Name*</label>
              <input type="text" id="contactName" name="contactName" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" required />
            </div>
            <div class="mb-4">
              <label for="phone" class="block text-gray-300 mb-2">Phone*</label>
              <input type="tel" id="phone" name="phone" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" required />
            </div>
            <div class="mb-4">
              <label for="company" class="block text-gray-300 mb-2">Company Name (optional)</label>
              <input type="text" id="company" name="company" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" />
            </div>
            <div class="mb-4">
              <label for="address" class="block text-gray-300 mb-2">Address</label>
              <input type="text" id="address" name="address" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" />
            </div>
            <div class="mb-4">
              <label for="city" class="block text-gray-300 mb-2">City</label>
              <input type="text" id="city" name="city" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" />
            </div>
            <div class="mb-4">
              <label for="state" class="block text-gray-300 mb-2">State</label>
              <input type="text" id="state" name="state" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" />
            </div>
            <div class="mb-4">
              <label for="postalCode" class="block text-gray-300 mb-2">Postal Code</label>
              <input type="text" id="postalCode" name="postalCode" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" />
            </div>
            <div class="mb-4">
              <label for="country" class="block text-gray-300 mb-2">Country</label>
              <input type="text" id="country" name="country" class="w-full p-2 rounded-md bg-gray-800 text-gray-100" />
            </div>
            <div class="mb-4">
              <input type="checkbox" id="hasMachines" name="hasMachines" class="mr-2" />
              <label for="hasMachines" class="text-gray-300">I have machines to sell or trade.</label>
            </div>
            <div class="mb-4">
              <input type="checkbox" id="emailList" name="emailList" class="mr-2" checked />
              <label for="emailList" class="text-gray-300">Sign up for email list?</label>
            </div>
            <div class="mb-4">
              <label for="message" class="block text-gray-300 mb-2">Message</label>
              <textarea id="message" name="message" rows="4" class="w-full p-2 rounded-md bg-gray-800 text-gray-100"></textarea>
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
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

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

const showImages = ref(false)
const openImage = ref(null)
const currentIndex = ref(null)

const toggleImages = () => {
  showImages.value = !showImages.value
}

const existingImages = ref([]);

onMounted(async () => {
  for (let i = 2; i <= 15; i++) {
    const imageName = `${invID}_${i}.jpg`;
    const exists = await imageUrlExists(imageName);
    if (exists) {
      existingImages.value.push(imageName);
    } else {
      break;
    }
  }

  const hrsImageName = `${invID}_hrs.jpg`;
  if (await imageUrlExists(hrsImageName)) {
    existingImages.value.push(hrsImageName);
  }

  // Check for invID_1.jpg and add it at the end
  const firstImageName = `${invID}_1.jpg`;
    if (!(existingImages.value.indexOf(firstImageName) > -1) && await imageUrlExists(firstImageName)) {
    existingImages.value.push(firstImageName);
  }

  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (event) => {
  if (openImage.value) {
    if (event.key === 'ArrowLeft') {
      prevImage();
    } else if (event.key === 'ArrowRight') {
      nextImage();
    } else if (event.key === 'Escape') {
      closeLightbox();
    }
  }
};

const openLightbox = (image, index) => {
  openImage.value = image;
  currentIndex.value = index;
};

const closeLightbox = () => {
  openImage.value = null;
  currentIndex.value = null;
};

const nextImage = () => {
  if (currentIndex.value !== null && existingImages.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % existingImages.value.length;
    openImage.value = existingImages.value[currentIndex.value];
  }
};

const prevImage = () => {
  if (currentIndex.value !== null && existingImages.value.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + existingImages.value.length) % existingImages.value.length;
    openImage.value = existingImages.value[currentIndex.value];
  }
};

const openGallery = () => {
  if (existingImages.value.length > 0) {
    openLightbox(existingImages.value[0], 0);
  }
};

const imageUrlExists = async (imageName) => {
  try {
    const response = await fetch(`/images/${imageName}`, { method: 'HEAD' });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

const imageSlug = computed(() => {
  if (openImage.value) {
    const parts = openImage.value.split('/');
    const filename = parts[parts.length - 1];
    return filename.substring(0, filename.lastIndexOf('.'));
  }
  return '';
});

// Redirect if machine not found
if (!machine) {
  router.push('/machines/index.vue')
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
