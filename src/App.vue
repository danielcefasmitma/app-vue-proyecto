<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          
          <div class="flex-shrink-0 flex items-center">
            <RouterLink to="/" class="text-2xl font-black text-indigo-600 tracking-wider">
              MI<span class="text-gray-800">APP</span>
            </RouterLink>
          </div>

          <div class="hidden md:flex md:items-center md:space-x-8">
            <RouterLink 
              to="/" 
              class="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              active-class="text-indigo-600 font-bold border-b-2 border-indigo-600 py-5"
            >
              INICIO
            </RouterLink>

            <RouterLink 
              to="/blog" 
              class="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              active-class="text-indigo-600 font-bold border-b-2 border-indigo-600 py-5"
            >
              BLOG
            </RouterLink>

            <RouterLink 
              to="/producto" 
              class="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              active-class="text-indigo-600 font-bold border-b-2 border-indigo-600 py-5"
            >
              PRODUCTOS
            </RouterLink>

            <RouterLink 
              to="/login" 
              class="ml-4 px-5 py-2 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow transition-all duration-200"
            >
              INGRESAR
            </RouterLink>
          </div>

          <div class="flex md:hidden">
            <button 
              @click="menuAbierto = !menuAbierto" 
              type="button" 
              class="text-gray-600 hover:text-indigo-600 focus:outline-none p-2 rounded-md"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!menuAbierto" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
      </nav>

      <div v-show="menuAbierto" class="md:hidden border-t border-gray-100 bg-white">
        <div class="px-4 pt-2 pb-4 space-y-2 flex flex-col">
          <RouterLink 
            @click="menuAbierto = false"
            to="/" 
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            active-class="text-indigo-600 font-bold bg-indigo-50"
          >
            INICIO
          </RouterLink>
          <RouterLink 
            @click="menuAbierto = false"
            to="/blog" 
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            active-class="text-indigo-600 font-bold bg-indigo-50"
          >
            BLOG
          </RouterLink>
          <RouterLink 
            @click="menuAbierto = false"
            to="/producto" 
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            active-class="text-indigo-600 font-bold bg-indigo-50"
          >
            PRODUCTOS
          </RouterLink>
          <RouterLink 
            @click="menuAbierto = false"
            to="/login" 
            class="block text-center mt-4 px-4 py-2 rounded-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            INGRESAR
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>
  </div>
</template>
