<template>
  <div class="slider-wrapper">
    <div class="slider-container">
      <!-- Navigation and Image -->
      <div class="nav-wrapper">
        <button class="nav-button" @click="prevImage">&lt;</button>

        <div class="slider">
          <img :src="require(`@/assets/image${currentIndex + 1}.png`)" alt="Slide Image" class="slider-image" />
        </div>

        <button class="nav-button" @click="nextImage">&gt;</button>
      </div>

      <!-- Bullets -->
      <!-- <div class="bullets">
        <span
          v-for="(_, index) in totalImages"
          :key="index"
          class="bullet"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageSlider',
  data() {
    return {
      currentIndex: 0,
      totalImages: 3,
      intervalId: null
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    startAutoSlide() {
      this.intervalId = setInterval(this.nextImage, 3000);
    },
    stopAutoSlide() {
      clearInterval(this.intervalId);
    }
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeDestroy() {
    this.stopAutoSlide();
  }
};
</script>

<style scoped>
.slider-wrapper {
  background: linear-gradient(to bottom, #575757 0%, #ffffff 180%);
  /* background-color: #0064a0; */
  padding: 20px 0;
  width: 100%;
}

.slider-container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-button {
  font-size: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0 15px;
  color: #fff;
}

.slider {
  flex-grow: 1;
  margin: 0 10px;
}

.slider-image {
  width: 600px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
  margin: auto;
}


.bullets {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.bullet {
  width: 12px;
  height: 12px;
  background-color: #bbb;
  margin: 0 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.bullet.active {
  background-color: #fff;
}
</style>
