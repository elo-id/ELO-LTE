import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/dashboard/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard/custom",
    name: "customdashboard",
    component: function () {
      return import("../views/dashboard/CustomDashboard.vue");
    },
  },
  {
    path: "/dashboard/landmap",
    name: "landmap",
    component: function () {
      return import("../views/dashboard/Landmap.vue");
    },
  },
  {
    path: "/dashboard/e-office",
    name: "eoffice",
    component: function () {
      return import("../views/dashboard/EOffice.vue");
    },
  },
  {
    path: "/dashboard/meeting-board",
    name: "meetingboard",
    component: function () {
      return import("../views/dashboard/MeetingBoard.vue");
    },
  },
  {
    path: "/dashboard/master-hierarchy-document",
    name: "masterhierarchy",
    component: function () {
      return import("../views/dashboard/MasterHierarchy.vue");
    },
  },
  {
    path: "/dashboard/e-procurement",
    name: "eprocurement",
    component: function () {
      return import("../views/dashboard/EProcurement.vue");
    },
  },
  {
    path: "/dashboard/e-asset-management",
    name: "eassetsmanagement",
    component: function () {
      return import("../views/dashboard/EAssetsManagement.vue");
    },
  },
  {
    path: "/dashboard/project-manager",
    name: "projectmanager",
    component: function () {
      return import("../views/dashboard/ProjectManager.vue");
    },
  },
  {
    path: '/dashboard/project-manager/details/:name',
    name: 'projectmanager-details',
    component: function () {
      return import('@/components/ProjectManager/ProjectDetail.vue')
    }
  },
  {
    path: '/component/charts',
    name: 'chart-component',
    component: function () {
      return import('../views/component/ChartsContainer.vue')
    }
  },
  {
    path: '/component/tables',
    name: 'table-component',
    component: function () {
      return import('../views/component/TablesContainer.vue')
    }
  },
  {
    path: '/component/calendar',
    name: 'calendar-component',
    component: function () {
      return import('../views/component/CalendarContainer.vue')
    }
  },
  {
    path: '/documentation',
    name: 'documentation',
    component: function () {
      return import("../views/dashboard/Documentation.vue")
    }
  }
];

const router = new VueRouter({
  routes,
});

export default router;
