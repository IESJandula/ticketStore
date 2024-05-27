<template>
  <div class="centered-content">
    <div v-if="concert" class="concert-details">
      <div class="concert-image-container">
        <img :src="concert.poster" alt="poster_concert" class="concert-image">
        <h3 class="security kode-mono" style="font-size: 15px;">TicketStore protege a fans y artistas <br> de la reventa ilegal. Tus entradas se <br> guardarán de forma segura en la app.</h3>
      </div>
      <div class="concert-info">
        <h2 style="font-size: 60px;">{{ concert.title }}</h2>
        <h4 style="font-size: 25px;"> {{ concert.location }}</h4>
        <h4 style="font-size: 25px;">{{ concert.date }}</h4>
        <div class="concert-buyTicket">
        <span style="font-size: 25px; font-weight: bold;">{{ concert.ticketPrice }} €</span>
        <small class="kode-mono">Este es el precio que pagarás. Sin sorpresas de última hora.</small>
        <div style="display: inline;">
          <button class="boton-compra" @click="addToCart(product)">Agregar al carrito</button>
          <button class="boton-compra" @click="buyTicket" :disabled="ticketPurchased">Comprar</button>
        </div>
        <p v-if="ticketPurchased">¡Entrada comprada con éxito!</p>
        <p v-if="error">{{ error }}</p>
        </div>
        <hr>
        <h4 style="font-size: 25px;">Informacion</h4>
        <p><strong>Artista:</strong> {{ concert.artist }}</p>
        <p>{{ concert.description}}</p>
        <p><strong>Entradas disponibles:</strong> {{ concert.ticketsAvailable }}</p>

      </div>
    </div>
    <p v-else>Cargando detalles del concierto...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const concertId = ref(router.currentRoute.value.params.id);
const concert = ref(null);
const error = ref('');
const ticketPurchased = ref(false);


const loadConcertDetail = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/concerts/${concertId.value}`);
    if (!response.ok) {
      throw new Error('Error al cargar los detalles del concierto');
    }
    const data = await response.json();
    concert.value = data.data; // Accedemos a los datos dentro del objeto 'data'
  } catch (error) {
    console.error(error);
    error.value = 'No se pudieron cargar los detalles del concierto';
  }
};

onMounted(loadConcertDetail, window.scrollTo(0, 0));

  
const buyTicket = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ticket-purchases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Añade cualquier otra cabecera necesaria, como el token de autenticación si es necesario
        },
        body: JSON.stringify({
          concertId: concertId.value,
          // Puedes enviar más datos si es necesario, como el ID del usuario
        }),
      });
      if (!response.ok) {
        throw new Error('Error al comprar el ticket');
      }
      ticketPurchased.value = true;
    } catch (error) {
      console.error(error);
      error.value = 'No se pudo comprar el ticket';
    }
  };

const store = useStore();

const addToCart = (product) => {
  store.commit('addToCart', product);
};


</script>

<style scoped>
.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Establece la altura al 100% del viewport */
  max-width: 1200px; /* Ajusta el ancho máximo del contenedor */
  margin: 0 auto; /* Centra horizontalmente el contenedor */
  
}

.concert-details {
  display: flex;
  align-items: center;
  background-color: white;
}

.concert-image-container {
  flex: 0 0 auto;
  margin-right: 20px;
}

.concert-image {
  width: 300px;
  max-height: 350px;
  height: auto;
}

.concert-info {
  flex: 1;
  max-width: 400px; /* Establece el ancho máximo del contenedor */
  overflow: hidden; /* Oculta el desbordamiento */
  padding-left: 20px;
  margin: 0;
}

.security {
  overflow: hidden; /* Oculta el desbordamiento */
}

.concert-buyTicket {
  background-color: rgb(202, 202, 202);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  border-radius: 10px;
}

.boton-compra {
  padding: 10px 20px;
  border-radius: 10px;
}

.boton-compra:hover {
  background-color: black;
  color: white;
}
</style>
