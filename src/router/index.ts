import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue';
import AuditLogs from '../views/AuditLogs.vue';
import ChangePassword from '../views/ChangePassword.vue';
import ConsentUpdate from '../views/ConsentUpdate.vue';
import HealthPrediction from '../views/HealthPrediction.vue';
import Login from '../views/Login.vue';
import PatientDetails from '../views/PatientDetails.vue';
import PersonalDataExport from '../views/PersonalDataExport.vue';
import RegisterPatient from '../views/RegisterPatient.vue';
import ShowPatients from '../views/ShowPatients.vue';
import UserProfile from '../views/UserProfile.vue';
import UsersManagement from '../views/UsersManagement.vue';
import UserRegistration from '../views/UserRegistration.vue';

// Helper function to check if user is authenticated
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/audit-logs',
    name: 'AuditLogs',
    component: AuditLogs,
    meta: { requiresAuth: true },
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: '/consent-update/:id',
    name: 'ConsentUpdate',
    component: ConsentUpdate,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/health-prediction',
    name: 'HealthPrediction',
    component: HealthPrediction,
    meta: { requiresAuth: true },
  },
  {
    path: '/patients/:id',
    name: 'PatientDetails',
    component: PatientDetails,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/export-data/:id',
    name: 'PersonalDataExport',
    component: PersonalDataExport,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/register-patient',
    name: 'RegisterPatient',
    component: RegisterPatient,
    meta: { requiresAuth: true },
  },
  {
    path: '/patients',
    name: 'ShowPatients',
    component: ShowPatients,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/manage-users',
    name: 'UsersManagement',
    component: UsersManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/register-user',
    name: 'UserRegistration',
    component: UserRegistration,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
