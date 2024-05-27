<template>
    <NavBar />
    <div class="concerts-view">
        <h2 class="kode-mono">Explorar Eventos</h2>
        <div v-if="loading">Cargando conciertos...</div>
        <div v-else class="concerts-grid">
            <div v-for="concert in concerts" :key="concert.id" class="concert-card" @click="goToConcertDetail(concert)">
                <img :src="concert.poster" :alt="concert.title" class="concert-image">
                <div class="concert-details">
                    <h2>{{ concert.title }}</h2>
                    <p>{{ concert.date }}</p>
                    <p>{{ concert.location }}</p>
                    <p>Desde {{ concert.ticketPrice }} €</p>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/Gadgets/NavBar.vue';
import Footer from '@/components/Gadgets/Footer.vue';

const router = useRouter();
const concerts = ref([]);
const loading = ref(true);
const ticketPurchased = ref(false);

const fetchConcerts = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/concerts');
        const data = await response.json();
        concerts.value = data.data;
        loading.value = false;
    } catch (error) {
        console.error('Error fetching concerts:', error);
    }
};

onMounted(fetchConcerts);

const goToConcertDetail = (concert) => {
    router.push(`/concerts/${concert.id}`);
};


</script>

<style scoped>
.concerts-view {
    padding: 20px;
}

.concerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 20px;
}

.concert-card {
    display: flex;
    flex: 1;
    /* Establece el crecimiento flexible del elemento */
    margin-bottom: 20px;
    border: 1px solid white;
    border-radius: 5px;
    overflow: hidden;
    width: 450px;
    /* Ancho fijo para cada tarjeta */
    transition: transform 0.3s ease; /* Transición suave para el efecto de ampliación */
}

.concert-card:hover {
  transform: scale(1.05); /* Ampliación al pasar el ratón */
}

.concert-image {
    width: 200px;
    height: auto;
}

.concert-details {
    padding: 10px;
}

button {
    padding: 5px 10px;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>