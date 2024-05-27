<template>
  <div class="div_concert">
    <h2 class="kode-mono">Conciertos Disponibles</h2>
    <div class="concert-list">
      <div v-for="concert in concerts" :key="concert.id" class="concert-card shadow" @click="goToConcertDetail(concert)">
        <img :src="concert.poster" alt="poster_concert" class="concert-image">
        <h4>{{ concert.title }}</h4>
        <p>{{ concert.date }}</p>
        <p>{{ concert.location }}</p>
        <p>{{ concert.ticketPrice }} €</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const concerts = ref([]);

const loadConcerts = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/concerts');
    if (!response.ok) {
      throw new Error('Error al cargar los conciertos');
    }
    const data = await response.json();
    concerts.value = data.data;
  } catch (error) {
    console.error(error);
  }
};

const goToConcertDetail = (concert) => {
  router.push(`/concerts/${concert.id}`);
};

onMounted(loadConcerts);
</script>

<style scoped>

</style>
