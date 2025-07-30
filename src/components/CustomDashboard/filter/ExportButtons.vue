<template>
  <div class="export-group">
    <div class="buttons">
      <button class="export-button" @click="exportToExcel">Excel</button>
      <button class="export-button" @click="exportToCSV">CSV</button>
      <button class="export-button" @click="exportToPDF">PDF</button>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

export default {
  props: {
    data: Array, // Data yang sudah difilter (filteredData)
    columns: Array, // Kolom yang terlihat (visibleColumns)
  },
  computed: {
    filteredVisibleData() {
      return this.data.map((row) => {
        let filteredRow = {};
        this.columns.forEach((col) => {
          filteredRow[col] = row[col]; // Hanya menyertakan kolom yang terlihat
        });
        return filteredRow;
      });
    },
  },
  methods: {
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.filteredVisibleData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Export Data");
      XLSX.writeFile(workbook, "export.xlsx");
    },
    exportToCSV() {
      const worksheet = XLSX.utils.json_to_sheet(this.filteredVisibleData);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: "text/csv" });
      saveAs(blob, "export.csv");
    },
    async exportToPDF() {
      const doc = new jsPDF();
      doc.text("Export Data", 14, 10);

      // Ambil elemen chart
      const chartElement = document.querySelector(".charts-container");
      let startY = 20; // Posisi awal Y untuk chart

      if (chartElement) {
        const canvas = await html2canvas(chartElement, { scale: 3, useCORS: true });
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        const imgWidth = 180; // Lebar gambar dalam PDF
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Menyesuaikan proporsi

        const pageWidth = doc.internal.pageSize.width; // Lebar halaman PDF
        const imgX = (pageWidth - imgWidth) / 2; // Posisi X agar gambar center

        doc.addImage(imgData, "JPEG", imgX, startY, imgWidth, imgHeight);
        startY += imgHeight + 10; // Update posisi startY untuk tabel (beri jarak 10)
      }

      // Export tabel
      const headers = [this.columns];
      const body = this.filteredVisibleData.map((row) =>
        this.columns.map((col) => row[col] || "")
      );

      doc.autoTable({ head: headers, body: body, startY: startY });
      doc.save("export.pdf");
    },
  },
};
</script>

<style>
.export-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* Tombol */
.export-button {
  padding: 8px 12px;
  border: none;
  background-color: #c1c1c1;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.export-button:hover {
  background-color: rgb(158, 158, 158);
}
</style>
