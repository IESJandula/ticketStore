<template>
  <div>
    <!-- Navbar -->
    <nav>
      <div class="wrapper">
        <div class="logo"><a href="/"><img src="/logo-web.png" alt="logo_image" style="width: 30%; padding-top:3%;"></a></div>
        <input type="radio" name="slider" id="menu-btn">
        <input type="radio" name="slider" id="close-btn">
        <ul class="nav-links">
          <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
          <li><a href="/">Home</a></li>
          <li><a href="/concerts">Explorar Eventos</a></li>
          <li><a href="/register">Registrarse</a></li>
          <li><button class="search-button" @click="openSearchModal"><i class="fas fa-search"></i></button></li>
        </ul>
        <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
      </div>
    </nav>
    
    <!-- Modal del buscador -->
    <div class="search-modal" v-if="showSearch" @click.self="closeSearchModal">
      <div class="search-modal-content">
        <input type="text" v-model="searchQuery" placeholder="Busca tu evento" @input="filterEvents">
        <div v-if="filteredResults.length > 0">
          <ul class="event-list">
            <li v-for="event in filteredResults" :key="event.id" class="event-item" @click="goToConcertDetail(event)">
              <img :src="event.poster" alt="Event Poster" class="event-poster">
              <div class="event-details">
                <p class="event-title">{{ event.title }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No se encontraron eventos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showSearch = ref(false);
const searchQuery = ref('');
const searchResults = ref([]);
const filteredResults = ref([]);

// Función para mostrar el modal del buscador
const openSearchModal = () => {
  showSearch.value = true;
  fetchAllEvents();
};

// Función para cerrar el modal del buscador
const closeSearchModal = () => {
  showSearch.value = false;
  searchQuery.value = '';
  searchResults.value = [];
  filteredResults.value = [];
};

// Función para obtener todos los eventos
const fetchAllEvents = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/concerts');
    if (!response.ok) {
      throw new Error('Error al cargar los eventos');
    }
    const data = await response.json();
    searchResults.value = data.data; 
    filterEvents();
  } catch (error) {
    console.error(error);
    searchResults.value = [];
  }
};

// Función para filtrar eventos
const filterEvents = () => {
  const query = searchQuery.value.toLowerCase();
  filteredResults.value = searchResults.value.filter(event =>
    event.title.toLowerCase().includes(query)
  );
};

// Función para navegar a la vista de detalle del concierto
const goToConcertDetail = (concert) => {
  router.push(`/concerts/${concert.id}`);
};

// watch para filtrar eventos en tiempo real
watch(searchQuery, filterEvents);
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

nav {
  padding: 10px;
}

.navbar {
  width: 100%;
  background-color: white;
  top: 0;
  z-index: 1000;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navbar li {
  margin-right: 20px;
}

.navbar a {
  color: black;
  text-decoration: none;
}

.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  z-index: 10000; /* Z-index alto para que esté por encima de otros elementos */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinea el contenido al inicio del contenedor para evitar que se corte */

}

.search-modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 40%; /* Ajustar ancho a 40% */
  max-width: 500px; /* Ancho máximo del modal */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Añadir sombra al modal */
  overflow-y: auto; /* Agrega una barra de desplazamiento vertical cuando el contenido es demasiado grande */
  max-height: calc(100vh - 40px); /* Fija la altura máxima al 100% de la altura de la ventana menos el padding superior e inferior */
}

.search-modal-content input[type="text"] {
  width: calc(100% - 20px); /* Ajusta el ancho del input, dejando un espacio de 20px para los márgenes */
  padding: 10px;
  margin: 0 auto; /* Centra horizontalmente el input */
  display: block; /* Hace que el input sea un bloque, para que pueda ser centrado */
  border-radius: 10px;
  border: 1px solid #ccc;
}

.search-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
}

.event-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.event-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.event-poster {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.event-details {
  flex: 1;
}

.event-title {
  margin: 0;
}

.close-search {
  margin-left: 10px;
}
</style>
