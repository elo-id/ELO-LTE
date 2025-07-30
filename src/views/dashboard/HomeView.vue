<template>
  <div class="landing-page">
    <div class="content">
      <h1>ELO Digital Office Indonesia</h1>
      <img src="@/assets/elo-heart.png" alt="AT THE HEART OF YOUR BUSINESS" class="banner" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  text-align: center;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: -40px;
}

h1 {
  color: var(--text);
  font-size: 6rem;
  margin-bottom: 1rem;
}

.banner {
  max-width: 50%;
  height: auto;
}
</style>
