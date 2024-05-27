<template>
    <div class="container">
      <img src="/fondo-nuestros-eventos.avif" alt="fondo_eventos" class="jumboFooter">
      <div class="text-overlay">
        <h1 class="protest-strike-regular" style="font-size: 110px;">¿Estás buscando un evento? <br> Podemos ayudarte</h1>
        <a href="/concerts" class="custom-button">Nuestros eventos</a>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    position: relative; 
    margin-top: 20px;
  }
  
  .jumboFooter {
    width: 100%;
    height: 1100px;
  }
  
  .text-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: black;
  }

  .custom-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: black;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: rgb(184, 184, 184);
}
  </style>
  