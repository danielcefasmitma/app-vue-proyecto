<template>
  <div class="max-w-7xl mx-auto pb-12">
    
    <div class="mb-8 border-b border-gray-200 pb-4">
      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
        Catálogo de Productos
      </h1>
      <p class="text-sm text-gray-500 mt-2">Selecciona los productos de hardware y electrónica que deseas llevar.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <div class="lg:col-span-2">
        <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📦</span> Productos Disponibles
        </h2>

        <div v-if="productos.length === 0" class="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500">
          No hay productos disponibles para la venta. Regresa a la sección de <span class="font-bold text-slate-700">PRODUCTOS</span> para agregar inventario.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div 
            v-for="(producto, index) in productos" 
            :key="index"
            class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div class="h-48 bg-gray-100 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  v-if="producto.imagen" 
                  :src="producto.imagen" 
                  :alt="producto.nombre"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                >
                <span v-else class="text-gray-400 text-sm font-medium">Sin Imagen</span>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-bold text-slate-800 line-clamp-1">
                  {{ producto.nombre }}
                </h3>
                <div class="flex justify-between items-center mt-2">
                  <p class="text-2xl font-extrabold text-cyan-600">
                    ${{ producto.precio }}
                  </p>
                  <span class="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-full">
                    Stock: {{ producto.stock || 'N/A' }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 mt-auto">
              <button 
                @click="agregarCarrito(producto)"
                class="w-full bg-slate-900 hover:bg-cyan-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>🛒</span> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 lg:col-span-1 sticky top-24">
        <div class="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
          <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span>🛍️</span> Tu Carrito
          </h2>
          <span class="bg-cyan-100 text-cyan-800 text-xs font-extrabold px-2.5 py-1 rounded-full">
            {{ carrito.length }} ítems
          </span>
        </div>

        <div v-if="carrito.length === 0" class="py-8 text-center text-gray-400 text-sm">
          Tu carrito está vacío. ¡Añade algunos productos informáticos!
        </div>

        <div v-else class="space-y-3 max-h-80 overflow-y-auto pr-1">
          <div 
            v-for="(item, index) in carrito" 
            :key="index"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm"
          >
            <div class="flex-1 truncate pr-2">
              <p class="font-bold text-slate-800 truncate">{{ item.nombre }}</p>
              <p class="text-xs text-gray-500">Cant: {{ item.cantidad }}</p>
            </div>
            <div class="text-right">
              <span class="font-bold text-cyan-600">${{ item.precio }}</span>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 mt-6 pt-4">
          <div class="flex justify-between items-center text-slate-600 text-sm mb-2">
            <span>Subtotal</span>
            <span>${{ calcularTotal() }}</span>
          </div>
          <div class="flex justify-between items-center text-lg font-extrabold text-slate-900 mb-6">
            <span>Total a Pagar</span>
            <span class="text-cyan-600">${{ calcularTotal() }}</span>
          </div>

          <button 
            :disabled="carrito.length === 0"
            class="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 mb-2 cursor-pointer disabled:cursor-not-allowed"
          >
            Proceder al Pago
          </button>
          
          <button 
            v-if="carrito.length > 0"
            @click="vaciarCarrito" 
            class="w-full text-xs text-red-500 hover:text-red-700 font-semibold py-1 transition-colors text-center"
          >
            Vaciar Carrito
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const productos = ref([])
const carrito = ref([])

onMounted(()=>{
    // Leemos los productos que guardaste o cargaste en la otra vista
    productos.value = JSON.parse(localStorage.getItem("productos") || "[]");
})

function agregarCarrito(producto){
    carrito.value.push({
      nombre: producto.nombre, 
      cantidad: 1, 
      precio: Number(producto.precio) // Nos aseguramos que sea número
    })
}

// Función adicional para que el carrito sea funcional: calcula el total de dinero
function calcularTotal() {
    return carrito.value
      .reduce((total, item) => total + (Number(item.precio) * item.cantidad), 0)
      .toFixed(2);
}

// Función adicional para limpiar el carrito si el usuario se arrepiente
function vaciarCarrito() {
    carrito.value = [];
}
</script>