<template>
    <div>
      <!-- Renderiza los datos de las compras de ticket -->
      <div v-for="purchase in ticketPurchases" :key="purchase.id">
        {{ purchase.id }} - {{ purchase.user_id }} - {{ purchase.concert_id }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Define ticketPurchases como una referencia reactiva
  const ticketPurchases = ref([]);
  
  // Método para cargar las compras de tickets al montar el componente
  const loadTicketPurchases = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/ticket-purchases');
      if (!response.ok) {
        throw new Error('Error al cargar las compras de tickets');
      }
      // Actualiza el valor de ticketPurchases con los datos de la respuesta
      ticketPurchases.value = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Llama al método loadTicketPurchases cuando el componente se monta
  onMounted(loadTicketPurchases);
  </script>
  