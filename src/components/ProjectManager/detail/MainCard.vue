<template>
  <div class="content">
    <h2 class="title">Project</h2>
    <div class="project-box">
      <div class="details-container">
        <div class="sec-fs">
          <p><strong>Project Name :</strong> {{ project.name }}</p>
          <p><strong>Status :</strong> {{ project.status }}</p>
        </div>
        <div class="sec-fs">
          <p><strong>Start Date :</strong> {{ project.startDate }}</p>
          <p><strong>End Date :</strong> {{ project.endDate }}</p>
        </div>
        <div class="section percentage-box">
          <p><strong>Overall Percentage :</strong></p>
          <div class="percentage">{{ project.percentage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    project() {
      return this.data;
    },
  },
};
</script>

<style scoped>
.project-box {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 16px;
  background-color: var(--bg);
}

.title {
  display: flex;
  align-items: start;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 12px;
}

.details-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
}

.section,
.sec-fs {
  flex: 1; /* Give equal space */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-right: 1px solid #ccc;
  min-width: 250px;
}

.section:last-child,
.sec-fs:last-child {
  border-right: none;
}

.sec-fs p strong,
.section p strong {
  font-size: 18px;
}

.percentage-box {
  align-items: center !important; /* center percentage section */
  text-align: center;
}

.percentage {
  background-color: #005c99;
  color: white;
  font-size: 40px;
  font-weight: bold;
  padding: 16px 32px;
  border-radius: 6px;
  margin-bottom: 10px;
  display: inline-block;
}

/* Responsive tweaks */
@media (max-width: 1023px) {
  .section,
  .sec-fs {
    flex: 1 1 50%;
    border-right: none;
    border-bottom: 1px solid #ccc;
  }

  .section:last-child,
  .sec-fs:last-child {
    border-bottom: none;
  }
}

@media (max-width: 768px) {
  .section,
  .sec-fs {
    border-right: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
    max-width: 90%; /* ✅ limits line length on portrait screens */
    margin: 0 auto;  /* ✅ center the content to look balanced */
  }

  .section:last-child,
  .sec-fs:last-child {
    border-bottom: none;
  }

  .percentage {
    width: 100%;
    max-width: 200px; /* ✅ keeps the percentage box tidy on small screens */
    margin: 0 auto;
  }
}
</style>
