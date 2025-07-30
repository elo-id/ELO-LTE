<template>
  <div class="table-container">
    <div class="table-actions">
      <button class="export-btn" @click="exportToExcel">Excel</button>
      <button class="export-btn" @click="exportToPDF">PDF</button>
      <input
        type="date"
        v-model="minDate"
        class="date-input"
        placeholder="Minimum Date"
      />
      <span>---</span>
      <input
        type="date"
        v-model="maxDate"
        class="date-input"
        placeholder="Maximum Date"
      />
    </div>

    <div class="table-header">
      <h3 class="table-title">Incoming Document</h3>
      <input
        type="text"
        v-model="searchQuery"
        class="search-input"
        placeholder="⌕ Search Document"
      />
    </div>

    <div class="table-wrapper">
      <table class="document-table">
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Status</th>
            <th>Recieved Date</th>
            <th>File Source</th>
            <th>Incoming From</th>
            <th>Address</th>
            <th>Document Date</th>
            <th>Document No</th>
            <th>Subject</th>
            <th>Privacy Type</th>
            <th>Summary</th>
            <th>Main Destination</th>
            <th>Document Validity</th>
            <th>Carbon Copy</th>
            <th>Priority Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(doc, index) in filteredDocuments2" :key="index">
            <td>{{ doc.registration }}</td>
            <td><span class="blueblack">{{ doc.statuss }}</span></td>
            <td><span class="blueblack">{{ doc.recieved }}</span></td>
            <td><span class="blackblack">{{ doc.file }}</span></td>
            <td><img :src="doc.incomingImage" alt="Img" class="icon-img" />{{ doc.incoming }}</td>
            <td>{{ doc.address }}</td>
            <td><span class="blueblack">{{ doc.docdate }}</span></td>
            <td>{{ doc.docno }}</td>
            <td>{{ doc.subject }}</td>
            <td><span class="blackblack">{{ doc.privacytype }}</span></td>
            <td>{{ doc.summaries }}</td>
            <td>{{ doc.maindestination }}</td>
            <td><span class="blackblack">{{ doc.docvalidity }}</span></td>
            <td>{{ doc.carboncopy }}</td>
            <td><span class="blackblack">{{ doc.prioritytype }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default {
  props: {
    documents2: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "",
      minDate: "",
      maxDate: "",
    };
  },
  computed: {
    filteredDocuments2() {
      return this.documents2.filter((doc) => {
        const matchesSearch =
          doc.registration
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          doc.incoming.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesDate =
          (!this.minDate || new Date(doc.date) >= new Date(this.minDate)) &&
          (!this.maxDate || new Date(doc.date) <= new Date(this.maxDate));

        return matchesSearch && matchesDate;
      });
    },
  },
  methods: {
    // Export to Excel
    exportToExcel() {
      const now = new Date();
      const formattedDate = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()} - ${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      // Create a new sheet with header row
      const headerRow = [["Report Download - " + formattedDate]];
      const dataRows = XLSX.utils.json_to_sheet(this.filteredDocuments, {
        origin: 1,
      });

      const ws = XLSX.utils.aoa_to_sheet(headerRow);
      XLSX.utils.sheet_add_json(ws, this.filteredDocuments, {
        origin: "A2",
        skipHeader: false,
      });

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Outgoing Documents");

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(data, "Outgoing_Documents.xlsx");
    },

    // Export to PDF
    exportToPDF() {
      const pdf = new jsPDF();
      const now = new Date();
      const formattedDate = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()} - ${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      // Add the title at the top
      pdf.text(`Report Download - ${formattedDate}`, 10, 10);

      const tableColumn = [
        "Document No",
        "Initiator",
        "Document Type",
        "Subject",
        "Status",
        "Department",
      ];
      const tableRows = [];

      this.filteredDocuments.forEach((doc) => {
        const rowData = [
          doc.number,
          doc.initiator,
          doc.type,
          doc.subject,
          doc.status,
          doc.department,
        ];
        tableRows.push(rowData);
      });

      autoTable(pdf, {
        head: [tableColumn],
        body: tableRows,
        startY: 20, // Push the table down to avoid overlapping with the title
      });

      pdf.save("Outgoing_Documents.pdf");
    },
  },
};
</script>

<style scoped>
/* Container Styling */
.table-container {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Table Actions */
.table-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.export-btn {
  background: #1c4471;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
}

.export-btn:hover {
  background: #6f9dd2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
}

/* Date Input */
.date-input {
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 5px;
}

/* Search & Title */
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.table-title {
  color: var(--sidebar-active);
  margin: 0;
}

.search-input {
  border: 1px solid #4aa2ff;
  padding: 6px 12px;
  border-radius: 20px;
  width: 220px;
}

/* Table Styling */
.table-wrapper {
  max-width: 100%;
  max-height: 300px;
  overflow-x: auto;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  position: relative;
  background: white;
  color: black;
}

.document-table {
  width: 100%;
  border-collapse: collapse;
}

.document-table thead {
  position: sticky;
  top: 0;
  background: #f7f7f7;
  z-index: 10;
}

.document-table th,
.document-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #e5e5e5;
  white-space: nowrap;
}

.document-table thead th {
  background: #f7f7f7;
  color: #1c4471;
  font-weight: bold;
}

/* Document Type Badge */
.doc-type {
  border: 1px solid black;
  display: inline-block;
  padding: 4px 12px;
  width: 50px;
  border-radius: 20px;
  color: black;
}

.blueblack {
  border: 1px solid #007bff;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 15px;
  color: black;
}

.blackblack {
  border: 1px solid black;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 15px;
  color: black;
}

/* Icon Styling */
.icon-img {
  width: 16px; /* Sesuaikan ukuran */
  height: 16px;
  margin-right: 5px; /* Agar ada jarak dengan teks */
  vertical-align: middle;
}

@media (max-width: 450px) {
  .table-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }
}
</style>
