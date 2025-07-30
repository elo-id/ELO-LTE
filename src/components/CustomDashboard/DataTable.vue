<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            @click="sortBy(column)"
            class="sortable-header"
          >
            <div class="header-content">
              <span>{{ column }}</span>
              <button>
                {{ sortColumn === column ? (sortOrder === 'asc' ? '▲' : '▼') : '𖣫' }}
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedData" :key="item.id">
          <td
            v-for="column in columns"
            :key="column"
            :data-label="column"
          >
            {{ item[column] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    data: Array,
  },
  data() {
    return {
      sortColumn: null,
      sortOrder: 'asc',
    };
  },
  computed: {
    sortedData() {
      if (!this.sortColumn) return this.data;
      return [...this.data].sort((a, b) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return this.sortOrder === 'asc'
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      });
    },
  },
  methods: {
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },
  },
};
</script>

<style scoped>
/* Tabel dasar */
table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

th, td {
  border: 1px solid rgba(var(--text-rgb), 0.2);
  padding: 8px;
  text-align: left;
}

th {
  background-color: #c1c1c1;
  color: black;
}

.sortable-header {
  cursor: pointer;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sortable-header button {
  border: none;
  background-color: #c1c1c1;
  border-radius: 3px;
}

/* Responsive Table to Card Layout */
@media (max-width: 600px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead {
    display: none; /* Sembunyikan header di mobile */
  }

  tr {
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    background: white;
  }

  td {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }

  /* Tambahkan label untuk tiap kolom */
  td:before {
    content: attr(data-label);
    font-weight: bold;
  }
}
</style>

<!-- View HP Tetap Tabel -->>
<!-- <style scoped>
/* Tambahkan scroll horizontal untuk mobile */
.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: black;
  color: yellow;
}

.sortable-header {
  cursor: pointer;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sortable-header button {
  background-color: yellow;
  border-radius: 3px;
}

/* Responsif: Perkecil font dan padding di layar kecil */
@media (max-width: 768px) {
  table {
    font-size: 14px;
  }

  th, td {
    padding: 6px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style> -->
