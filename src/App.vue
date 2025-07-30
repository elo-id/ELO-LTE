<template>
  <div id="app">
    <HeaderBar />
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  --bg: white;
  --bg-rgb: 255, 255, 255;
  --text: black;
  --text-rgb: 0, 0, 0;
  --sidebar-active: #0064a0;
  --sidebar-active-tips: #00a0dc;
  --header-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dark {
  --bg: #121212;
  --bg-rgb: 18, 18, 18;
  --text: #ffffff;
  --text-rgb: 255, 255, 255;
  --sidebar-active: #d0ebff;
  --sidebar-active-tips: #0064a0;
  --header-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
}

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: var(--bg);
  color: var(--text);
}

::-webkit-scrollbar {
  display: none;
}
</style>
