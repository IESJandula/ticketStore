  <template>
    <NavBar/>
    <ConcertDetail/>
    <Footer/>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import ConcertDetail from '@/components/Concert/ConcertDetail.vue';
  import NavBar from '@/components/Gadgets/NavBar.vue';
  import Footer from '@/components/Gadgets/Footer.vue';
  
  const router = useRouter();
  const concert = ref(null);
  const error = ref('');
  const ticketPurchased = ref(false);
  
  const loadConcertDetail = async () => {
    try {
      const concertId = router.params.id;
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

  

  
  onMounted(loadConcertDetail);
  </script>
  