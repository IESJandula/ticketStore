<template>
    <div>
      <!-- Renderiza los datos de los usuarios -->
      <div v-for="user in users" :key="user.id">
        {{ user.nombre }} - {{ user.email }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Define users como una referencia reactiva
  const users = ref([]);
  
  // Método para cargar los usuarios al montar el componente
  const loadUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/profiles');
      if (!response.ok) {
        throw new Error('Error al cargar los usuarios');
      }
      // Actualiza el valor de users con los datos de la respuesta
      const responseData = await response.json();
      users.value = responseData;
      users.value = users.value.users;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Llama al método loadUsers cuando el componente se monta
  onMounted(loadUsers);
  </script>
  