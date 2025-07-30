<template>
  <div class="form-wrapper" v-if="allData.length">
    <AnnouncementCard title="Pengadaan KHS" :type="'khs'" :data="allData" />
    <AnnouncementCard title="Pengadaan NON-KHS" :type="'non-khs'" :data="allData" />
  </div>
</template>

<script>
import AnnouncementCard from '@/components/EProcurement/AnnouncementCard.vue';

export default {
  components: { AnnouncementCard },
  props: {
    allData: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  gap: 2rem;
  padding: 20px;
  flex-wrap: wrap;
}

.form-wrapper > * {
  flex: 1 1 500px;
}
</style>
