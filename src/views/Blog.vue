<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    
    <div class="text-center md:text-left mb-12 border-b border-gray-200 pb-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
        Mis Publicaciones
      </h1>
      <p class="mt-2 text-lg text-gray-600">
        Explora nuestros últimos artículos, tutoriales y novedades.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <article 
        v-for="(publicacion, index) in publicaciones" 
        :key="publicacion.id || index"
        class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group"
      >
        <div class="relative h-52 w-full bg-gray-100 overflow-hidden">
          <img 
            :src="publicacion.cover_image" 
            :alt="publicacion.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">
                Artículo
              </span>
              <span class="text-xs font-medium text-gray-400">
                {{ publicacion.published_at }}
              </span>
            </div>

            <h2 class="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
              {{ publicacion.title }}
            </h2>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span class="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 inline-flex items-center gap-1.5 transition-colors">
              Leer artículo
              <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>

    </div>

    <div v-if="publicaciones.length === 0" class="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 my-6">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">No hay publicaciones</h3>
      <p class="mt-1 text-sm text-gray-500">Aún no se ha publicado ningún artículo en el blog.</p>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

    const publicaciones = ref([]);

    onMounted(()=>{
        obtenerDatosApiBackend();
    })

    function obtenerDatosApiBackend(){
        fetch('https://dev.to/api/articles')
        .then(response => response.json())
        .then(data => {publicaciones.value = data})
    }
</script>