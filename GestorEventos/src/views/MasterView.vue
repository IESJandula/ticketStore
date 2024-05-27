<template>
    <div>
      <!-- Barra de navegación -->
      <Navbar/>
  
      <!-- Contenido de la página actual -->
      <router-view></router-view>
    </div>
  </template>
  
  <script setup>
  import Navbar from './components/Gadgets/NavBar.vue';
  
  </script>
  