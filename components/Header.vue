<template>
  <header class="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50 transition-all duration-300 py-4">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between lg:px-48">
      <div class="hidden md:flex space-x-6">
        <a href="#allMachines" class="hover:text-primary-light">See All Machines</a>
      </div>
      <NuxtLink to="/" class="mx-auto">
        <img
          src="https://utimachinery.com/wp-content/uploads/2017/06/Logo-1.png"
          alt="UTI Machinery Logo"
          class="h-8 md:h-10 transition-all duration-300"
        />
      </NuxtLink>
      <div class="hidden md:flex space-x-6">

		                <a href="https://www.facebook.com/utimachinery/" class="icon">
			                <span><img src="http://www.utimachinery.com/wp-content/uploads/2017/06/facebook-30-e1497978181714.png" alt="fb link icon" height="30"></span>
		                </a>
	             
                		<a href="https://www.youtube.com/user/UTImachinery" class="icon">
                			<span><img src="http://www.utimachinery.com/wp-content/uploads/2017/06/YouTube-30.png" alt="youtube link icon" height="30"></span>
                		</a>
             
        <a href="tel:8775978300" class="hover:text-primary-light">(877) 597-8300</a>
      </div>
      <div class="flex flex-col md:hidden space-y-4 mt-4 items-center">
        <a href="#allMachines" class="hover:text-primary-light">See All Machines</a>
        <div class="flex space-x-6">
          <a href="https://www.facebook.com/utimachinery/" class="icon">
            <span>
              <img src="http://www.utimachinery.com/wp-content/uploads/2017/06/facebook-30-e1497978181714.png" alt="fb link icon" height="30">
            </span>
          </a>
          <a href="https://www.youtube.com/user/UTImachinery" class="icon">
            <span>
              <img src="http://www.utimachinery.com/wp-content/uploads/2017/06/YouTube-30.png" alt="youtube link icon" height="30">
            </span>
          </a>
          <a href="tel:8775978300" class="hover:text-primary-light">(877) 597-8300</a>
        </div>
      </div>
    </div>
  </header>
</template>
