<template>
    <div>
      <!-- Header -->
      <header class="header">
        <!-- Primera parte del grid -->
        <div class="grid-item-text">
          <p class="protest-strike-regular" style="font-size: 110px;">EVENTOS EN DIRECTO, SEA CUAL SEA TU AMBIENTE</p>
          <p class="kode-mono" style="font-size: 25px;">Salir nos hace sentir bien, y las recomendaciones personalizadas de TicketStore te lo ponen fácil para que disfrutes más de los eventos que te molan. Estés donde estés, te guste lo que te guste.</p>
        </div>
        <!-- Segunda parte del grid -->
        <div class="grid-item">
          <img src="/header_image.jpg" alt="Imagen">
        </div>
      </header>
    </div>
  </template>
  
  <style scoped>
  
  /* Estilos del header */
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Divide el header en dos columnas iguales */
    gap: 20px; /* Espacio entre las dos partes del grid */
  }
  
  .grid-item-text{
    /* Estilos de cada item del grid */
    height: auto;
  }
  
  .grid-item img {
    padding-top: 5%;
    padding-left: 20%;
    width: 65%; /* La imagen ocupará todo el ancho del contenedor */
    height: 70%; /* La altura se ajustará automáticamente */
    border-radius: 10px !important;
    height: auto;
  }
  </style>
  