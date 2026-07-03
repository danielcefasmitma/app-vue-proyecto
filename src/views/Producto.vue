<template>
    <h1>Nuestro productos</h1>
    <h3>El producto: {{ producto }}</h3>
    <h3>Lista productos: {{ productos }}</h3>
    

    <div>
        <label for="">Ingrese Nombre</label>
        <input type="text" v-model="producto.nombre">
        <br>
        <label for="">Ingrese Stock</label>
        <input type="number" v-model="producto.stock">
        <br>
        <label for="">Ingrese Precio</label>
        <input type="number" v-model="producto.precio">
        <br>
        <label for="">Ingrese Imagen</label>
        <input type="text" v-model="producto.imagen">
        <br>
        <button @click="funGuardarProducto()">Guardar Producto</button>
    </div>

    <table border="1">
        <thead>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
        </thead>
        <tbody>
            <tr v-for="(prod, posicion) in productos">
                <td>{{ prod.nombre }}</td>
                <td>{{ prod.stock }}</td>
                <td>{{ prod.precio }}</td>
                <td>
                    <img :src="prod.imagen" alt="" width="100">
                </td>
                <td>
                    <button @click="funEditar(prod)">editar</button>
                    <button @click="funEliminar(posicion)">eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
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
        productos.value = JSON.parse(datos);
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
        localStorage.setItem("productos", JSON.stringify(productos.value))
    }

    function funEditar(prod){
        editar.value = true;
        producto.value = prod
    }

    function funEliminar(posicion){
        productos.value.splice(posicion, 1);
    }
</script>