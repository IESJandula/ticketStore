<template>
    <div class="cart-container">
      <h2>Carrito de Compras</h2>
      <div v-if="cartItems.length === 0">El carrito está vacío.</div>
      <div v-else>
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <div>{{ item.title }}</div>
          <div>{{ item.price }} €</div>
          <button @click="removeFromCart(index)">Eliminar</button>
        </div>
        <button @click="clearCart">Vaciar carrito</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  
  const store = useStore();
  const cartItems = store.state.cart.items;
  
  const removeFromCart = (index) => {
    store.commit('removeFromCart', index);
  };
  
  const clearCart = () => {
    store.commit('clearCart');
  };
  </script>
  
  <style scoped>
  /* Estilos para el carrito de compras */
  </style>
  