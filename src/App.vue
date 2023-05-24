<template>
  <img src="./assets/img/logo.png" alt="logo" class="logo">
  <ul class="topMenu">

    <li>
      <router-link :to="{ name: 'index' }"> Форма </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'result' }"> Превью </router-link>
    </li>
  </ul>
  <hr>
  <main class="container">
    <router-view />
  </main>
</template>
<script>
export default {
  data(){
    return{
    }
  }
}
</script>
