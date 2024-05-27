<template>
  <div class="register-container">
    <h2 class="protest-strike-regular" style="font-size: 50px; text-align: center;">Registro</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="nombre">Nombre de usuario:</label>
        <input type="text" id="nombre" v-model="userData.nombre" required>
      </div>
      <div>
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" v-model="userData.email" required>
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="userData.password" required>
      </div>
      <button type="submit">Registrarse</button>
    </form>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userData = ref({
  nombre: '',
  email: '',
  password: ''
});

const router = useRouter();

const registerUser = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData.value)
    });
    
    if (!response.ok) {
      throw new Error('Error al registrar el usuario');
    }
    
    router.push('/'); 
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    alert('Error al registrar el usuario');
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto; /* Agrega espacio en la parte superior y inferior del formulario */
  border: 2px solid #eeee;
  border-radius: 10px;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra los elementos horizontalmente */
}

label {
  margin-bottom: 10px; /* Aumenta el espacio entre las etiquetas y los campos de entrada */
}

input, button {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 15px; /* Aumenta el espacio entre los campos de entrada y los botones */
  width: 100%; /* Ajusta el ancho de los campos de entrada y botones al 100% del contenedor */
  box-sizing: border-box; /* Incluye el relleno y el borde en el ancho total */
}

input:focus, button:focus {
  outline: none; /* Elimina el contorno cuando el campo está enfocado */
  border-color: #007bff; /* Cambia el color del borde cuando el campo está enfocado */
}

button {
  background-color: #414141;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s; /* Agrega una transición suave al cambiar el color de fondo */
}

button:hover {
  background-color: #afafaf;
}
</style>

