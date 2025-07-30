<template>
  <div class="detail-page">
    <div class="card">
      <h1>Detail Pengadaan</h1>
      <div v-if="document">
        <p><span>Judul:</span> {{ document.title }}</p>
        <p><span>Tanggal:</span> {{ formatDate(document.datetime) }}</p>
        <p><span>Unit:</span> {{ document.unit }}</p>
        <p><span>UPT:</span> {{ document.upt }}</p>
        <p><span>Kategori:</span> {{ document.category }}</p>
        <p><span>Wilayah:</span> {{ document.region }}</p>
      </div>
      <div v-else>
        <p class="not-found">Dokumen tidak ditemukan.</p>
      </div>
      <router-link to="/" class="back-link">← Kembali</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      document: null
    };
  },
  methods: {
    async fetchData() {
      const response = await fetch('/data.json');
      const data = await response.json();
      this.document = data.find(d => d.id.toString() === this.id);
    },
    formatDate(datetime) {
      const d = new Date(datetime);
      return d.toLocaleDateString('id-ID');
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.detail-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
}

.card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  width: 100%;
}

.card h1 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  color: #333;
}

.card p {
  margin: 0.75rem 0;
  font-size: 1rem;
  color: #555;
}

.card p span {
  font-weight: 600;
  color: #111;
}

.not-found {
  color: #c00;
  font-weight: bold;
}

.back-link {
  display: inline-block;
  margin-top: 0;
  color: #007bff;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
