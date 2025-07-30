<template>
  <div>
    <!-- Overlay -->
    <div v-if="sidebarOpen" class="overlay" @click="closeSidebar"></div>

    <!-- Navigation Header -->
    <nav class="header">
      <div class="left-group">
        <img
          :src="
            isDarkMode
              ? require('../assets/burger-white.png')
              : require('../assets/burger-collapse.png')
          "
          alt="Menu"
          class="icon"
          @click="openSidebar"
        />
        <div class="title">ELO LTE</div>
        <img
          :src="
            isDarkMode
              ? require('../assets/dark-button.png')
              : require('../assets/light-button.png')
          "
          @click="toggleDarkMode"
          alt="Toggle Theme"
          class="icon"
        />
      </div>
      <img
        :src="
          isDarkMode
            ? require('../assets/logo-white.png')
            : require('../assets/logo-black.png')
        "
        alt="ELO Logo"
        width="80"
        height="44"
        class="logo-elo"
      />
    </nav>

    <!-- Sidebar always rendered, visibility controlled by class -->
    <aside :class="['sidebar', { open: sidebarOpen }]">
      <div class="sidebar-header">
        <img src="../assets/profile.png" alt="Profile" class="profile-pic" />
        <div class="sidebar-title">ELO LTE</div>
        <img
          :src="
            isDarkMode
              ? require('../assets/burger-white.png')
              : require('../assets/burger-expand.png')
          "
          alt="Close"
          class="icon close-icon"
          :class="{ 'highlight-dark': isDarkMode }"
          @click="closeSidebar"
        />
      </div>

      <nav class="sidebar-menu">
        <ul>
          <li><router-link to="/" exact>Home</router-link></li>

          <!-- Dashboard with nested menu -->
          <li>
            <div
              class="has-submenu"
              :class="{ active: isDashboardActive }"
              @click="toggleDashboard"
            >
              Dashboard
              <span class="arrow" :class="{ open: dashboardOpen }">▾</span>
            </div>
            <ul v-show="dashboardOpen" class="submenu">
              <li>
                <router-link to="/dashboard/custom"
                  >- Custom Dashboard</router-link
                >
              </li>
              <li>
                <router-link to="/dashboard/project-manager"
                  >- Project Manager</router-link
                >
              </li>
              <li>
                <router-link to="/dashboard/landmap">- Land Map</router-link>
              </li>
              <li>
                <router-link to="/dashboard/e-office">- E Office</router-link>
              </li>
              <li>
                <router-link to="/dashboard/meeting-board"
                  >- Meeting Board</router-link
                >
              </li>
              <li>
                <router-link to="/dashboard/master-hierarchy-document"
                  >- Hierarchy Document</router-link
                >
              </li>
              <li>
                <router-link to="/dashboard/e-procurement"
                  >- E Procurement</router-link
                >
              </li>
              <li>
                <router-link to="/dashboard/e-asset-management"
                  >- E Asset Management</router-link
                >
              </li>
            </ul>
          </li>

          <li class="menu-section">Component</li>
          <li class="menu">
            <router-link to="/component/charts">Charts</router-link>
          </li>
          <li class="menu">
            <router-link to="/component/tables">Tables</router-link>
          </li>
          <li class="menu">
            <router-link to="/component/calendar">Calendar</router-link>
          </li>

          <li class="menu-section">Others</li>
          <li class="menu">
            <router-link to="/documentation">Documentation</router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: false,
      dashboardOpen: false,
      projectManagerOpen: false,
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    toggleDashboard() {
      this.dashboardOpen = !this.dashboardOpen;
    },
  },
  computed: {
    isDashboardActive() {
      return this.$route.path.startsWith("/dashboard");
    },
  },
  watch: {
    isDarkMode(newVal) {
      document.documentElement.classList.toggle("dark", newVal);
    },
  },
};
</script>

<style scoped>
.header {
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw; */
  position: relative;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: var(--bg);
  color: var(--text);
  box-shadow: var(--header-shadow);
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.logo-elo {
  max-width: 100%;
  height: auto;
  margin-right: 0 auto;
}

.left-group {
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-right: 12px;
}

.icon {
  width: 34px;
  height: 34px;
  cursor: pointer;
  margin-right: 12px;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -240px; /* start off-screen */
  width: 240px;
  height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  padding: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease-in-out;
}

.sidebar.open {
  left: 0; /* slide into view */
}

.sidebar-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: var(--bg);
  color: var(--text);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.profile-pic {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 1;
}

.sidebar-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  z-index: 0;
}

.close-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.2);
  z-index: 9998;
}

.sidebar-menu {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.sidebar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.sidebar-menu a,
.sidebar-menu router-link {
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
  text-align: left;
}

.sidebar-menu a:hover,
.sidebar-menu router-link:hover {
  background-color: var(--sidebar-active);
  color: var(--bg);
}

.sidebar-menu .router-link-active {
  background-color: var(--sidebar-active);
  color: var(--bg);
  font-weight: bold;
  border-left: 4px solid var(--sidebar-active-tips);
}

.router-link-exact-active {
  background-color: #e0e0e0;
  font-weight: bold;
}

.menu-section {
  font-size: 14px;
  font-weight: bold;
  color: var(--text);
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 6px;
  padding: 0 12px;
  pointer-events: none;
}

.has-submenu {
  cursor: pointer;
  font-size: 16px;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text);
  transition: background-color 0.2s;
}

.has-submenu:hover {
  background-color: var(--sidebar-active);
  color: var(--bg);
}

.has-submenu.active {
  background-color: var(--sidebar-active);
  color: var(--bg);
  font-weight: bold;
  border-left: 4px solid var(--sidebar-active-tips);
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.submenu {
  list-style: none;
  padding-left: 20px;
  margin-top: 4px;
}

.submenu li {
  margin-bottom: 8px;
}

.submenu a {
  font-size: 15px;
  color: var(--text);
}

.submenu .router-link-active {
  background-color: #d0ebff;
  color: #0056b3;
  border-left: 4px solid #007bff;
}

.nested-submenu {
  padding-left: 20px;
  margin-top: 4px;
}

.nested-submenu a {
  font-size: 14px;
  color: #555;
}

.white-bg {
  background-color: white;
  border-radius: 6px;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 40px;
}
</style>
