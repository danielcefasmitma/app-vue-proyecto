<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    
    <div class="mb-8 border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
        Panel de Productos
      </h1>
      <p class="mt-2 text-sm text-gray-500">
        Administra el inventario, añade nuevos artículos o modifica sus valores en tiempo real.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span class="w-2 h-6 bg-indigo-600 rounded-full"></span>
          {{ editandoIndex !== null ? 'Modificar Producto' : 'Nuevo Producto' }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Nombre del Producto</label>
            <input 
              type="text" 
              v-model="producto.nombre"
              placeholder="Ej. Monitor 4K"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            >
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Stock</label>
              <input 
                type="number" 
                v-model.number="producto.stock"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              >
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Precio ($)</label>
              <input 
                type="number" 
                v-model.number="producto.precio"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              >
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">URL de la Imagen</label>
            <input 
              type="text" 
              v-model="producto.imagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            >
          </div>

          <button 
            @click="funGuardarProducto()"
            class="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all duration-200 text-sm tracking-wide"
          >
            {{ editandoIndex !== null ? 'Actualizar Producto' : 'Guardar Producto' }}
          </button>
        </div>
      </section>

      <section class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/70">
          <h2 class="text-base font-bold text-gray-800">Lista de Productos</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-200 bg-gray-50/50">
                <th class="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Imagen</th>
                <th class="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Stock</th>
                <th class="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Precio</th>
                <th class="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr 
                v-for="(prod, posicion) in productos" 
                :key="posicion"
                class="hover:bg-gray-50/80 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="h-14 w-14 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                    <img 
                      :src="prod.imagen || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=100&q=80'" 
                      :alt="prod.nombre" 
                      class="w-full h-full object-cover"
                    >
                  </div>
                </td>
                
                <td class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  {{ prod.nombre }}
                </td>
                
                <td class="px-6 py-4 text-center whitespace-nowrap">
                  <span 
                    class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
                    :class="prod.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'"
                  >
                    {{ prod.stock }} unidades
                  </span>
                </td>
                
                <td class="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                  ${{ prod.precio }}
                </td>
                
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center justify-center gap-3">
                    <button 
                      @click="funEditar(prod)"
                      class="text-indigo-600 hover:text-indigo-900 font-semibold transition-colors"
                    >
                      Editar
                    </button>
                    <span class="text-gray-300">|</span>
                    <button 
                      @click="funEliminar(posicion)"
                      class="text-rose-600 hover:text-rose-900 font-semibold transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="productos.length === 0" class="text-center py-12 text-gray-500 text-sm">
          No hay productos disponibles en el inventario.
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

    const productos = ref([]);
    const producto = ref({});
    const editar = ref(false);
    onMounted(() => {
        //alert("Cargando Producto...")
        funListar();
    })

    function funListar(){
        const datos = localStorage.getItem("productos") || "[]";  
        productos.value = JSON.parse(datos); // Convierte la cadena JSON en un array de objetos
    }

    function funGuardarProducto(){
        if(editar.value){
            producto.value = {}
            editar.value = false;
        }else{
            const productoNuevo = producto.value
            productos.value.push(productoNuevo);
            producto.value = {};
        }
        // Guardar el array actualizado en localStorage, el JSON.stringify convierte el array de objetos en una cadena JSON para almacenarlo correctamente
        localStorage.setItem("productos", JSON.stringify(productos.value)) 
    }

    function funEditar(prod){
        editar.value = true;
        producto.value = prod
    }

    function funEliminar(posicion){
        productos.value.splice(posicion, 1);
        // Guardar el array actualizado en localStorage, el JSON.stringify convierte el array de objetos en una cadena JSON para almacenarlo correctamente
        localStorage.setItem("productos", JSON.stringify(productos.value))
    }
</script>